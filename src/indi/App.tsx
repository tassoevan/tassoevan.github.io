import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { Arms, Character, Eyes, Item, Kid, Mouth } from './components/Flork';
import Flork from './components/Flork';
import InstallButton from './components/InstallButton';
import Scene from './components/Scene';
import { BREATH, KID_LINES, LINES, MATH_FACTS, NOTES, TAP_HINT_LINES } from './messages';
import { drawNote } from './noteDeck';
import type { Sound } from './sounds';
import { isSoundEnabled, playSound, setSoundEnabled } from './sounds';
import { hasTapped, rememberTap } from './tapHint';

type Move = 'dance' | 'jump' | 'spin' | 'trip';
type Silly = Move | 'dusty';
// Indi's are unlocked by tapping her twice in a row; Tasso's math facts, by tapping him twice.
type Secret = 'eyebrows' | 'cyclops' | 'peteco' | 'math';
type Action =
  | 'hug'
  | 'pout'
  | 'tea'
  | 'acai'
  | 'hoodie'
  | Silly
  | Secret
  | 'boop-tasso'
  | 'boop-indi';

const MOVES: readonly Move[] = ['dance', 'jump', 'spin', 'trip'];
const SILLIES: readonly Silly[] = [...MOVES, 'dusty'];
const SECRETS: readonly Exclude<Secret, 'math'>[] = ['eyebrows', 'cyclops', 'peteco'];
const DOUBLE_TAP_WINDOW = 450;

// A girl dropping by. `accessory` is Jojo's phone (instead of her plush), Nana's dog-ear headband
// or Lolô's pacifier.
type Guest = Readonly<{ character: Kid; accessory: boolean }>;

type ActionState = Readonly<{
  id: number;
  type: Action;
  guests: readonly Guest[];
  // A hug that follows a pout, which sometimes ends with a note.
  comfort?: boolean;
  withNote?: boolean;
}>;

const ACTION_DURATIONS: Record<Action, number> = {
  hug: 4500,
  pout: 2800,
  tea: 8000,
  hoodie: 4500,
  acai: 8000,
  dance: 3000,
  jump: 2400,
  spin: 2000,
  trip: 3200,
  dusty: 4200,
  eyebrows: 3600,
  math: 10000,
  peteco: 3800,
  cyclops: 4200,
  'boop-tasso': 1200,
  'boop-indi': 2400,
};

const ACTION_SOUNDS: Record<Action, Sound> = {
  hug: 'hug',
  pout: 'pout',
  tea: 'tea',
  hoodie: 'hoodie',
  acai: 'acai',
  dance: 'dance',
  jump: 'jump',
  spin: 'spin',
  trip: 'trip',
  dusty: 'dusty',
  eyebrows: 'eyebrows',
  math: 'math',
  peteco: 'peteco',
  cyclops: 'cyclops',
  'boop-tasso': 'boopTasso',
  'boop-indi': 'boopIndi',
};

const SPEECH_DURATION = 4500;
const LONG_BUBBLE = 70;
const LONG_SPEECH_DURATION = 7000;
// Anchored to both sides, so the bubble can use the whole width instead of growing taller.
const LONG_BUBBLE_POSITION: CSSProperties = { left: '4%', right: '4%' };
const GUEST_LINE_DELAY = 1800;
const COMFORT_NOTE_CHANCE = 0.4;

// Some moves get an answer from the other one, a moment later.
const REPLIES: Partial<
  Record<Action, { who: Character; delay: number; lines: readonly string[] }>
> = {
  peteco: { who: 'tasso', delay: 1600, lines: LINES.petecoReply },
  math: { who: 'indi', delay: 6500, lines: LINES.mathReply },
};
// Until she first taps a character, one of them invites her after a quiet moment.
const TAP_HINT_DELAY = 8000;
const MAX_TAP_HINTS = 3;
const BREATH_PHASE_DURATION = 4000;

type Speech = Readonly<{ id: number; who: Character | 'both'; text: string }>;

