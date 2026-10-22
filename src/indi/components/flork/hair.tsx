import type { Geometry } from './Flork';

// The little ones share a haircut: straight bangs, with the sides falling to the shoulders.

export function ShoulderHair({
  geo: { l, r, t },
  color,
}: Readonly<{ geo: Geometry; color: string }>) {
  return (
    <path
      d={`M${l - 6},${t + 72} C${l - 10},${t + 30} ${l - 2},${t - 6} 60,${t - 6} C${r + 2},${t - 6} ${r + 10},${t + 30} ${r + 6},${t + 72} Q${r},${t + 76} ${r - 4},${t + 66} L${l + 4},${t + 66} Q${l},${t + 76} ${l - 6},${t + 72} Z`}
      fill={color}
      strokeWidth={3}
    />
  );
}

export function StraightBangs({
  geo: { l, r, t },
  color,
}: Readonly<{ geo: Geometry; color: string }>) {
  return (
    <path
      d={`M0,0 H120 V${t + 66} H${r - 10} L${r - 12},${t + 26} Q60,${t + 31} ${l + 12},${t + 26} L${l + 10},${t + 66} H0 Z`}
      fill={color}
    />
  );
}
