import type { KeyboardEvent, ReactNode } from 'react';
import type { Character, Kid } from './Flork';

const HEART = 'M0,4 C-8,-4 -6,-12 0,-7 C6,-12 8,-4 0,4 Z';

function Hearts({ x, y }: Readonly<{ x: number; y: number }>) {
  return (
    <g fill='#d0435b'>
      {[-26, -8, 10, 28].map((dx, i) => (
        <g key={dx} transform={`translate(${x + dx} ${y - (i % 2) * 14}) scale(1.4)`}>
          <path className='float-heart' style={{ animationDelay: `${i * 0.25}s` }} d={HEART} />
        </g>
      ))}
    </g>
  );
}

function Frame({ x }: Readonly<{ x: number }>) {
  return (
    <g>
      <rect
        x={x}
        y={14}
        width={74}
        height={62}
        className='fill-frame stroke-frame-edge'
        strokeWidth={4}
      />
      <path
        d={`M${x + 6},${50} q16,-18 30,-4 t32,-10 M${x + 6},${64} q18,-14 32,-2 t30,-8`}
        className='stroke-frame-edge'
        strokeWidth={1.5}
        fill='none'
        opacity={0.4}
      />
    </g>
  );
}

// The girls stand beside the sofa: the older two on Indi's side, Lolô next to her favorite person.
const GUEST_SLOTS: Record<Kid, { transform: string; side: 'left' | 'right'; label: string }> = {
  jojo: { transform: 'translate(2 148) scale(0.76)', side: 'left', label: 'Jojo' },
  nana: { transform: 'translate(4 166) scale(0.66)', side: 'left', label: 'Nana' },
  lolo: { transform: 'translate(322 182) scale(0.58)', side: 'right', label: 'Lolô' },
};

type SceneProps = Readonly<{
  indi: ReactNode;
  tasso: ReactNode;
  guests: readonly Readonly<{ character: Kid; node: ReactNode }>[];
  // Character currently inviting a tap, outlined by a pulsing ring.
  hint?: 'tasso' | 'indi';
  lean: boolean;
  hearts: boolean;
  blanket: boolean;
  breathing: boolean;
  onBoop: (character: Character) => void;
}>;

export default function Scene({
  indi,
  tasso,
  guests,
  hint,
  lean,
  hearts,
  blanket,
  breathing,
  onBoop,
}: SceneProps) {
  const characterProps = (character: Character, label: string) => ({
    role: 'button',
    tabIndex: 0,
    'aria-label': label,
    className: 'flork-target cursor-pointer',
    onClick: () => onBoop(character),
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      onBoop(character);
    },
  });

  return (
    <svg
      viewBox='0 0 400 300'
      role='group'
      aria-label='A família no sofá'
      className='block h-auto w-full'
    >
      <rect width={400} height={300} className='fill-wall' />
      <Frame x={74} />
      <Frame x={163} />
      <Frame x={252} />
      <rect y={262} width={400} height={38} className='fill-floor' />

      <g stroke='#111' strokeWidth={3.5} strokeLinejoin='round'>
        <rect x={42} y={128} width={316} height={104} rx={24} fill='#6e1b2e' />
        <rect x={60} y={204} width={280} height={42} rx={12} fill='#7d2236' />
        <rect x={26} y={168} width={50} height={92} rx={18} fill='#7d2236' />
        <rect x={324} y={168} width={50} height={92} rx={18} fill='#7d2236' />
      </g>

      {blanket && <rect width={400} height={300} className='scene-dim' />}
      {breathing && <circle cx={200} cy={180} r={90} className='breath-guide' />}
      {hint && (
        <ellipse
          className='tap-hint'
          cx={hint === 'indi' ? 152 : 250}
          cy={196}
          rx={hint === 'indi' ? 58 : 62}
          ry={98}
        />
      )}

      <g transform='translate(92 108)'>
        <g className={lean ? 'flork-lean lean-right' : 'flork-lean'}>
          <g {...characterProps('indi', 'Indi')}>{indi}</g>
        </g>
      </g>
      <g transform='translate(190 108)'>
        <g className={lean ? 'flork-lean lean-left' : 'flork-lean'}>
          <g {...characterProps('tasso', 'Mor')}>{tasso}</g>
        </g>
      </g>

      {guests.map(({ character, node }) => {
        const { transform, side, label } = GUEST_SLOTS[character];
        return (
          <g key={character} transform={transform}>
            <g className={`guest-enter-${side}`}>
              <g {...characterProps(character, label)}>{node}</g>
            </g>
          </g>
        );
      })}

      {blanket && (
        <g className='blanket'>
          <path
            d='M64,232 Q200,212 336,232 L342,264 Q200,280 58,264 Z'
            fill='#ead9c5'
            stroke='#111'
            strokeWidth={3.5}
            strokeLinejoin='round'
          />
          <path
            d='M110,226 L106,272 M160,221 L158,275 M210,220 L210,276 M260,222 L262,275 M310,227 L314,270'
            stroke='#c56b7d'
            strokeWidth={5}
            opacity={0.7}
          />
          <g className='fill-foreground text-[18px] font-bold'>
            {['z', 'z', 'Z'].map((z, i) => (
              <text
                key={i}
                x={300 + i * 14}
                y={110 - i * 16}
                className='float-zzz'
                style={{ animationDelay: `${i * 0.7}s` }}
              >
                {z}
              </text>
            ))}
          </g>
        </g>
      )}

      {hearts && <Hearts x={198} y={104} />}
    </svg>
  );
}
