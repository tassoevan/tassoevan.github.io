import { useId } from 'react';

export type Kid = 'jojo' | 'nana' | 'lolo';
export type Character = 'tasso' | 'indi' | Kid;
export type Arms = 'down' | 'up' | 'hug' | 'hold';
export type Mouth = 'smile' | 'grin' | 'open' | 'flat' | 'pout' | 'smirk';
export type Item = 'mug' | 'note' | 'acai' | 'plush' | 'flagGun';
// `cyclops` is one big eye in the middle, for when she leans in so close that's all he sees.
export type Eyes = 'open' | 'closed' | 'happy' | 'sly' | 'cyclops';

const INK = '#111';
const BOTTOM = 162;

// Flork style: head and body are a single bean shape, with stick arms and legs and blob hands.
// Everyone shares a 120×190 local canvas; `top` is where the dome starts, and the girls are
// scaled down by the scene. `hugTo` is the side where the person they hug stands.
const TRAITS = {
  tasso: { width: 100, top: 6, eyeGap: 18, hugTo: 'left' },
  indi: { width: 86, top: 12, eyeGap: 15, hugTo: 'right' },
  jojo: { width: 84, top: 14, eyeGap: 14, hugTo: 'right' },
  nana: { width: 88, top: 22, eyeGap: 15, hugTo: 'right' },
  lolo: { width: 90, top: 28, eyeGap: 15, hugTo: 'left' },
} as const;

const HAIR = { indi: '#3a1d14', jojo: '#a3173f', nana: '#4a2a1c', lolo: '#5c3622' } as const;

function bounds(character: Character) {
  const { width, top } = TRAITS[character];
  return { l: 60 - width / 2, r: 60 + width / 2, t: top, b: BOTTOM };
}

function beanPath(character: Character) {
  const { l, r, t, b } = bounds(character);
  return [
    `M${l + 2},${b - 12}`,
    `C${l - 2},${t + 110} ${l - 2},${t + 64} ${l + 4},${t + 40}`,
    `C${l + 10},${t + 8} ${42},${t} 60,${t}`,
    `C${78},${t} ${r - 10},${t + 8} ${r - 4},${t + 40}`,
    `C${r + 2},${t + 64} ${r + 2},${t + 110} ${r - 2},${b - 12}`,
    `Q${r - 6},${b} ${r - 24},${b}`,
    `Q60,${b + 3} ${l + 24},${b}`,
    `Q${l + 6},${b} ${l + 2},${b - 12} Z`,
  ].join(' ');
}

// Each arm is a stroke ending in a hand, given as [path, hand x, hand y].
function armShapes(character: Character, arms: Arms): [string, number, number][] {
  const { l, r, t } = bounds(character);
  const y = t + 88;
  const leftDown: [string, number, number] = [
    `M${l + 1},${y} Q${l - 10},${y + 16} ${l - 6},${y + 34}`,
    l - 6,
    y + 34,
  ];
  const rightDown: [string, number, number] = [
    `M${r - 1},${y} Q${r + 10},${y + 16} ${r + 6},${y + 34}`,
    r + 6,
    y + 34,
  ];

  switch (arms) {
    case 'up':
      return [
        [`M${l + 1},${y} Q${l - 18},${y - 14} ${l - 14},${y - 40}`, l - 14, y - 40],
        [`M${r - 1},${y} Q${r + 18},${y - 14} ${r + 14},${y - 40}`, r + 14, y - 40],
      ];
    // Reaches toward whoever sits beside them.
    case 'hug':
      return TRAITS[character].hugTo === 'left'
        ? [[`M${l + 1},${y} Q${l - 30},${y + 2} ${l - 66},${y + 8}`, l - 66, y + 8], rightDown]
        : [leftDown, [`M${r - 1},${y} Q${r + 24},${y + 14} ${r + 48},${y + 8}`, r + 48, y + 8]];
    case 'hold':
      return [leftDown, [`M${r - 1},${y} Q${r + 6},${y + 24} 66,${y + 22}`, 66, y + 22]];
    default:
      return [leftDown, rightDown];
  }
}

