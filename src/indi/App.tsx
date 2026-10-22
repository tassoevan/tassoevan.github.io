import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import type { Arms, Character, Eyes, Item, Kid, Mouth } from './components/Flork';
import Flork from './components/Flork';
import InstallButton from './components/InstallButton';
import Scene from './components/Scene';
import { BREATH, KID_LINES, LINES, NOTES, TAP_HINT_LINES } from './messages';
import { drawNote } from './noteDeck';
import type { Sound } from './sounds';
import { isSoundEnabled, playSound, setSoundEnabled } from './sounds';
import { hasTapped, rememberTap } from './tapHint';

type Move = 'dance' | 'jump' | 'spin' | 'trip';
type Silly = Move | 'dusty';
type Action = 'hug' | 'pout' | 'tea' | 'acai' | Silly | 'boop-tasso' | 'boop-indi';

const MOVES: readonly Move[] = ['dance', 'jump', 'spin', 'trip'];
const SILLIES: readonly Silly[] = [...MOVES, 'dusty'];

// A girl dropping by. `accessory` is Nana's dog-ear headband or Lolô's pacifier.
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
  acai: 8000,
  dance: 3000,
  jump: 2400,
  spin: 2000,
  trip: 3200,
  dusty: 4200,
  'boop-tasso': 1200,
  'boop-indi': 2400,
};

const ACTION_SOUNDS: Record<Action, Sound> = {
  hug: 'hug',
  pout: 'pout',
  tea: 'tea',
  acai: 'acai',
  dance: 'dance',
  jump: 'jump',
  spin: 'spin',
  trip: 'trip',
  dusty: 'dusty',
  'boop-tasso': 'boopTasso',
  'boop-indi': 'boopIndi',
};

const SPEECH_DURATION = 4500;
const GUEST_LINE_DELAY = 1800;
const COMFORT_NOTE_CHANCE = 0.4;
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
  const jojo: Guest = { character: 'jojo', accessory: false };
  const nana: Guest = { character: 'nana', accessory: Math.random() < 0.5 };
  const lolo: Guest = { character: 'lolo', accessory: Math.random() < 0.4 };
  const littleOnes = roll < 0.4 ? [nana, lolo] : [pick([nana, lolo])];

  switch (type) {
    case 'pout':
      return roll < 0.6 ? [jojo] : [];
    case 'dusty':
      return [nana, lolo];
    case 'acai':
      return Math.random() < 0.6 ? littleOnes : [];
    case 'hug':
      return Math.random() < 0.35 ? pick([[jojo], [nana], [lolo], [nana, lolo]]) : [];
    case 'dance':
    case 'jump':
      return Math.random() < 0.4 ? littleOnes : [];
    default:
      return [];
  }
}

