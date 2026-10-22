import { INK } from './ink';
import type { Pose, Shape } from './Flork';
import Flork, { geometry } from './Flork';
import { ShoulderHair, StraightBangs } from './hair';

const SHAPE: Shape = { width: 88, top: 22, eyeGap: 15, hugTo: 'right' };
const HAIR = '#4a2a1c';

type NanaProps = Pose &
  Readonly<{
    // Headband with long floppy dog ears, which she wears only sometimes.
    dogEars?: boolean;
  }>;

export default function Nana({ dogEars = false, ...pose }: NanaProps) {
  const geo = geometry(SHAPE);
  const { l, r, t } = geo;

  return (
    <Flork
      shape={SHAPE}
      {...pose}
      behind={<ShoulderHair geo={geo} color={HAIR} />}
      inside={
        <>
          {/* Black T-shirt with a yellow flower print. */}
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
          <StraightBangs geo={geo} color={HAIR} />
        </>
      }
      overHead={
        dogEars && (
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
        )
      }
    />
  );
}