function Eye({ x, y, eyes }: Readonly<{ x: number; y: number; eyes: Eyes }>) {
  if (eyes === 'closed') return <path d={`M${x - 7},${y - 1} Q${x},${y + 7} ${x + 7},${y - 1}`} />;
  if (eyes === 'happy') return <path d={`M${x - 7},${y + 3} Q${x},${y - 6} ${x + 7},${y + 3}`} />;
  // Half-closed lids, for a knowing look.
  if (eyes === 'sly') {
    return (
      <g>
        <path d={`M${x - 5.5},${y} A5.5,5.5 0 0 0 ${x + 5.5},${y} Z`} fill={INK} stroke='none' />
        <path d={`M${x - 7},${y} H${x + 7}`} strokeWidth={3} />
      </g>
    );
  }
  return (
    <g stroke='none'>
      <circle cx={x} cy={y} r={5.5} fill={INK} />
      <circle cx={x + 1.6} cy={y - 1.8} r={1.7} fill='#fff' />
    </g>
  );
}

function MouthShape({ mouth, y, gap }: Readonly<{ mouth: Mouth; y: number; gap?: boolean }>) {
  switch (mouth) {
    case 'grin':
      return (
        <g>
          <path d={`M47,${y - 2} Q60,${y + 16} 73,${y - 2} Z`} fill={INK} />
          {/* Missing front teeth. */}
          {gap && (
            <g fill='#fff' stroke='none'>
              <rect x={50} y={y - 1} width={6} height={4} rx={1} />
              <rect x={64} y={y - 1} width={6} height={4} rx={1} />
            </g>
          )}
        </g>
      );
    case 'open':
      return <ellipse cx={60} cy={y + 4} rx={5} ry={6} fill={INK} />;
    case 'flat':
      return <path d={`M52,${y + 3} L68,${y + 3}`} />;
    // Lopsided, mischievous smile.
    case 'smirk':
      return <path d={`M49,${y + 2} Q62,${y + 9} 72,${y - 4}`} />;
    // Sulky frown with the lower lip pushed out.
    case 'pout':
      return (
        <g>
          <path d={`M50,${y + 4} Q60,${y - 3} 70,${y + 4}`} />
          <path d={`M53,${y + 6} Q60,${y + 13} 67,${y + 6}`} strokeWidth={3} />
        </g>
      );
    default:
      return <path d={`M48,${y} Q60,${y + 10} 72,${y}`} />;
  }
}

function Mug({ x, y }: Readonly<{ x: number; y: number }>) {
  return (
    <g>
      <path className='flork-steam' d={`M${x - 3},${y - 16} q-3,-5 0,-9 q3,-4 0,-8`} />
      <path
        className='flork-steam'
        style={{ animationDelay: '0.6s' }}
        d={`M${x + 3},${y - 16} q-3,-5 0,-9 q3,-4 0,-8`}
      />
      <path d={`M${x + 7},${y - 9} q7,0 7,5 q0,5 -7,5`} />
      <rect x={x - 7} y={y - 13} width={14} height={15} rx={2} fill='#f3e6d8' />
      <path d={`M${x - 2},${y - 6} l2,2 l2,-2`} stroke='#c4405a' strokeWidth={2} />
    </g>
  );
}

function Envelope({ x, y }: Readonly<{ x: number; y: number }>) {
  return (
    <g>
      <rect x={x - 9} y={y - 12} width={18} height={13} rx={1.5} fill='#fff' />
      <path d={`M${x - 9},${y - 12} L${x},${y - 5} L${x + 9},${y - 12}`} strokeWidth={2} />
      <path
        d={`M${x},${y - 1} c-3,-3 -2,-6 0,-4.5 c2,-1.5 3,1.5 0,4.5 z`}
        fill='#c4405a'
        stroke='none'
      />
    </g>
  );
}

