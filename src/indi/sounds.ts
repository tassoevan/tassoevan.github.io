// Every sound is synthesized with the Web Audio API, so the page downloads no audio files.

export type Sound =
  | 'hug'
  | 'pout'
  | 'tea'
  | 'acai'
  | 'blanketOn'
  | 'blanketOff'
  | 'hoodie'
  | 'note'
  | 'breatheIn'
  | 'breatheOut'
  | 'dance'
  | 'jump'
  | 'spin'
  | 'trip'
  | 'dusty'
  | 'bark'
  | 'eyebrows'
  | 'cyclops'
  | 'boopTasso'
  | 'boopIndi'
  | 'toggle';

const STORAGE_KEY = 'indi:sound';
const VOLUME = 0.25;

let context: AudioContext | undefined;
let master: GainNode | undefined;
let enabled = readPreference();

// Sound is on unless she has turned it off.
function readPreference() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'off';
  } catch {
    return true;
  }
}

export function isSoundEnabled() {
  return enabled;
}

export function setSoundEnabled(value: boolean) {
  enabled = value;
  try {
    localStorage.setItem(STORAGE_KEY, value ? 'on' : 'off');
  } catch {
    // Private browsing may block storage; the choice then lasts only for this visit.
  }
}

// Browsers only allow audio after a user gesture, so the context is created lazily.
function audio() {
  if (!context || !master) {
    context = new AudioContext();
    master = context.createGain();
    master.gain.value = VOLUME;
    master.connect(context.destination);
  }
  if (context.state === 'suspended') void context.resume();
  return { ctx: context, out: master };
}

type ToneOptions = Readonly<{
  freq: number;
  to?: number;
  at?: number;
  duration: number;
  type?: OscillatorType;
  volume?: number;
  attack?: number;
}>;

function tone({ freq, to, at = 0, duration, type = 'sine', volume = 1, attack }: ToneOptions) {
  const { ctx, out } = audio();
  const start = ctx.currentTime + at;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, start + duration);

  // Soft attack and release, so nothing clicks or startles.
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + (attack ?? Math.min(0.03, duration / 4)));
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc.connect(gain).connect(out);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

type WhooshOptions = Readonly<{
  from: number;
  to: number;
  at?: number;
  duration: number;
  volume?: number;
}>;

// Filtered noise sweep, for fabric and pouring.
function whoosh({ from, to, at = 0, duration, volume = 0.6 }: WhooshOptions) {
  const { ctx, out } = audio();
  const start = ctx.currentTime + at;
  const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.value = 1.2;
  filter.frequency.setValueAtTime(from, start);
  filter.frequency.exponentialRampToValueAtTime(to, start + duration);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + duration / 2);
  gain.gain.linearRampToValueAtTime(0, start + duration);

  source.connect(filter).connect(gain).connect(out);
  source.start(start);
}

// Note frequencies in Hz.
const C5 = 523.25;
const D5 = 587.33;
const E5 = 659.25;
const G4 = 392;
const G5 = 783.99;
const A4 = 440;
const C6 = 1046.5;

