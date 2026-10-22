import type { Outfit } from './clothes';
import { Hoodie, WorkHoodie } from './clothes';
import type { Pose, Shape } from './Flork';
import Flork, { geometry } from './Flork';

const SHAPE: Shape = { width: 100, top: 6, eyeGap: 18, hugTo: 'left' };

type TassoProps = Pose &
  Readonly<{
    // The pink hoodie or his black work hoodie; a grey T-shirt when he lent it to Indi.
    outfit?: Outfit;
    // A flash on his glasses, when she catches him off guard.
    glassesShine?: boolean;
  }>;

export default function Tasso({ outfit = 'own', glassesShine = false, ...pose }: TassoProps) {
  const { l, r, t, eyeY, eyeXs } = geometry(SHAPE);

  return (
    <Flork
      shape={SHAPE}
      restingBlush={0}
      {...pose}
      inside={
        <>
          {outfit === 'hoodie' ? (
            <Hoodie t={t} />
          ) : outfit === 'work' ? (
            <WorkHoodie t={t} />
          ) : (
            // Grey T-shirt with its zigzag print.
            <g>
              <path d={`M0,${t + 92} Q60,${t + 104} 120,${t + 92} V200 H0 Z`} fill='#4b5058' />
              <path
                d={`M44,${t + 124} l8,9 l8,-9 l8,9 l8,-9`}
                fill='none'
                stroke='#25282d'
                strokeWidth={3}
              />
            </g>
          )}
          <g fill='#2b1d16'>
            {/* Short hair combed back. */}
            <path
              d={`M0,0 H120 V${t + 22} Q92,${t + 8} 60,${t + 12} Q30,${t + 14} 0,${t + 28} Z`}
            />
            {/* Full beard around the mouth, with a moustache. */}
            <path
              d={`M0,${t + 46} Q${l + 12},${t + 50} ${l + 16},${t + 58} Q36,${t + 76} 60,${t + 76} Q84,${t + 76} ${r - 16},${t + 58} Q${r - 12},${t + 50} 120,${t + 46} V${t + 76} Q60,${t + 100} 0,${t + 76} Z`}
            />
            <path d={`M45,${t + 60} Q60,${t + 52} 75,${t + 60} Q60,${t + 57} 45,${t + 60} Z`} />
          </g>
        </>
      }
      face={
        // His black rectangular glasses.
        <g strokeWidth={3}>
          <rect x={eyeXs[0] - 14} y={eyeY - 10} width={28} height={19} rx={4} />
          <rect x={eyeXs[1] - 14} y={eyeY - 10} width={28} height={19} rx={4} />
          <path d={`M${eyeXs[0] + 14},${eyeY - 3} Q60,${eyeY - 7} ${eyeXs[1] - 14},${eyeY - 3}`} />
          {glassesShine && (
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
      }
    />
  );
}
