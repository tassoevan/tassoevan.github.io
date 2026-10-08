import ExternalLink from '../../components/ExternalLink';
import { THEMATIC_UNIT_LABELS } from '../bncc';
import type { Content } from '../contents';
import { CONTENT_TYPE_LABELS } from '../contents';

type ContentCardProps = Readonly<{ content: Content }>;

const dateFormat = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' });

export default function ContentCard({ content }: ContentCardProps) {
  return (
    <article className='bg-surface flex flex-col gap-2 rounded-lg p-4'>
      <p className='text-accent text-xs font-semibold tracking-wide uppercase'>
        {CONTENT_TYPE_LABELS[content.type]}
        {content.stage === 'EF' && <> · {THEMATIC_UNIT_LABELS[content.thematicUnit]}</>}
      </p>
      <h4 className='text-lg font-semibold'>
        <ExternalLink href={content.url}>{content.title}</ExternalLink>
      </h4>
      <p>{content.summary}</p>
      <footer className='text-muted flex flex-wrap items-center gap-x-3 gap-y-1 text-sm'>
        <ul className='flex flex-wrap gap-1' aria-label='Habilidades da BNCC'>
          {content.skills.map((skill) => (
            <li key={skill} className='rounded border px-1.5 font-mono text-xs'>
              {skill}
            </li>
          ))}
        </ul>
        <time dateTime={content.publishedAt}>
          {dateFormat.format(new Date(content.publishedAt))}
        </time>
      </footer>
    </article>
  );
}
