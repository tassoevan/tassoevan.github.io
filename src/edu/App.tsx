import type { ReactNode } from 'react';
import ExternalLink from '../components/ExternalLink';
import type { ElementaryGrade, HighSchoolCompetency } from './bncc';
import {
  getCompetency,
  getGrade,
  getGradeLabel,
  HIGH_SCHOOL_COMPETENCY_LABELS,
  STAGE_LABELS,
} from './bncc';
import ContentCard from './components/ContentCard';
import type { Content, ElementaryContent, HighSchoolContent } from './contents';
import { CONTENTS } from './contents';

function groupBy<T, K extends string>(items: readonly T[], getKeys: (item: T) => K[]) {
  const groups = new Map<K, T[]>();
  for (const item of items) {
    for (const key of new Set(getKeys(item))) {
      groups.set(key, [...(groups.get(key) ?? []), item]);
    }
  }
  return [...groups].sort(([a], [b]) => a.localeCompare(b));
}

function newestFirst(a: Content, b: Content) {
  return b.publishedAt.localeCompare(a.publishedAt);
}

function Group({ title, contents }: Readonly<{ title: string; contents: readonly Content[] }>) {
  return (
    <section className='flex flex-col gap-3'>
      <h3 className='text-xl font-semibold'>{title}</h3>
      <div className='grid gap-3 sm:grid-cols-2'>
        {[...contents].sort(newestFirst).map((content) => (
          <ContentCard key={content.slug} content={content} />
        ))}
      </div>
    </section>
  );
}

function Stage({ title, children }: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <section className='flex flex-col gap-6'>
      <h2 className='text-primary border-b pb-1 text-2xl font-bold'>{title}</h2>
      {children}
    </section>
  );
}

function App() {
  const elementary = CONTENTS.filter((c): c is ElementaryContent => c.stage === 'EF');
  const highSchool = CONTENTS.filter((c): c is HighSchoolContent => c.stage === 'EM');

  // In elementary school, a content belongs to a single grade; in high school, it shows up under
  // every specific competency its skills address.
  const byGrade = groupBy<ElementaryContent, ElementaryGrade>(elementary, (c) => [
    getGrade(c.skills[0]),
  ]);
  const byCompetency = groupBy<HighSchoolContent, HighSchoolCompetency>(highSchool, (c) =>
    c.skills.map(getCompetency),
  );

  return (
    <div className='mx-auto flex min-h-screen max-w-4xl flex-col gap-12 p-6 sm:p-12'>
      <header className='flex flex-col gap-3'>
        <h1 className='text-primary text-4xl font-bold'>Ciências da Natureza</h1>
        <p>
          Materiais para o Ensino Fundamental e o Ensino Médio, organizados segundo a{' '}
          <ExternalLink href='https://basenacionalcomum.mec.gov.br/'>
            Base Nacional Comum Curricular (BNCC)
          </ExternalLink>
          .
        </p>
      </header>

      <main className='flex flex-col gap-12'>
        {CONTENTS.length === 0 && (
          <p className='text-muted'>Ainda não há conteúdos publicados. Volte em breve!</p>
        )}

        {byGrade.length > 0 && (
          <Stage title={STAGE_LABELS.EF}>
            {byGrade.map(([grade, contents]) => (
              <Group key={grade} title={getGradeLabel(grade)} contents={contents} />
            ))}
          </Stage>
        )}

        {byCompetency.length > 0 && (
          <Stage title={STAGE_LABELS.EM}>
            {byCompetency.map(([competency, contents]) => (
              <Group
                key={competency}
                title={HIGH_SCHOOL_COMPETENCY_LABELS[competency]}
                contents={contents}
              />
            ))}
          </Stage>
        )}
      </main>
    </div>
  );
}

export default App;