function Acai({ x, y }: Readonly<{ x: number; y: number }>) {
  return (
    <g strokeWidth={2}>
      <path d={`M${x + 1},${y - 17} L${x + 8},${y - 29}`} />
      <path
        d={`M${x - 8},${y - 14} L${x + 8},${y - 14} L${x + 6},${y + 2} L${x - 6},${y + 2} Z`}
        fill='#fff'
      />
      <path d={`M${x - 7},${y - 9} H${x + 7}`} stroke='#7b3b8f' strokeWidth={3} />
      <path d={`M${x - 9},${y - 14} Q${x},${y - 24} ${x + 9},${y - 14} Z`} fill='#4b1d5c' />
      <circle cx={x - 3} cy={y - 17} r={2} fill='#f3e3a0' strokeWidth={1} />
      <circle cx={x + 4} cy={y - 16} r={2} fill='#f3e3a0' strokeWidth={1} />
    </g>
  );
}

// A sleepy little octopus plush, famous for being "pôdi, pôdi" with dust.
// Cartoon toy gun that pops out a flag, for her "peteco! peteco!" joke.
function FlagGun({ x, y }: Readonly<{ x: number; y: number }>) {
  return (
    <g strokeWidth={1.5}>
      <g className='flag-pop'>
        <path d={`M${x + 10},${y - 3.5} H${x + 18}`} />
        <rect x={x + 18} y={y - 10} width={30} height={13} rx={1.5} fill='#fff' />
        <text
          x={x + 33}
          y={y - 1}
          textAnchor='middle'
          fontSize={7}
          fontWeight={800}
          fill='#d62f3a'
          stroke='none'
        >
          PETECO!
        </text>
      </g>
      <rect x={x - 6} y={y - 6} width={15} height={5} rx={1} fill='#f2a541' />
      <rect x={x + 8} y={y - 6.5} width={3} height={6} rx={1} fill='#d62f3a' />
      <path d={`M${x - 5},${y - 1} H${x - 1} L${x - 2},${y + 7} H${x - 6} Z`} fill='#f2a541' />
    </g>
  );
}

function Plush({ x, y }: Readonly<{ x: number; y: number }>) {
  return (
    <g strokeWidth={2}>
      <path
        d={`M${x - 8},${y - 4} q-4,7 -8,6 M${x - 3},${y - 2} q-1,8 -4,10 M${x + 3},${y - 2} q1,8 4,10 M${x + 8},${y - 4} q4,7 8,6`}
        stroke='#5f9e95'
        strokeWidth={4}
      />
      <ellipse cx={x} cy={y - 12} rx={11} ry={12} fill='#8cc4bb' />
      <path d={`M${x - 8},${y - 13} h6 M${x + 2},${y - 13} h6`} />
      <circle cx={x - 5} cy={y - 11.5} r={1.4} fill={INK} stroke='none' />
      <circle cx={x + 5} cy={y - 11.5} r={1.4} fill={INK} stroke='none' />
      <g fill='#b8afa6' stroke='none'>
        {[
          [-15, -22, 0],
          [14, -26, 0.25],
          [-4, -30, 0.5],
          [18, -12, 0.75],
          [-18, -8, 1],
        ].map(([dx, dy, delay]) => (
          <circle
            key={`${dx}${dy}`}
            className='dust-puff'
            style={{ animationDelay: `${delay}s` }}
            cx={x + dx}
            cy={y + dy}
            r={5}
          />
        ))}
      </g>
    </g>
  );
}

