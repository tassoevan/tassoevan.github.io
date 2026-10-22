import { INK } from './ink';

// Objects drawn around a point (x, y), usually a hand.

export type Item = 'mug' | 'note' | 'acai' | 'plush' | 'flagGun';

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

// Cartoon toy gun that pops out a flag, for her "peteco! peteco!" joke.
function FlagGun({ x, y }: Readonly<{ x: number; y: number }>) {
  // Held items sit a little below the hand, so the grip is placed back up under her fingers.
  const hx = x;
  const hy = y - 4;

  return (
    <g strokeWidth={1.5}>
      <g className='flag-pop'>
        <path d={`M${hx + 14},${hy - 6.5} H${hx + 20}`} />
        <rect x={hx + 20} y={hy - 13} width={40} height={13} rx={1.5} fill='#fff' />
        {/* Squeezed to the flag's width, whatever the font. */}
        <text
          x={hx + 24}
          y={hy - 3.6}
          textLength={32}
          lengthAdjust='spacingAndGlyphs'
          fontSize={7.5}
          fontWeight={800}
          fill='#d62f3a'
          stroke='none'
        >
          PETECO!
        </text>
      </g>
      <rect x={hx - 3} y={hy - 9} width={15} height={5} rx={1} fill='#f2a541' />
      <rect x={hx + 11} y={hy - 9.5} width={3} height={6} rx={1} fill='#d62f3a' />
      <path
        d={`M${hx - 2},${hy - 4} H${hx + 2} L${hx + 1.5},${hy + 5} H${hx - 2.5} Z`}
        fill='#f2a541'
      />
      {/* Her hand closed around the grip. */}
      <ellipse cx={hx} cy={hy + 0.5} rx={4} ry={3.6} fill={INK} stroke='none' />
    </g>
  );
}

// An item in someone's hand, drawn larger than life so it reads well on small screens.
export function HeldItem({ item, x, y }: Readonly<{ item: Item; x: number; y: number }>) {
  return (
    <g transform={`translate(${x} ${y}) scale(1.6) translate(${-x} ${-y + 4})`}>
      {item === 'mug' && <Mug x={x} y={y} />}
      {item === 'note' && <Envelope x={x} y={y} />}
      {item === 'acai' && <Acai x={x} y={y} />}
      {item === 'plush' && <Plush x={x} y={y} />}
      {item === 'flagGun' && <FlagGun x={x} y={y} />}
    </g>
  );
}

// Goth-cute black bunny with a pink skull on its belly, in the spirit of the characters Jojo loves.
export function BunnyPlush({ x, y }: Readonly<{ x: number; y: number }>) {
  return (
    <g strokeWidth={1.8}>
      <ellipse
        cx={x - 3}
        cy={y + 2}
        rx={2.6}
        ry={6}
        fill='#1b1b1b'
        transform={`rotate(-12 ${x - 3} ${y + 2})`}
      />
      <ellipse
        cx={x + 3}
        cy={y + 2}
        rx={2.6}
        ry={6}
        fill='#1b1b1b'
        transform={`rotate(12 ${x + 3} ${y + 2})`}
      />
      <ellipse
        cx={x - 3}
        cy={y + 3}
        rx={1}
        ry={3.5}
        fill='#8e5bb5'
        stroke='none'
        transform={`rotate(-12 ${x - 3} ${y + 3})`}
      />
      <ellipse
        cx={x + 3}
        cy={y + 3}
        rx={1}
        ry={3.5}
        fill='#8e5bb5'
        stroke='none'
        transform={`rotate(12 ${x + 3} ${y + 3})`}
      />
      <ellipse cx={x} cy={y + 23} rx={6.5} ry={6.5} fill='#1b1b1b' />
      <circle cx={x} cy={y + 13} r={7} fill='#1b1b1b' />
      <circle cx={x - 2.6} cy={y + 12.5} r={1.2} fill='#fff' stroke='none' />
      <circle cx={x + 2.6} cy={y + 12.5} r={1.2} fill='#fff' stroke='none' />
      {/* Pink skull: cranium, jaw with teeth and hollow eyes. */}
      <g fill='#f4a7c8' stroke='none'>
        <circle cx={x} cy={y + 21.6} r={3.4} />
        <rect x={x - 2} y={y + 23.6} width={4} height={2.6} rx={0.6} />
      </g>
      <circle cx={x - 1.3} cy={y + 21.6} r={1} fill={INK} stroke='none' />
      <circle cx={x + 1.3} cy={y + 21.6} r={1} fill={INK} stroke='none' />
      <path
        d={`M${x - 0.7},${y + 24.2} v1.8 M${x + 0.7},${y + 24.2} v1.8`}
        stroke={INK}
        strokeWidth={0.5}
      />
    </g>
  );
}

// Points of a five-pointed star, for an SVG polygon.
export function starPoints(cx: number, cy: number, outer: number, inner: number) {
  return Array.from({ length: 10 }, (_, i) => {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? outer : inner;
    return `${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`;
  }).join(' ');
}

// A phone running a colorful arena game, for Jojo's favorite pastime. Generic on purpose: no
// real game's logo or characters.
export function GamePhone({ x, y }: Readonly<{ x: number; y: number }>) {
  const star = starPoints(x, y + 9, 3.2, 1.3);

  return (
    <g strokeWidth={1.5}>
      <rect x={x - 6.5} y={y - 1} width={13} height={22} rx={2.2} fill='#222' />
      <rect
        className='game-screen'
        x={x - 5}
        y={y + 1}
        width={10}
        height={16}
        rx={1}
        stroke='none'
      />
      <polygon className='game-star' points={star} fill='#ffcf3f' strokeWidth={0.6} />
      <circle cx={x - 2.8} cy={y + 14} r={1.2} fill='#ef4b5f' stroke='none' />
      <circle cx={x + 2.8} cy={y + 4} r={1.2} fill='#3fc6ef' stroke='none' />
      <path d={`M${x - 1.5},${y + 19} h3`} stroke='#666' strokeWidth={0.8} />
    </g>
  );
}
