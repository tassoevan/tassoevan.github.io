import { INK } from './ink';

// `work` is Tasso's black hoodie from work, which he may lend her too.
export type Outfit = 'hoodie' | 'work' | 'own';

// The light pink hoodie she loves, which either of them may be wearing. Other colors make other
// hoodies with the same cut.
export function Hoodie({
  t,
  fill = '#f6cfd8',
  seams = '#c98a9a',
  drawstrings = true,
}: Readonly<{ t: number; fill?: string; seams?: string; drawstrings?: boolean }>) {
  const neckline = `M0,${t + 92} Q60,${t + 104} 120,${t + 92}`;
  return (
    <g stroke={seams} strokeWidth={2.5}>
      <path d={`${neckline} V200 H0 Z`} fill={fill} stroke='none' />
      <path d={`M14,${t + 90} Q60,${t + 118} 106,${t + 90}`} fill='none' />
      {drawstrings && <path d={`M54,${t + 106} v16 M66,${t + 106} v16`} fill='none' />}
      <path d={`M38,200 L42,${t + 128} Q60,${t + 122} 78,${t + 128} L82,200`} fill='none' />
      <path d={neckline} stroke={INK} strokeWidth={3} fill='none' />
    </g>
  );
}

// Black hoodie like the one from his job: a coral bar ending in checkered arrows across the chest.
// Only the bar is drawn, not the company's logo or name.
export function WorkHoodie({ t }: Readonly<{ t: number }>) {
  const y = t + 110;
  return (
    <g>
      <Hoodie t={t} fill='#1d1d1f' seams='#3d3d40' drawstrings={false} />
      <rect x={30} y={y} width={40} height={6} fill='#f5455c' />
      <path
        d={[71, 75.5, 80, 84.5].map((x) => `M${x},${y} l3.5,3 l-3.5,3`).join(' ')}
        fill='none'
        stroke='#f5455c'
        strokeWidth={1.6}
        strokeLinecap='butt'
      />
    </g>
  );
}