function Hair({ character }: Readonly<{ character: Character }>) {
  const { l, r, t } = bounds(character);

  if (character === 'tasso') {
    return (
      <g fill='#2b1d16'>
        {/* Short hair combed back. */}
        <path d={`M0,0 H120 V${t + 22} Q92,${t + 8} 60,${t + 12} Q30,${t + 14} 0,${t + 28} Z`} />
        {/* Full beard around the mouth, with a moustache. */}
        <path
          d={`M0,${t + 46} Q${l + 12},${t + 50} ${l + 16},${t + 58} Q36,${t + 76} 60,${t + 76} Q84,${t + 76} ${r - 16},${t + 58} Q${r - 12},${t + 50} 120,${t + 46} V${t + 76} Q60,${t + 100} 0,${t + 76} Z`}
        />
        <path d={`M45,${t + 60} Q60,${t + 52} 75,${t + 60} Q60,${t + 57} 45,${t + 60} Z`} />
      </g>
    );
  }

  if (character === 'jojo') {
    // Long, loose hair dyed red, parted in the middle.
    return (
      <g fill={HAIR.jojo}>
        <path
          d={`M0,0 H120 V${t + 70} Q${r - 10},${t + 30} 62,${t + 14} H58 Q${l + 10},${t + 30} 0,${t + 70} Z`}
        />
        <path d={`M0,${t + 30} Q${l + 12},${t + 54} ${l + 10},${t + 112} H0 Z`} />
        <path d={`M120,${t + 30} Q${r - 12},${t + 54} ${r - 10},${t + 112} H120 Z`} />
      </g>
    );
  }

  if (character === 'nana' || character === 'lolo') {
    // Straight bangs, with the sides falling to the shoulders.
    return (
      <path
        d={`M0,0 H120 V${t + 66} H${r - 10} L${r - 12},${t + 26} Q60,${t + 31} ${l + 12},${t + 26} L${l + 10},${t + 66} H0 Z`}
        fill={HAIR[character]}
      />
    );
  }

  // Hair pulled back, with comb lines toward the ponytail.
  return (
    <g>
      <path
        d={`M0,0 H120 V${t + 32} Q${r - 6},${t + 14} 60,${t + 14} Q${l + 6},${t + 14} 0,${t + 32} Z`}
        fill='#3a1d14'
      />
      <path
        d={`M46,${t + 15} Q40,${t + 6} 30,${t + 4} M60,${t + 14} Q52,${t + 4} 40,${t} M76,${t + 15} Q66,${t + 2} 52,${t - 2}`}
        fill='none'
        stroke='#6b3a28'
        strokeWidth={1.5}
      />
    </g>
  );
}

export type Outfit = 'hoodie' | 'own';

// The light pink hoodie she loves, which either of them may be wearing.
function Hoodie({ t }: Readonly<{ t: number }>) {
  const neckline = `M0,${t + 92} Q60,${t + 104} 120,${t + 92}`;
  return (
    <g stroke='#c98a9a' strokeWidth={2.5}>
      <path d={`${neckline} V200 H0 Z`} fill='#f6cfd8' stroke='none' />
      <path d={`M14,${t + 90} Q60,${t + 118} 106,${t + 90}`} fill='none' />
      <path d={`M54,${t + 106} v16 M66,${t + 106} v16`} fill='none' />
      <path d={`M38,200 L42,${t + 128} Q60,${t + 122} 78,${t + 128} L82,200`} fill='none' />
      <path d={neckline} stroke={INK} strokeWidth={3} fill='none' />
    </g>
  );
}