const SOUNDS: Record<Sound, () => void> = {
  hug: () => {
    tone({ freq: C5, duration: 1.2, volume: 0.5 });
    tone({ freq: E5, at: 0.12, duration: 1.1, volume: 0.4 });
    tone({ freq: G5, at: 0.24, duration: 1, volume: 0.3 });
  },
  pout: () => tone({ freq: A4, to: 330, duration: 0.7, type: 'triangle', volume: 0.5 }),
  tea: () => {
    tone({ freq: 1568, duration: 0.5, volume: 0.3 });
    tone({ freq: 2093, at: 0.08, duration: 0.4, volume: 0.2 });
    whoosh({ from: 400, to: 900, at: 0.25, duration: 0.8, volume: 0.25 });
  },
  acai: () => {
    tone({ freq: 330, to: A4, duration: 0.12, type: 'triangle', volume: 0.5 });
    tone({ freq: 330, to: A4, at: 0.18, duration: 0.12, type: 'triangle', volume: 0.5 });
    tone({ freq: E5, at: 0.42, duration: 0.3, volume: 0.3 });
  },
  blanketOn: () => whoosh({ from: 1200, to: 300, duration: 0.7 }),
  blanketOff: () => whoosh({ from: 300, to: 1200, duration: 0.6 }),
  hoodie: () =>
    [C5, E5, G5, C6].forEach((freq, i) =>
      tone({ freq, at: i * 0.08, duration: 0.35, type: 'triangle', volume: 0.35 }),
    ),
  note: () => {
    tone({ freq: 880, duration: 0.6, volume: 0.35 });
    tone({ freq: 1318.5, at: 0.15, duration: 0.8, volume: 0.3 });
  },
  breatheIn: () => tone({ freq: 196, to: 247, duration: 3.8, volume: 0.3, attack: 1.8 }),
  breatheOut: () => tone({ freq: 247, to: 196, duration: 3.8, volume: 0.3, attack: 0.6 }),
  dance: () =>
    [G4, C5, A4, D5, C5, E5].forEach((freq, i) =>
      tone({ freq, at: i * 0.25, duration: 0.18, type: 'triangle', volume: 0.4 }),
    ),
  // Matches the four 0.6 s bounces of the jump animation.
  jump: () =>
    [0, 0.6, 1.2, 1.8].forEach((at) =>
      tone({ freq: 220, to: 660, at, duration: 0.25, type: 'triangle', volume: 0.45 }),
    ),
  spin: () => tone({ freq: 300, to: 1200, duration: 1.4, volume: 0.35 }),
  // Slide whistle while falling, then a soft thud.
  trip: () => {
    tone({ freq: 900, to: 200, duration: 0.7, type: 'triangle', volume: 0.4 });
    tone({ freq: 90, to: 50, at: 0.75, duration: 0.25, volume: 0.7 });
  },
  // Dust puffs, then a little sneeze.
  dusty: () => {
    whoosh({ from: 600, to: 300, duration: 0.35, volume: 0.4 });
    whoosh({ from: 700, to: 300, at: 0.5, duration: 0.35, volume: 0.4 });
    tone({ freq: 700, to: 900, at: 1.1, duration: 0.25, type: 'triangle', volume: 0.3 });
    whoosh({ from: 2500, to: 800, at: 1.35, duration: 0.3, volume: 0.5 });
  },
  bark: () => {
    tone({ freq: 620, to: 420, duration: 0.12, type: 'triangle', volume: 0.5 });
    tone({ freq: 620, to: 420, at: 0.2, duration: 0.12, type: 'triangle', volume: 0.5 });
  },
  // Two cheeky slides up, in time with the eyebrows.
  eyebrows: () => {
    tone({ freq: 500, to: 820, duration: 0.14, type: 'triangle', volume: 0.4 });
    tone({ freq: 500, to: 820, at: 0.28, duration: 0.14, type: 'triangle', volume: 0.4 });
  },
  // A soft heartbeat, twice.
  cyclops: () =>
    [0, 0.18, 0.8, 0.98].forEach((at) =>
      tone({ freq: 90, to: 55, at, duration: 0.16, volume: 0.8 }),
    ),
  boopTasso: () => tone({ freq: 520, to: 260, duration: 0.18, type: 'triangle', volume: 0.5 }),
  boopIndi: () => tone({ freq: 780, to: 460, duration: 0.18, type: 'triangle', volume: 0.5 }),
  toggle: () => tone({ freq: E5, duration: 0.15, volume: 0.3 }),
};

export function playSound(sound: Sound) {
  if (!enabled) return;
  try {
    SOUNDS[sound]();
  } catch {
    // Sound is a nicety; ignore browsers that refuse to play it.
  }
}
