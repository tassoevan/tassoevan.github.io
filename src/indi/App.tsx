import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import type { Arms, Character, Eyes, Mouth } from './components/Flork';
import Flork from './components/Flork';
import Scene from './components/Scene';
import { BREATH, LINES, NOTES } from './messages';
import type { Sound } from './sounds';
import { isSoundEnabled, playSound, setSoundEnabled } from './sounds';

type Silly = 'dance' | 'jump' | 'spin' | 'trip';
type Action = 'hug' | 'pout' | 'tea' | 'acai' | Silly | 'boop-tasso' | 'boop-indi';

const SILLIES: readonly Silly[] = ['dance', 'jump', 'spin', 'trip'];

const ACTION_DURATIONS: Record<Action, number> = {
  hug: 4500,
  pout: 2800,
  tea: 8000,
  acai: 8000,
  dance: 3000,
  jump: 2400,
  spin: 2000,
  trip: 3200,
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
  'boop-tasso': 'boopTasso',
  'boop-indi': 'boopIndi',
};

const SPEECH_DURATION = 4500;
const BREATH_PHASE_DURATION = 4000;

type Speech = Readonly<{ id: number; who: Character | 'both'; text: string }>;

// Picks a random item, avoiding the previous one when there is a choice.
function pick<T>(items: readonly T[], previous?: T): T {
  const candidates = items.length > 1 ? items.filter((item) => item !== previous) : items;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function greeting(): Speech {
  const hour = new Date().getHours();
  const lines = hour < 12 ? LINES.morning : hour < 18 ? LINES.afternoon : LINES.night;
  return { id: 0, who: 'tasso', text: pick(lines) };
}

const SPEECH_POSITIONS = { indi: '38%', tasso: '63%', both: '50%' } as const;

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
  const [action, setAction] = useState<{ id: number; type: Action } | null>(null);
  const [speech, setSpeech] = useState<Speech | null>(greeting);
  const [blanket, setBlanket] = useState(false);
  const [hoodieOnIndi, setHoodieOnIndi] = useState(false);
  const [breathing, setBreathing] = useState(false);
  const [breathIn, setBreathIn] = useState(true);
  const [note, setNote] = useState<string | null>(null);
  const [sound, setSound] = useState(isSoundEnabled);

  useEffect(() => {
    if (!action) return;
    const timeout = setTimeout(() => {
      if (action.type !== 'pout') return setAction(null);
      // He notices the pout and comes over for a comforting hug.
      setAction({ id: Date.now(), type: 'hug' });
      setSpeech({ id: Date.now(), who: 'tasso', text: pick(LINES.comfort) });
      playSound('hug');
    }, ACTION_DURATIONS[action.type]);
    return () => clearTimeout(timeout);
  }, [action]);

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
    setAction({ id: Date.now(), type });
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
    setNote((current) => pick(NOTES, current ?? undefined));
    say('tasso', LINES.note);
    playSound('note');
  };

  const silly = () => {
    const type = pick(SILLIES, action?.type as Silly | undefined);
    play(type, 'tasso', LINES[type]);
  };

  const boop = (character: Character) =>
    character === 'tasso'
      ? play('boop-tasso', 'tasso', LINES.boopTasso)
      : play('boop-indi', 'indi', LINES.boopIndi);

  // While breathing, the bubble guides the rhythm instead of showing reactions.
  const bubble: Speech | null = breathing
    ? { id: breathIn ? -1 : -2, who: 'both', text: breathIn ? BREATH.in : BREATH.out }
    : speech;

  const type = action?.type;
  const isSilly = SILLIES.includes(type as Silly);
  const resting = blanket || breathing;

  let tassoArms: Arms = 'down';
  if (type === 'hug') tassoArms = 'hug';
  else if (isSilly) tassoArms = 'up';
  else if (type === 'acai' || note) tassoArms = 'hold';

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
  else if (isSilly) tassoMotion = `flork-${type}`;
  else if (type === 'boop-tasso') tassoMotion = 'flork-boop';

  let indiMotion = 'flork-idle flork-idle-late';
  if (breathing) indiMotion = 'flork-breathe';
  else if (isSilly) indiMotion = 'flork-giggle';
  else if (type === 'boop-indi') indiMotion = 'flork-boop';

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
            lean={type === 'hug'}
            hearts={type === 'hug' || type === 'boop-indi'}
            blanket={blanket}
            breathing={breathing}
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
                  holding={type === 'acai' ? 'acai' : tassoArms === 'hold' ? 'note' : undefined}
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
                  'speech-bubble absolute max-w-[62%] -translate-x-1/2 rounded-2xl border-2 border-[#111] bg-white px-3 py-1.5 text-center leading-snug font-semibold text-[#111] shadow-md',
                  bubble.who === 'both' ? 'text-lg' : 'text-sm sm:text-base',
                )}
                style={{ left: SPEECH_POSITIONS[bubble.who] }}
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

      <footer className='text-muted mt-auto text-center text-sm'>
        Toque na gente também. Feito com 🤍 pelo seu mor.
      </footer>
    </div>
  );
}
