import type { Pose, Shape } from './Flork';
import Flork, { geometry } from './Flork';
import { BunnyPlush, GamePhone, starPoints } from './items';

const SHAPE: Shape = { width: 84, top: 14, eyeGap: 14, hugTo: 'right' };
const BLACK = '#16110f';
const RED = '#b8163f';

type JojoProps = Pose &
  Readonly<{
    // Playing on her phone instead of hugging her bunny plush.
    phone?: boolean;
    // Stars bursting around her, when she wins a match.
    celebrate?: boolean;
  }>;

export default function Jojo({ phone = false, celebrate = false, ...pose }: JojoProps) {
  const { l, r, t } = geometry(SHAPE);

  return (
    <Flork
      shape={SHAPE}
      {...pose}
      behind={
        // Very long, wavy black hair falling behind her shoulders.
        <path
          d={`M${l - 7},${t + 140} Q${l - 15},${t + 122} ${l - 9},${t + 104} Q${l - 3},${t + 86} ${l - 11},${t + 68} Q${l - 17},${t + 48} ${l - 8},${t + 28} Q${l - 2},${t + 2} 60,${t - 7} Q${r + 2},${t + 2} ${r + 8},${t + 28} Q${r + 17},${t + 48} ${r + 11},${t + 68} Q${r + 3},${t + 86} ${r + 9},${t + 104} Q${r + 15},${t + 122} ${r + 7},${t + 140} Q${r + 2},${t + 148} ${r - 4},${t + 136} L${l + 4},${t + 136} Q${l - 2},${t + 148} ${l - 7},${t + 140} Z`}
          fill={BLACK}
          strokeWidth={3}
        />
      }
      inside={
        <>
          {/* Black and white striped sweater. */}
          <g>
            <path d={`M0,${t + 94} Q60,${t + 102} 120,${t + 94} V200 H0 Z`} fill='#ece8e2' />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect key={i} x={0} y={t + 104 + i * 12} width={120} height={6} fill='#3b3b3b' />
            ))}
          </g>
          {/* Black hair parted in the middle; her two red locks are drawn on top, outside the clip. */}
          <g fill={BLACK}>
            <path
              d={`M0,0 H120 V${t + 70} Q${r - 10},${t + 30} 62,${t + 14} H58 Q${l + 10},${t + 30} 0,${t + 70} Z`}
            />
            <path d={`M0,${t + 30} Q${l + 12},${t + 54} ${l + 10},${t + 134} H0 Z`} />
            <path d={`M120,${t + 30} Q${r - 12},${t + 54} ${r - 10},${t + 134} H120 Z`} />
          </g>
        </>
      }
      overHead={
        // Two red locks from the parting, falling in front on both sides of her face.
        <g fill={RED} strokeWidth={2.5}>
          {[(x: number) => x, (x: number) => 120 - x].map((side, i) => (
            <path
              key={i}
              d={`M${side(56)},${t + 12} Q${side(l + 8)},${t + 16} ${side(l - 2)},${t + 58} Q${side(l - 8)},${t + 94} ${side(l + 4)},${t + 126} Q${side(l + 22)},${t + 116} ${side(l + 22)},${t + 96} Q${side(l + 18)},${t + 62} ${side(l + 21)},${t + 38} Q${side(l + 30)},${t + 20} ${side(58)},${t + 17} Z`}
            />
          ))}
        </g>
      }
      front={
        // Her black bunny plush hugged against her chest, or her phone with a game on.
        <g transform={`translate(52 ${t + 96}) scale(1.5) translate(-52 ${-(t + 96)})`}>
          {phone ? <GamePhone x={52} y={t + 96} /> : <BunnyPlush x={52} y={t + 96} />}
        </g>
      }
      top={
        celebrate && (
          <g fill='#ffcf3f' strokeWidth={1.2}>
            {[
              [16, t + 8, 0],
              [104, t + 2, 0.15],
              [6, t + 50, 0.3],
              [114, t + 44, 0.45],
              [38, t - 8, 0.6],
              [86, t - 10, 0.75],
            ].map(([x, y, delay]) => (
              <polygon
                key={`${x}${y}`}
                className='float-star'
                style={{ animationDelay: `${delay}s` }}
                points={starPoints(x, y, 7, 3)}
              />
            ))}
          </g>
        )
      }
    />
  );
}
