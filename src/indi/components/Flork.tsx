import { useId } from 'react';

export type Character = 'tasso' | 'indi';
export type Arms = 'down' | 'up' | 'hug' | 'hold';
export type Mouth = 'smile' | 'grin' | 'open' | 'flat' | 'pout';
export type Item = 'mug' | 'note' | 'acai';
export type Eyes = 'open' | 'closed' | 'happy';

const INK = '#111';
const BOTTOM = 162;

// Flork style: head and body are a single bean shape, with stick arms and legs and blob hands.
// Both characters share a 120×190 local canvas; `top` is where the dome starts.
const TRAITS = {
  tasso: { width: 100, top: 6, eyeGap: 18 },
  indi: { width: 86, top: 12, eyeGap: 15 },
} as const;

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
    // Reaches toward the partner, who sits about 100 units to the side.
    case 'hug':
      return character === 'tasso'
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
  return (
    <g stroke='none'>
      <circle cx={x} cy={y} r={5.5} fill={INK} />
      <circle cx={x + 1.6} cy={y - 1.8} r={1.7} fill='#fff' />
    </g>
  );
}

function MouthShape({ mouth, y }: Readonly<{ mouth: Mouth; y: number }>) {
  switch (mouth) {
    case 'grin':
      return <path d={`M47,${y - 2} Q60,${y + 16} 73,${y - 2} Z`} fill={INK} />;
    case 'open':
      return <ellipse cx={60} cy={y + 4} rx={5} ry={6} fill={INK} />;
    case 'flat':
      return <path d={`M52,${y + 3} L68,${y + 3}`} />;
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
}: FlorkProps) {
  const clipId = useId();
  const { eyeGap } = TRAITS[character];
  const { l, t, b } = bounds(character);
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
        <g fill='#f4a7b3' opacity={blush ? 0.9 : character === 'indi' ? 0.45 : 0}>
          <circle cx={eyeXs[0] - 7} cy={eyeY + 16} r={7} />
          <circle cx={eyeXs[1] + 7} cy={eyeY + 16} r={7} />
        </g>
      </g>
      <path d={bean} />

      <g className={eyes === 'open' ? 'flork-blink' : undefined}>
        <Eye x={eyeXs[0]} y={eyeY} eyes={eyes} />
        <Eye x={eyeXs[1]} y={eyeY} eyes={eyes} />
      </g>

      {character === 'indi' && (
        // Her strong, dark eyebrows; the inner ends rise when she is sad.
        <g stroke='#2a160f' strokeWidth={3.5}>
          {sad ? (
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
        </g>
      )}

      <MouthShape mouth={mouth} y={t + 64} />

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
        </g>
      )}
    </g>
  );
}
