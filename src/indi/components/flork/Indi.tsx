import type { Outfit } from './clothes';
import { Hoodie } from './clothes';
import type { Pose, Shape } from './Flork';
import Flork, { geometry } from './Flork';

const SHAPE: Shape = { width: 86, top: 12, eyeGap: 15, hugTo: 'right' };

type IndiProps = Pose &
  Readonly<{
    // Her bordô cardigan, or his pink hoodie when he lends it.
    outfit?: Outfit;
    // Eyebrows raised in the middle, when she pouts.
    sad?: boolean;
    // Eyebrows wiggling up and down, for her cheeky look.
    browWiggle?: boolean;
  }>;

export default function Indi({
  outfit = 'own',
  sad = false,
  browWiggle = false,
  ...pose
}: IndiProps) {
  const { l, r, t, eyeY, eyeXs } = geometry(SHAPE);

  return (
    <Flork
      shape={SHAPE}
      {...pose}
      behind={
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
      }
      inside={
        <>
          {outfit === 'hoodie' ? (
            <Hoodie t={t} />
          ) : (
            // Bordô cardigan over a black top.
            <g>
              <path d={`M0,${t + 94} Q60,${t + 102} 120,${t + 94} V200 H0 Z`} fill='#7a1f33' />
              <path d={`M48,${t + 98} L55,200 H65 L72,${t + 98} Z`} fill='#1b1b1b' />
            </g>
          )}
          {/* Hair pulled back, with comb lines toward the ponytail. */}
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
          {/* Freckles. */}
          <g fill='#b5785a'>
            {[-8, -2, 4].flatMap((dx, i) =>
              eyeXs.map((x) => (
                <circle key={`${x}${dx}`} cx={x + dx} cy={eyeY + (i === 1 ? 15 : 12)} r={1.2} />
              )),
            )}
          </g>
        </>
      }
      face={
        // Her strong, dark eyebrows; the inner ends rise when she is sad.
        <g stroke='#2a160f' strokeWidth={3.5} className={browWiggle ? 'brow-wiggle' : undefined}>
          {pose.eyes === 'cyclops' ? (
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
      }
    />
  );
}