function kidLine(kid: Kid, action: ActionState) {
  const lines: Partial<Record<string, readonly string[]>> = KID_LINES[kid];
  let context = 'any';
  if (action.comfort) context = 'comfort';
  else if (MOVES.includes(action.type as Move)) context = 'silly';
  else if (action.type === 'hug' || action.type === 'acai' || action.type === 'dusty') {
    context = action.type;
  }
  return pick(lines[context] ?? KID_LINES[kid].any);
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
  const [kidBoop, setKidBoop] = useState<{ id: number; character: Kid } | null>(null);
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

  // A moment after showing up, one of the girls has something to say.
  useEffect(() => {
    if (!action || action.guests.length === 0 || action.type === 'pout') return;
    const timeout = setTimeout(() => {
      const { character } = pick(action.guests);
      setSpeech({ id: Date.now(), who: character, text: kidLine(character, action) });
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
    const timeout = setTimeout(() => setSpeech(null), SPEECH_DURATION);
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
    playSound('hoodie');
    say('tasso', hoodieOnIndi ? LINES.hoodieOff : LINES.hoodieOn);
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
    if (character === 'tasso') return play('boop-tasso', 'tasso', LINES.boopTasso);
    if (character === 'indi') return play('boop-indi', 'indi', LINES.boopIndi);
    // Booping a girl keeps the current scene going.
    setKidBoop({ id: Date.now(), character });
    say(character, KID_LINES[character].any);
    playSound(character === 'lolo' ? 'bark' : 'boopIndi');
  };

  // While breathing, the bubble guides the rhythm instead of showing reactions.
  const bubble: Speech | null = breathing
    ? { id: breathIn ? -1 : -2, who: 'both', text: breathIn ? BREATH.in : BREATH.out }
    : speech;

  const type = action?.type;
  const isSilly = SILLIES.includes(type as Silly);
  const isMove = MOVES.includes(type as Move);
  const resting = blanket || breathing;

  let tassoArms: Arms = 'down';
  if (type === 'hug') tassoArms = 'hug';
  else if (isMove) tassoArms = 'up';
  else if (type === 'acai' || type === 'dusty' || note) tassoArms = 'hold';

  let tassoItem: Item | undefined;
  if (type === 'acai' || type === 'dusty') tassoItem = type === 'acai' ? 'acai' : 'plush';
  else if (tassoArms === 'hold') tassoItem = 'note';

  let indiArms: Arms = 'down';
  if (type === 'hug') indiArms = 'hug';
  else if (type === 'tea' || type === 'acai') indiArms = 'hold';

  let indiMouth: Mouth = 'smile';
  if (type === 'pout') indiMouth = 'pout';
  else if (isSilly || type === 'boop-indi' || type === 'acai') indiMouth = 'grin';

  let tassoMouth: Mouth = 'smile';
  if (type === 'pout') tassoMouth = 'flat';
  else if (type === 'trip') tassoMouth = 'open';
  else if (isSilly || type === 'boop-tasso') tassoMouth = 'grin';

  let tassoEyes: Eyes = resting ? 'closed' : 'open';
  if (type === 'hug' || type === 'boop-tasso') tassoEyes = 'happy';

  let indiEyes: Eyes = resting ? 'closed' : 'open';
  if (type === 'hug' || type === 'boop-indi' || type === 'acai' || isSilly) indiEyes = 'happy';

  let tassoMotion = 'flork-idle';
  if (breathing) tassoMotion = 'flork-breathe';
  else if (isMove) tassoMotion = `flork-${type}`;
  else if (type === 'boop-tasso') tassoMotion = 'flork-boop';

  let indiMotion = 'flork-idle flork-idle-late';
  if (breathing) indiMotion = 'flork-breathe';
  else if (isSilly) indiMotion = 'flork-giggle';
  else if (type === 'boop-indi') indiMotion = 'flork-boop';

  const guests = (action?.guests ?? []).map(({ character, accessory }) => {
    let arms: Arms = 'down';
    let holding: Item | undefined;
    let mouth: Mouth = 'smile';
    let eyes: Eyes = 'open';
    let motion = 'flork-idle';
    if (type === 'hug') {
      arms = 'hug';
      eyes = 'happy';
    } else if (type === 'acai') {
      arms = 'hold';
      holding = 'acai';
      mouth = 'grin';
      eyes = 'happy';
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
            lean={type === 'hug'}
            hearts={type === 'hug' || type === 'boop-indi'}
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
                  blush={type === 'hug' || type === 'boop-indi'}
                  sad={type === 'pout'}
                  holding={type === 'tea' ? 'mug' : type === 'acai' ? 'acai' : undefined}
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
                  'speech-bubble absolute max-w-[62%] rounded-2xl border-2 border-[#111] bg-white px-3 py-1.5 text-center leading-snug font-semibold text-[#111] shadow-md',
                  bubble.who === 'both' ? 'text-lg' : 'text-sm sm:text-base',
                )}
                style={SPEECH_POSITIONS[bubble.who]}
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
