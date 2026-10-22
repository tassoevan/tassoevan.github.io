import type { ReactNode } from 'react';
import { useId } from 'react';
import type { Eyes, Mouth } from './face';
import { Eye, MouthShape } from './face';
import { INK } from './ink';
import type { Item } from './items';
import { HeldItem } from './items';

// `hold` carries something in the right hand, in front of the body; `holdLeft`, in the left.
export type Arms = 'down' | 'up' | 'hug' | 'hold' | 'holdLeft' | 'point';

// Flork style: head and body are a single bean shape, with stick arms and legs and blob hands.
// Everyone shares a 120×190 local canvas. `top` is where the dome starts, and the girls are
// scaled down by the scene. `hugTo` is the side where the person they hug stands.
export type Shape = Readonly<{
  width: number;
  top: number;
  eyeGap: number;
  hugTo: 'left' | 'right';
}>;

const BOTTOM = 162;

// Landmarks every character draws against: body edges (left, right, top, bottom) and eyes.
export function geometry({ width, top, eyeGap }: Shape) {
  const t = top;
  return {
    l: 60 - width / 2,
    r: 60 + width / 2,
    t,
    b: BOTTOM,
    eyeY: t + 40,
    eyeXs: [60 - eyeGap, 60 + eyeGap] as const,
  };
}

export type Geometry = ReturnType<typeof geometry>;

function beanPath({ l, r, t, b }: Geometry) {
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
function armShapes(
  { l, r, t }: Geometry,
  hugTo: Shape['hugTo'],
  arms: Arms,
): [string, number, number][] {
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
      return hugTo === 'left'
        ? [[`M${l + 1},${y} Q${l - 30},${y + 2} ${l - 66},${y + 8}`, l - 66, y + 8], rightDown]
        : [leftDown, [`M${r - 1},${y} Q${r + 24},${y + 14} ${r + 48},${y + 8}`, r + 48, y + 8]];
    // Index finger up, as when explaining something.
    case 'point':
      return [leftDown, [`M${r - 1},${y} Q${r + 14},${y - 10} ${r + 8},${y - 36}`, r + 8, y - 36]];
    case 'holdLeft':
      return [[`M${l + 1},${y} Q${l - 6},${y + 24} 54,${y + 22}`, 54, y + 22], rightDown];
    case 'hold':
      return [leftDown, [`M${r - 1},${y} Q${r + 6},${y + 24} 66,${y + 22}`, 66, y + 22]];
    default:
      return [leftDown, rightDown];
  }
}

// What the scene can ask of anyone: a pose, a face and something in hand.
export type Pose = Readonly<{
  arms?: Arms;
  mouth?: Mouth;
  eyes?: Eyes;
  blush?: boolean;
  holding?: Item;
  // Roller skates on both feet, in this color.
  skates?: string;
}>;

// Each character fills these layers, listed in drawing order.
type Layers = Readonly<{
  // Behind the body: long hair, ponytail, tail.
  behind?: ReactNode;
  // Inside the body, clipped to its outline: clothes, hair, freckles.
  inside: ReactNode;
  // Over the head, before the eyes: locks of hair, headbands.
  overHead?: ReactNode;
  // Around the eyes: eyebrows, glasses.
  face?: ReactNode;
  // Replaces the mouth, as a pacifier does.
  mouthCover?: ReactNode;
  // Gap in the front teeth, shown when grinning.
  toothGap?: boolean;
  // In front of the body, under the arms: something hugged to the chest.
  front?: ReactNode;
  // Over everything.
  top?: ReactNode;
}>;

type FlorkProps = Pose &
  Layers &
  Readonly<{
    shape: Shape;
    // Blush when not blushing on purpose; zero for no rosy cheeks at all.
    restingBlush?: number;
  }>;

export default function Flork({
  shape,
  restingBlush = 0.45,
  arms = 'down',
  mouth = 'smile',
  eyes = 'open',
  blush = false,
  holding,
  skates,
  behind,
  inside,
  overHead,
  face,
  mouthCover,
  toothGap,
  front,
  top,
}: FlorkProps) {
  const clipId = useId();
  const geo = geometry(shape);
  const { t, b, eyeY, eyeXs } = geo;
  const bean = beanPath(geo);
  const armList = armShapes(geo, shape.hugTo, arms);
  const [, handX, handY] = armList[arms === 'holdLeft' ? 0 : 1];

  return (
    <g stroke={INK} strokeWidth={4} strokeLinecap='round' strokeLinejoin='round' fill='none'>
      <defs>
        <clipPath id={clipId}>
          <path d={bean} />
        </clipPath>
      </defs>

      {behind}

      <path
        d={`M48,${b - 2} L46,${b + 22} L38,${b + 24} M72,${b - 2} L74,${b + 22} L82,${b + 24}`}
      />

      {skates && (
        <g strokeWidth={2}>
          {[36, 70].map((x) => (
            <g key={x}>
              <rect x={x - 1} y={b + 17} width={15} height={9} rx={3} fill={skates} />
              <circle cx={x + 2.5} cy={b + 28.5} r={2.4} fill='#fff' />
              <circle cx={x + 10.5} cy={b + 28.5} r={2.4} fill='#fff' />
            </g>
          ))}
        </g>
      )}

      <path d={bean} fill='#fbfdff' stroke='none' />
      <g clipPath={`url(#${clipId})`} stroke='none'>
        {inside}
        <g fill='#f4a7b3' opacity={blush ? 0.9 : restingBlush}>
          <circle cx={eyeXs[0] - 7} cy={eyeY + 16} r={7} />
          <circle cx={eyeXs[1] + 7} cy={eyeY + 16} r={7} />
        </g>
      </g>
      <path d={bean} />

      {overHead}

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

      {face}

      {mouthCover ?? <MouthShape mouth={mouth} y={t + 64} gap={toothGap} />}

      {front}

      {armList.map(([d, x, y]) => (
        <g key={d}>
          <path d={d} strokeWidth={3.5} />
          <ellipse cx={x} cy={y} rx={6.5} ry={6} fill={INK} stroke='none' />
        </g>
      ))}

      {holding && <HeldItem item={holding} x={handX} y={handY} />}

      {top}
    </g>
  );
}