function Clothes({ character, outfit }: Readonly<{ character: Character; outfit: Outfit }>) {
  const { t } = bounds(character);

  if (outfit === 'hoodie') return <Hoodie t={t} />;

  if (character === 'tasso') {
    // Grey T-shirt with its zigzag print.
    return (
      <g>
        <path d={`M0,${t + 92} Q60,${t + 104} 120,${t + 92} V200 H0 Z`} fill='#4b5058' />
        <path
          d={`M44,${t + 124} l8,9 l8,-9 l8,9 l8,-9`}
          fill='none'
          stroke='#25282d'
          strokeWidth={3}
        />
      </g>
    );
  }

  if (character === 'jojo') {
    // Black and white striped sweater.
    return (
      <g>
        <path d={`M0,${t + 94} Q60,${t + 102} 120,${t + 94} V200 H0 Z`} fill='#ece8e2' />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={0} y={t + 104 + i * 12} width={120} height={6} fill='#3b3b3b' />
        ))}
      </g>
    );
  }

  if (character === 'nana') {
    // Black T-shirt with a yellow flower print.
    return (
      <g>
        <path d={`M0,${t + 94} Q60,${t + 102} 120,${t + 94} V200 H0 Z`} fill='#1e1e1e' />
        {[
          [46, t + 116],
          [72, t + 124],
          [56, t + 136],
        ].map(([x, y]) => (
          <g key={x}>
            <circle cx={x} cy={y} r={6} fill='#f2c230' />
            <circle cx={x} cy={y} r={2.2} fill='#8a5a00' />
          </g>
        ))}
      </g>
    );
  }

  if (character === 'lolo') {
    // Peach T-shirt with a little heart.
    return (
      <g>
        <path d={`M0,${t + 94} Q60,${t + 102} 120,${t + 94} V200 H0 Z`} fill='#f2b39b' />
        <path d={`M60,${t + 128} c-7,-7 -5,-14 0,-10 c5,-4 7,3 0,10 z`} fill='#d9607a' />
      </g>
    );
  }

  // Bordô cardigan over a black top.
  return (
    <g>
      <path d={`M0,${t + 94} Q60,${t + 102} 120,${t + 94} V200 H0 Z`} fill='#7a1f33' />
      <path d={`M48,${t + 98} L55,200 H65 L72,${t + 98} Z`} fill='#1b1b1b' />
    </g>
  );
}

type FlorkProps = Readonly<{
  character: Character;
  arms?: Arms;
  mouth?: Mouth;
  eyes?: Eyes;
  blush?: boolean;
  holding?: Item;
  outfit?: Outfit;
  sad?: boolean;
  // Nana's dog-ear headband or Lolô's pacifier, which they wear only sometimes.
  accessory?: boolean;
  // Wiggling eyebrows (Indi) and a flash on the glasses (Tasso).
  wiggle?: boolean;
  shine?: boolean;
}>;

