import { INK } from './ink';

// `cyclops` is one big eye in the middle, for when she leans in so close that's all he sees.
export type Eyes = 'open' | 'closed' | 'happy' | 'sly' | 'cyclops' | 'hearts' | 'roll';
export type Mouth = 'smile' | 'grin' | 'open' | 'flat' | 'pout' | 'smirk';

export function Eye({ x, y, eyes }: Readonly<{ x: number; y: number; eyes: Eyes }>) {
  if (eyes === 'closed') return <path d={`M${x - 7},${y - 1} Q${x},${y + 7} ${x + 7},${y - 1}`} />;
  if (eyes === 'happy') return <path d={`M${x - 7},${y + 3} Q${x},${y - 6} ${x + 7},${y + 3}`} />;
  // Eye-roll: whites showing, pupils up.
  if (eyes === 'roll') {
    return (
      <g>
        <circle cx={x} cy={y} r={6} fill='#fff' strokeWidth={2} />
        <circle cx={x} cy={y - 3} r={3} fill={INK} stroke='none' />
      </g>
    );
  }
  // Smitten.
  if (eyes === 'hearts') {
    return (
      <path
        className='heart-eye'
        d={`M${x},${y + 6} C${x - 10},${y - 1} ${x - 6},${y - 10} ${x},${y - 4} C${x + 6},${y - 10} ${x + 10},${y - 1} ${x},${y + 6} Z`}
        fill='#d0435b'
        stroke='none'
      />
    );
  }
  // Half-closed lids, for a knowing look.
  if (eyes === 'sly') {
    return (
      <g>
        <path d={`M${x - 5.5},${y} A5.5,5.5 0 0 0 ${x + 5.5},${y} Z`} fill={INK} stroke='none' />
        <path d={`M${x - 7},${y} H${x + 7}`} strokeWidth={3} />
      </g>
    );
  }
  return (
    <g stroke='none'>
      <circle cx={x} cy={y} r={5.5} fill={INK} />
      <circle cx={x + 1.6} cy={y - 1.8} r={1.7} fill='#fff' />
    </g>
  );
}

export function MouthShape({
  mouth,
  y,
  gap,
}: Readonly<{ mouth: Mouth; y: number; gap?: boolean }>) {
  switch (mouth) {
    case 'grin':
      return (
        <g>
          <path d={`M47,${y - 2} Q60,${y + 16} 73,${y - 2} Z`} fill={INK} />
          {/* Missing front teeth. */}
          {gap && (
            <g fill='#fff' stroke='none'>
              <rect x={50} y={y - 1} width={6} height={4} rx={1} />
              <rect x={64} y={y - 1} width={6} height={4} rx={1} />
            </g>
          )}
        </g>
      );
    case 'open':
      return <ellipse cx={60} cy={y + 4} rx={5} ry={6} fill={INK} />;
    case 'flat':
      return <path d={`M52,${y + 3} L68,${y + 3}`} />;
    // Lopsided, mischievous smile.
    case 'smirk':
      return <path d={`M49,${y + 2} Q62,${y + 9} 72,${y - 4}`} />;
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
