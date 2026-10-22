import type { Pose, Shape } from './Flork';
import Flork, { geometry } from './Flork';
import { ShoulderHair, StraightBangs } from './hair';

const SHAPE: Shape = { width: 90, top: 28, eyeGap: 15, hugTo: 'left' };
const HAIR = '#5c3622';

type LoloProps = Pose &
  Readonly<{
    // Red pacifier, like the one in her photos, which she has only sometimes.
    pacifier?: boolean;
  }>;

export default function Lolo({ pacifier = false, ...pose }: LoloProps) {
  const geo = geometry(SHAPE);
  const { r, t, b } = geo;

  return (
    <Flork
      shape={SHAPE}
      {...pose}
      behind={
        <>
          <ShoulderHair geo={geo} color={HAIR} />
          {/* She loves pretending to be a puppy, wagging tail included. */}
          <path
            className='flork-wag'
            d={`M${r - 6},${b - 30} Q${r + 14},${b - 34} ${r + 12},${b - 54}`}
          />
        </>
      }
      inside={
        <>
          {/* Peach T-shirt with a little heart. */}
          <g>
            <path d={`M0,${t + 94} Q60,${t + 102} 120,${t + 94} V200 H0 Z`} fill='#f2b39b' />
            <path d={`M60,${t + 128} c-7,-7 -5,-14 0,-10 c5,-4 7,3 0,10 z`} fill='#d9607a' />
          </g>
          <StraightBangs geo={geo} color={HAIR} />
        </>
      }
      mouthCover={
        pacifier ? (
          <g strokeWidth={2.5}>
            <ellipse cx={60} cy={t + 66} rx={11} ry={7} fill='#d62f3a' />
            <circle cx={60} cy={t + 66} r={4} stroke='#fff' />
          </g>
        ) : undefined
      }
      toothGap
    />
  );
}