export default function Flork({
  character,
  arms = 'down',
  mouth = 'smile',
  eyes = 'open',
  blush = false,
  holding,
  outfit = 'own',
  sad = false,
  accessory = false,
  wiggle = false,
  shine = false,
}: FlorkProps) {
  const clipId = useId();
  const { eyeGap } = TRAITS[character];
  const { l, r, t, b } = bounds(character);
  const bean = beanPath(character);
  const eyeY = t + 40;
  const eyeXs = [60 - eyeGap, 60 + eyeGap];
  const armList = armShapes(character, arms);
  const hand = armList[1];

  return (
    <g stroke={INK} strokeWidth={4} strokeLinecap='round' strokeLinejoin='round' fill='none'>
      <defs>
        <clipPath id={clipId}>
          <path d={bean} />
        </clipPath>
      </defs>

      {character === 'indi' && (
        // Ponytail behind the head, away from her partner, tied with a bordô scrunchie.
        <g strokeWidth={3}>
          <path
            d={`M${l + 14},${t + 6} C${l - 10},${t - 10} ${l - 26},${t + 10} ${l - 20},${t + 44} C${l - 18},${t + 56} ${l - 12},${t + 64} ${l - 6},${t + 70} C${l - 12},${t + 50} ${l - 6},${t + 30} ${l + 10},${t + 20} Z`}
            fill='#3a1d14'
          />
          <path
            d={`M${l - 4},${t + 8} C${l - 18},${t + 16} ${l - 16},${t + 40} ${l - 12},${t + 56}`}
            stroke='#6b3a28'
            strokeWidth={1.5}
          />
          <ellipse
            cx={l + 9}
            cy={t + 9}
            rx={6}
            ry={8}
            fill='#7a1f33'
            transform={`rotate(-40 ${l + 9} ${t + 9})`}
          />
        </g>
      )}

      {(character === 'jojo' || character === 'nana' || character === 'lolo') && (
        // Hair falling behind the shoulders: long for Jojo, shoulder length for the little ones.
        <path
          d={
            character === 'jojo'
              ? `M${l - 7},${t + 114} C${l - 12},${t + 60} ${l - 4},${t - 6} 60,${t - 7} C${r + 4},${t - 6} ${r + 12},${t + 60} ${r + 7},${t + 114} Q${r},${t + 120} ${r - 6},${t + 108} L${l + 6},${t + 108} Q${l},${t + 120} ${l - 7},${t + 114} Z`
              : `M${l - 6},${t + 72} C${l - 10},${t + 30} ${l - 2},${t - 6} 60,${t - 6} C${r + 2},${t - 6} ${r + 10},${t + 30} ${r + 6},${t + 72} Q${r},${t + 76} ${r - 4},${t + 66} L${l + 4},${t + 66} Q${l},${t + 76} ${l - 6},${t + 72} Z`
          }
          fill={HAIR[character]}
          strokeWidth={3}
        />
      )}

      {character === 'jojo' && (
        // Black cat-ear headband, goth-cute like the characters she loves.
        <path
          d={`M${l + 14},${t + 14} L${l + 12},${t - 12} L${l + 34},${t + 2} Z M${r - 14},${t + 14} L${r - 12},${t - 12} L${r - 34},${t + 2} Z`}
          fill='#1b1b1b'
          strokeWidth={3}
        />
      )}

      {character === 'lolo' && (
        // She loves pretending to be a puppy, wagging tail included.
        <path
          className='flork-wag'
          d={`M${r - 6},${b - 30} Q${r + 14},${b - 34} ${r + 12},${b - 54}`}
        />
      )}

      <path
        d={`M48,${b - 2} L46,${b + 22} L38,${b + 24} M72,${b - 2} L74,${b + 22} L82,${b + 24}`}
      />

      <path d={bean} fill='#fbfdff' stroke='none' />
      <g clipPath={`url(#${clipId})`} stroke='none'>
        <Clothes character={character} outfit={outfit} />
        <Hair character={character} />
        {character === 'indi' && (
          <g fill='#b5785a'>
            {[-8, -2, 4].flatMap((dx, i) =>
              eyeXs.map((x) => (
                <circle key={`${x}${dx}`} cx={x + dx} cy={eyeY + (i === 1 ? 15 : 12)} r={1.2} />
              )),
            )}
          </g>
        )}
        <g fill='#f4a7b3' opacity={blush ? 0.9 : character === 'tasso' ? 0 : 0.45}>
          <circle cx={eyeXs[0] - 7} cy={eyeY + 16} r={7} />
          <circle cx={eyeXs[1] + 7} cy={eyeY + 16} r={7} />
        </g>
      </g>
      <path d={bean} />

      {character === 'jojo' && (
        <g strokeWidth={2}>
          <path
            d={`M${l + 14},${t + 14} Q60,${t - 10} ${r - 14},${t + 14}`}
            stroke='#1b1b1b'
            strokeWidth={5}
          />
          <circle cx={r - 16} cy={t + 26} r={5} fill='#f4a7c8' />
          <circle cx={r - 18} cy={t + 25} r={1} fill={INK} stroke='none' />
          <circle cx={r - 14} cy={t + 25} r={1} fill={INK} stroke='none' />
        </g>
      )}

      {character === 'nana' && accessory && (
        // Headband with long floppy dog ears.
        <g strokeWidth={3}>
          <path d={`M${l + 10},${t + 14} Q60,${t - 10} ${r - 10},${t + 14}`} strokeWidth={5} />
          <path
            d={`M${l + 12},${t + 8} C${l - 6},${t + 4} ${l - 16},${t + 30} ${l - 14},${t + 56} Q${l - 8},${t + 64} ${l - 2},${t + 52} C${l},${t + 34} ${l + 6},${t + 20} ${l + 16},${t + 14} Z`}
            fill={INK}
          />
          <path
            d={`M${r - 12},${t + 8} C${r + 6},${t + 4} ${r + 16},${t + 30} ${r + 14},${t + 56} Q${r + 8},${t + 64} ${r + 2},${t + 52} C${r},${t + 34} ${r - 6},${t + 20} ${r - 16},${t + 14} Z`}
            fill={INK}
          />
        </g>
      )}

      {eyes === 'cyclops' ? (
        <g stroke='none'>
          <circle cx={60} cy={eyeY} r={9} fill={INK} />
          <circle cx={62.6} cy={eyeY - 2.8} r={2.8} fill='#fff' />
        </g>
      ) : (
        <g className={eyes === 'open' ? 'flork-blink' : undefined}>
          <Eye x={eyeXs[0]} y={eyeY} eyes={eyes} />
          <Eye x={eyeXs[1]} y={eyeY} eyes={eyes} />
        </g>
      )}

      {character === 'indi' && (
        // Her strong, dark eyebrows; the inner ends rise when she is sad.
        <g stroke='#2a160f' strokeWidth={3.5} className={wiggle ? 'brow-wiggle' : undefined}>
          {eyes === 'cyclops' ? (
            <path d={`M48,${eyeY - 14} Q60,${eyeY - 20} 72,${eyeY - 14}`} />
          ) : sad ? (
            <path
              d={`M${eyeXs[0] - 8},${eyeY - 9} L${eyeXs[0] + 7},${eyeY - 15} M${eyeXs[1] - 7},${eyeY - 15} L${eyeXs[1] + 8},${eyeY - 9}`}
            />
          ) : (
            <path
              d={`M${eyeXs[0] - 8},${eyeY - 11} Q${eyeXs[0]},${eyeY - 15} ${eyeXs[0] + 8},${eyeY - 12} M${eyeXs[1] - 8},${eyeY - 12} Q${eyeXs[1]},${eyeY - 15} ${eyeXs[1] + 8},${eyeY - 11}`}
            />
          )}
        </g>
      )}

      {character === 'tasso' && (
        <g strokeWidth={3}>
          <rect x={eyeXs[0] - 14} y={eyeY - 10} width={28} height={19} rx={4} />
          <rect x={eyeXs[1] - 14} y={eyeY - 10} width={28} height={19} rx={4} />
          <path d={`M${eyeXs[0] + 14},${eyeY - 3} Q60,${eyeY - 7} ${eyeXs[1] - 14},${eyeY - 3}`} />
          {shine && (
            <path
              className='glasses-shine'
              d={eyeXs
                .map(
                  (x) =>
                    `M${x - 8},${eyeY + 4} L${x - 2},${eyeY - 5} M${x - 3},${eyeY + 5} L${x + 2},${eyeY - 1}`,
                )
                .join(' ')}
              stroke='#fff'
              strokeWidth={2.5}
            />
          )}
        </g>
      )}

      {character === 'lolo' && accessory ? (
        // Red pacifier, like the one in her photos.
        <g strokeWidth={2.5}>
          <ellipse cx={60} cy={t + 66} rx={11} ry={7} fill='#d62f3a' />
          <circle cx={60} cy={t + 66} r={4} stroke='#fff' />
        </g>
      ) : (
        <MouthShape mouth={mouth} y={t + 64} gap={character === 'lolo'} />
      )}

      {armList.map(([d, x, y]) => (
        <g key={d}>
          <path d={d} strokeWidth={3.5} />
          <ellipse cx={x} cy={y} rx={6.5} ry={6} fill={INK} stroke='none' />
        </g>
      ))}

      {holding && (
        // Held items are drawn larger than life so they read well on small screens.
        <g
          transform={`translate(${hand[1]} ${hand[2]}) scale(1.6) translate(${-hand[1]} ${-hand[2] + 4})`}
        >
          {holding === 'mug' && <Mug x={hand[1]} y={hand[2]} />}
          {holding === 'note' && <Envelope x={hand[1]} y={hand[2]} />}
          {holding === 'acai' && <Acai x={hand[1]} y={hand[2]} />}
          {holding === 'plush' && <Plush x={hand[1]} y={hand[2]} />}
          {holding === 'flagGun' && <FlagGun x={hand[1]} y={hand[2]} />}
        </g>
      )}
    </g>
  );
}