// Picks a random item, avoiding the previous one when there is a choice.
function pick<T>(items: readonly T[], previous?: T): T {
  const candidates = items.length > 1 ? items.filter((item) => item !== previous) : items;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

// Decides at random which of the girls show up, so their visits stay a surprise.
function castFor(type: Action): readonly Guest[] {
  const roll = Math.random();
  const jojo: Guest = { character: 'jojo', accessory: Math.random() < 0.5 };
  const nana: Guest = { character: 'nana', accessory: Math.random() < 0.5 };
  const lolo: Guest = { character: 'lolo', accessory: Math.random() < 0.4 };
  const littleOnes = roll < 0.4 ? [nana, lolo] : [pick([nana, lolo])];

  switch (type) {
    case 'pout':
      return roll < 0.6 ? [jojo] : [];
    case 'dusty':
      return [nana, lolo];
    // Her mother's right hand: sometimes she is the one who made the tea.
    case 'tea':
    // She wants a turn with the pink hoodie too.
    case 'hoodie':
      return roll < 0.4 ? [jojo] : [];
    case 'acai': {
      const visit = Math.random();
      if (visit < 0.35) return littleOnes;
      if (visit < 0.5) return [jojo, lolo];
      return visit < 0.6 ? [jojo] : [];
    }
    case 'hug':
      return Math.random() < 0.5 ? pick([[jojo], [jojo, lolo], [nana], [lolo], [nana, lolo]]) : [];
    // The little ones dance along; Jojo, a teenager, rolls her eyes.
    case 'dance':
    case 'jump':
    case 'spin':
    case 'trip': {
      const visit = Math.random();
      if (visit < 0.3) return pick([[jojo], [jojo, lolo]]);
      return (type === 'dance' || type === 'jump') && visit < 0.6 ? littleOnes : [];
    }
    default:
      return [];
  }
}

function kidLine({ character: kid, accessory }: Guest, action: ActionState) {
  const lines: Partial<Record<string, readonly string[]>> = KID_LINES[kid];
  let context = 'any';
  if (action.comfort) context = 'comfort';
  else if (MOVES.includes(action.type as Move)) context = 'silly';
  else if (['hug', 'acai', 'dusty', 'tea', 'hoodie'].includes(action.type)) {
    context = action.type;
  }
  // Jojo on her phone has lines of her own, like `acaiPhone`, falling back to `anyPhone`.
  const onPhone = kid === 'jojo' && accessory;
  return pick(
    (onPhone ? lines[`${context}Phone`] : undefined) ??
      lines[context] ??
      (onPhone ? lines.anyPhone : undefined) ??
      KID_LINES[kid].any,
  );
}

function greeting(): Speech {
  const hour = new Date().getHours();
  const lines = hour < 12 ? LINES.morning : hour < 18 ? LINES.afternoon : LINES.night;
  return { id: 0, who: 'tasso', text: pick(lines) };
}

const SPEECH_POSITIONS: Record<Speech['who'], CSSProperties> = {
  indi: { left: '38%', translate: '-50%' },
  tasso: { left: '63%', translate: '-50%' },
  both: { left: '50%', translate: '-50%' },
  jojo: { left: '3%' },
  nana: { left: '3%' },
  lolo: { right: '3%' },
};

function ActionButton({
  emoji,
  label,
  pressed,
  onClick,
}: Readonly<{ emoji: string; label: string; pressed?: boolean; onClick: () => void }>) {
  return (
    <button
      type='button'
      aria-pressed={pressed}
      onClick={onClick}
      className={clsx(
        'flex cursor-pointer flex-col items-center gap-1 rounded-2xl border-2 px-2 py-3 font-semibold transition active:scale-95',
        'border-primary text-primary bg-surface aria-pressed:bg-primary aria-pressed:text-background',
        'focus-visible:outline-foreground focus-visible:outline-2 focus-visible:outline-offset-2',
      )}
    >
      <span aria-hidden className='text-3xl'>
        {emoji}
      </span>
      {label}
    </button>
  );
}

export default function App() {
  const [action, setAction] = useState<ActionState | null>(null);
  // A girl was just tapped; `victory` is Jojo winning a match on her phone.
  const [kidBoop, setKidBoop] = useState<{
    id: number;
    character: Kid;
    victory?: boolean;
  } | null>(null);
  const [speech, setSpeech] = useState<Speech | null>(greeting);
  const [blanket, setBlanket] = useState(false);
  const [hoodieOnIndi, setHoodieOnIndi] = useState(false);
  const [breathing, setBreathing] = useState(false);
  const [breathIn, setBreathIn] = useState(true);
  const [note, setNote] = useState<string | null>(null);
  const [sound, setSound] = useState(isSoundEnabled);
  const [tapped, setTapped] = useState(hasTapped);
  const [hint, setHint] = useState<{ id: number; who: 'tasso' | 'indi' } | null>(null);
  const [hintCount, setHintCount] = useState(0);
  const lastTap = useRef<{ character: Character; time: number } | null>(null);

  useEffect(() => {
    if (!action) return;
    const timeout = setTimeout(() => {
      if (action.type === 'pout') {
        // He notices the pout and comes over for a comforting hug.
        setAction({
          id: Date.now(),
          type: 'hug',
          guests: action.guests,
          comfort: true,
          withNote: Math.random() < COMFORT_NOTE_CHANCE,
        });
        setSpeech({ id: Date.now(), who: 'tasso', text: pick(LINES.comfort) });
        playSound('hug');
        return;
      }
      setAction(null);
      // After some comforting hugs, he hands her a note.
      if (action.withNote) {
        setNote(drawNote(NOTES));
        setSpeech({ id: Date.now(), who: 'tasso', text: pick(LINES.comfortNote) });
        playSound('note');
      }
    }, ACTION_DURATIONS[action.type]);
    return () => clearTimeout(timeout);
  }, [action]);

  useEffect(() => {
    const reply = action && REPLIES[action.type];
    if (!reply) return;
    const timeout = setTimeout(
      () => setSpeech({ id: Date.now(), who: reply.who, text: pick(reply.lines) }),
      reply.delay,
    );
    return () => clearTimeout(timeout);
  }, [action]);

  // A moment after showing up, one of the girls has something to say.
  useEffect(() => {
    if (!action || action.guests.length === 0 || action.type === 'pout') return;
    const timeout = setTimeout(() => {
      const guest = pick(action.guests);
      const { character } = guest;
      setSpeech({ id: Date.now(), who: character, text: kidLine(guest, action) });
      playSound(character === 'lolo' ? 'bark' : 'boopIndi');
    }, GUEST_LINE_DELAY);
    return () => clearTimeout(timeout);
  }, [action]);

  useEffect(() => {
    if (tapped || hintCount >= MAX_TAP_HINTS || action || speech || note || breathing) return;
    const timeout = setTimeout(() => {
      const who = pick(['tasso', 'indi'] as const);
      const id = Date.now();
      setHint({ id, who });
      setHintCount((count) => count + 1);
      setSpeech({ id, who, text: pick(TAP_HINT_LINES[who]) });
    }, TAP_HINT_DELAY);
    return () => clearTimeout(timeout);
  }, [tapped, hintCount, action, speech, note, breathing]);

  useEffect(() => {
    if (!speech || breathing) return;
    const duration = speech.text.length > LONG_BUBBLE ? LONG_SPEECH_DURATION : SPEECH_DURATION;
    const timeout = setTimeout(() => setSpeech(null), duration);
    return () => clearTimeout(timeout);
  }, [speech, breathing]);

  useEffect(() => {
    if (!breathing) return;
    let breathingIn = true;
    const interval = setInterval(() => {
      breathingIn = !breathingIn;
      setBreathIn(breathingIn);
      playSound(breathingIn ? 'breatheIn' : 'breatheOut');
    }, BREATH_PHASE_DURATION);
    return () => clearInterval(interval);
  }, [breathing]);

  const say = (who: Character, lines: readonly string[]) =>
    setSpeech((current) => ({ id: Date.now(), who, text: pick(lines, current?.text) }));

  const play = (type: Action, who: Character, lines: readonly string[]) => {
    setBreathing(false);
    setKidBoop(null);
    setAction({ id: Date.now(), type, guests: castFor(type) });
    playSound(ACTION_SOUNDS[type]);
    say(who, lines);
  };

  const toggleBlanket = () => {
    setBlanket(!blanket);
    playSound(blanket ? 'blanketOff' : 'blanketOn');
    say('tasso', blanket ? LINES.blanketOff : LINES.blanketOn);
  };

  const toggleHoodie = () => {
    setHoodieOnIndi(!hoodieOnIndi);
    play('hoodie', 'tasso', hoodieOnIndi ? LINES.hoodieOff : LINES.hoodieOn);
  };

  const toggleBreathing = () => {
    if (breathing) {
      setBreathing(false);
      return;
    }
    setAction(null);
    setNote(null);
    setBreathing(true);
    setBreathIn(true);
    playSound('breatheIn');
    setSpeech(null);
  };

  const toggleSound = () => {
    setSoundEnabled(!sound);
    setSound(!sound);
    playSound('toggle');
  };

  const openNote = () => {
    setBreathing(false);
    setNote(drawNote(NOTES, note ?? undefined));
    say('tasso', LINES.note);
    playSound('note');
  };

  const silly = () => {
    const type = pick(SILLIES, action?.type as Silly | undefined);
    play(type, 'tasso', LINES[type]);
  };

  const boop = (character: Character) => {
    if (!tapped) {
      setTapped(true);
      rememberTap();
    }
    const now = Date.now();
    const doubleTap =
      lastTap.current?.character === character && now - lastTap.current.time < DOUBLE_TAP_WINDOW;
    lastTap.current = doubleTap ? null : { character, time: now };

    if (character === 'tasso') {
      if (doubleTap) return play('math', 'tasso', MATH_FACTS);
      return play('boop-tasso', 'tasso', LINES.boopTasso);
    }
    if (character === 'indi') {
      if (doubleTap) {
        const secret = pick(SECRETS, action?.type as (typeof SECRETS)[number] | undefined);
        return play(secret, secret === 'peteco' ? 'indi' : 'tasso', LINES[secret]);
      }
      return play('boop-indi', 'indi', LINES.boopIndi);
    }
    // Booping a girl keeps the current scene going.
    const onPhone = action?.guests.some((guest) => guest.character === 'jojo' && guest.accessory);
    if (character === 'jojo' && onPhone) {
      setKidBoop({ id: Date.now(), character, victory: true });
      say(character, KID_LINES.jojo.victory);
      playSound('victory');
      return;
    }
    setKidBoop({ id: Date.now(), character });
    say(character, KID_LINES[character].any);
    playSound(character === 'lolo' ? 'bark' : 'boopIndi');
  };

  // While breathing, the bubble guides the rhythm instead of showing reactions.
  const bubble: Speech | null = breathing
    ? { id: breathIn ? -1 : -2, who: 'both', text: breathIn ? BREATH.in : BREATH.out }
    : speech;

  // Long lines, like the math facts, get a wide bubble across the scene.
  const longBubble = (bubble?.text.length ?? 0) > LONG_BUBBLE;

  const type = action?.type;
  const isSilly = SILLIES.includes(type as Silly);
  const isMove = MOVES.includes(type as Move);
  const resting = blanket || breathing;

  let tassoArms: Arms = 'down';
  if (type === 'hug') tassoArms = 'hug';
  else if (isMove || type === 'peteco') tassoArms = 'up';
  else if (type === 'math') tassoArms = 'point';
  else if (type === 'acai' || type === 'dusty' || note) tassoArms = 'hold';

  let tassoItem: Item | undefined;
  if (type === 'acai' || type === 'dusty') tassoItem = type === 'acai' ? 'acai' : 'plush';
  else if (tassoArms === 'hold') tassoItem = 'note';

  let indiArms: Arms = 'down';
  if (type === 'hug') indiArms = 'hug';
  else if (type === 'tea' || type === 'acai' || type === 'peteco') indiArms = 'hold';

  let indiMouth: Mouth = 'smile';
  if (type === 'pout') indiMouth = 'pout';
  else if (type === 'eyebrows') indiMouth = 'smirk';
  else if (type === 'peteco') indiMouth = 'grin';
  else if (type === 'math') indiMouth = 'open';
  else if (isSilly || type === 'boop-indi' || type === 'acai') indiMouth = 'grin';

  let tassoMouth: Mouth = 'smile';
  if (type === 'pout') tassoMouth = 'flat';
  else if (type === 'eyebrows' || type === 'peteco' || type === 'math') tassoMouth = 'open';
  else if (type === 'trip') tassoMouth = 'open';
  else if (isSilly || type === 'boop-tasso') tassoMouth = 'grin';

  let tassoEyes: Eyes = resting ? 'closed' : 'open';
  if (type === 'hug' || type === 'boop-tasso' || type === 'cyclops') tassoEyes = 'happy';

  let indiEyes: Eyes = resting ? 'closed' : 'open';
  if (type === 'hug' || type === 'boop-indi' || type === 'acai' || isSilly) indiEyes = 'happy';
  else if (type === 'eyebrows' || type === 'peteco') indiEyes = 'sly';
  else if (type === 'cyclops') indiEyes = 'cyclops';
  else if (type === 'math') indiEyes = 'hearts';

  let tassoMotion = 'flork-idle';
  if (breathing) tassoMotion = 'flork-breathe';
  else if (isMove) tassoMotion = `flork-${type}`;
  else if (type === 'boop-tasso') tassoMotion = 'flork-boop';
  else if (type === 'math') tassoMotion = 'flork-lecture';

  let indiMotion = 'flork-idle flork-idle-late';
  if (breathing) indiMotion = 'flork-breathe';
  else if (isSilly) indiMotion = 'flork-giggle';
  else if (type === 'boop-indi') indiMotion = 'flork-boop';
  else if (type === 'math') indiMotion = 'flork-swoon';

  const guests = (action?.guests ?? []).map(({ character, accessory }) => {
    let arms: Arms = 'down';
    let holding: Item | undefined;
    let mouth: Mouth = 'smile';
    let eyes: Eyes = 'open';
    let motion = 'flork-idle';
    if (type === 'hug') {
      arms = 'hug';
      eyes = 'happy';
    } else if (type === 'tea') {
      eyes = 'happy';
    } else if (type === 'hoodie') {
      mouth = 'flat';
    } else if (type === 'acai' && character === 'jojo') {
      // She came asking for hers.
      mouth = 'open';
    } else if (type === 'acai') {
      arms = 'hold';
      holding = 'acai';
      mouth = 'grin';
      eyes = 'happy';
    } else if (isMove && character === 'jojo') {
      eyes = 'roll';
      mouth = 'flat';
    } else if (isMove) {
      arms = 'up';
      mouth = 'grin';
      motion = `flork-${type}`;
    } else if (type === 'dusty') {
      mouth = 'grin';
      eyes = 'happy';
      motion = 'flork-giggle';
    }
    // Nana has her mother's mannerisms, so she makes the same faces.
    if (character === 'nana') {
      mouth = indiMouth;
      eyes = indiEyes;
    }
    const celebrate = kidBoop?.character === character && kidBoop.victory;
    if (celebrate) {
      eyes = 'happy';
      mouth = 'grin';
    }
    if (kidBoop?.character === character) motion = 'flork-boop';

    return {
      character,
      node: (
        <g key={`${action?.id}-${kidBoop?.id}`} className={motion}>
          <Flork
            character={character}
            arms={arms}
            mouth={mouth}
            eyes={eyes}
            blush={type === 'hug'}
            holding={holding}
            accessory={accessory && holding !== 'acai'}
            celebrate={celebrate}
          />
        </g>
      ),
    };
  });

  return (
    <div className='mx-auto flex min-h-dvh max-w-xl flex-col gap-4 px-4 py-6'>
      <header className='relative'>
        <h1 className='text-primary text-center text-2xl font-bold'>Cantinho da Indi</h1>
        <button
          type='button'
          aria-label='Som'
          aria-pressed={sound}
          onClick={toggleSound}
          className='border-primary bg-surface aria-pressed:bg-primary focus-visible:outline-foreground absolute top-1/2 right-0 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 text-xl focus-visible:outline-2 focus-visible:outline-offset-2'
        >
          <span aria-hidden>{sound ? '🔊' : '🔇'}</span>
        </button>
      </header>

      <main className='flex flex-col gap-4'>
        <div className='border-primary relative overflow-hidden rounded-3xl border-4'>
          <Scene
            hint={hint && speech?.id === hint.id ? hint.who : undefined}
            lean={type === 'hug' ? 'hug' : type === 'cyclops' ? 'close' : undefined}
            hearts={type === 'hug' || type === 'boop-indi' || type === 'cyclops'}
            zoom={type === 'cyclops'}
            indiInFront={type === 'peteco'}
            blanket={blanket}
            breathing={breathing}
            guests={guests}
            onBoop={boop}
            indi={
              <g key={action?.id} className={indiMotion}>
                <Flork
                  character='indi'
                  arms={indiArms}
                  mouth={indiMouth}
                  eyes={indiEyes}
                  blush={
                    type === 'hug' || type === 'boop-indi' || type === 'cyclops' || type === 'math'
                  }
                  sad={type === 'pout'}
                  wiggle={type === 'eyebrows'}
                  holding={
                    type === 'tea'
                      ? 'mug'
                      : type === 'acai'
                        ? 'acai'
                        : type === 'peteco'
                          ? 'flagGun'
                          : undefined
                  }
                  outfit={hoodieOnIndi ? 'hoodie' : 'own'}
                />
              </g>
            }
            tasso={
              <g key={action?.id} className={tassoMotion}>
                <Flork
                  character='tasso'
                  arms={tassoArms}
                  mouth={tassoMouth}
                  eyes={tassoEyes}
                  blush={type === 'eyebrows' || type === 'cyclops'}
                  shine={type === 'eyebrows'}
                  holding={tassoItem}
                  outfit={hoodieOnIndi ? 'own' : 'hoodie'}
                />
              </g>
            }
          />

          <p aria-live='polite' className='pointer-events-none absolute inset-x-0 top-[3%]'>
            {bubble && (
              <span
                key={bubble.id}
                className={clsx(
                  'speech-bubble absolute rounded-2xl border-2 border-[#111] bg-white px-3 py-1.5 text-center leading-snug font-semibold text-[#111] shadow-md',
                  bubble.who === 'both' ? 'text-lg' : 'text-sm sm:text-base',
                  !longBubble && 'max-w-[62%]',
                )}
                style={longBubble ? LONG_BUBBLE_POSITION : SPEECH_POSITIONS[bubble.who]}
              >
                {bubble.text}
              </span>
            )}
          </p>
        </div>

        {note && (
          <section
            aria-label='Bilhete'
            className='note-card bg-surface border-primary relative rounded-2xl border-2 p-5 shadow-md'
          >
            <p className='text-lg leading-relaxed'>{note}</p>
            <p className='text-primary mt-3 text-right font-semibold'>— seu mor 🤍</p>
            <div className='mt-4 flex justify-end gap-2'>
              <button
                type='button'
                onClick={() => setNote(null)}
                className='text-primary focus-visible:outline-foreground cursor-pointer rounded-lg px-3 py-2 font-semibold focus-visible:outline-2'
              >
                Guardar
              </button>
              <button
                type='button'
                onClick={openNote}
                className='bg-primary text-background focus-visible:outline-foreground cursor-pointer rounded-lg px-4 py-2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2'
              >
                Outro bilhete
              </button>
            </div>
          </section>
        )}

        <div role='group' aria-label='O que fazer agora?' className='grid grid-cols-3 gap-3'>
          <ActionButton emoji='🤗' label='Abraço' onClick={() => play('hug', 'tasso', LINES.hug)} />
          <ActionButton
            emoji='🥺'
            label='Dengo'
            onClick={() => play('pout', 'tasso', LINES.pout)}
          />
          <ActionButton
            emoji='🍵'
            label='Chazinho'
            onClick={() => play('tea', 'tasso', LINES.tea)}
          />
          <ActionButton emoji='🍇' label='Açaí' onClick={() => play('acai', 'tasso', LINES.acai)} />
          <ActionButton emoji='🌯' label='Coberta' pressed={blanket} onClick={toggleBlanket} />
          <ActionButton emoji='🩷' label='Moletom' pressed={hoodieOnIndi} onClick={toggleHoodie} />
          <ActionButton emoji='💌' label='Bilhete' onClick={openNote} />
          <ActionButton emoji='🌬️' label='Respirar' pressed={breathing} onClick={toggleBreathing} />
          <ActionButton emoji='🤪' label='Bobeira' onClick={silly} />
        </div>
      </main>

      <footer className='text-muted mt-auto flex flex-col gap-4 text-center text-sm'>
        <InstallButton />
        <p>Toque na gente também. Feito com 🤍 pelo seu mor.</p>
      </footer>
    </div>
  );
}
