import { INK } from './ink';

export type Outfit = 'hoodie' | 'own';

// The light pink hoodie she loves, which either of them may be wearing.
export function Hoodie({ t }: Readonly<{ t: number }>) {
  const neckline = `M0,${t + 92} Q60,${t + 104} 120,${t + 92}`;
  return (
    <g stroke='#c98a9a' strokeWidth={2.5}>
      <path d={`${neckline} V200 H0 Z`} fill='#f6cfd8' stroke='none' />
      <path d={`M14,${t + 90} Q60,${t + 118} 106,${t + 90}`} fill='none' />
      <path d={`M54,${t + 106} v16 M66,${t + 106} v16`} fill='none' />
      <path d={`M38,200 L42,${t + 128} Q60,${t + 122} 78,${t + 128} L82,200`} fill='none' />
      <path d={neckline} stroke={INK} strokeWidth={3} fill='none' />
    </g>
  );
}
