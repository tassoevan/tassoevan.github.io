import type { ReactNode } from 'react';
import ProfileLink from '../components/ProfileLink';
import {
  CERTIFICATIONS,
  CONTACTS,
  CONTRIBUTIONS,
  EDUCATION,
  EXPERIENCE,
  HEADLINE,
  LANGUAGES,
  LOCATION,
  NAME,
  PROJECTS,
  SKILLS,
  SUMMARY,
  TALKS,
} from './cv';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatMonth(value: string) {
  const [year, month] = value.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className='flex flex-col gap-4 break-inside-avoid-page'>
      <h2 className='text-primary border-primary/40 border-b pb-1 text-xl font-bold'>{title}</h2>
      {children}
    </section>
  );
}

function App() {
  return (
    <div className='mx-auto flex max-w-3xl flex-col gap-10 px-4 py-12 font-sans sm:px-8 print:max-w-none print:gap-6 print:py-0'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-primary text-4xl font-bold'>{NAME}</h1>
        <p className='text-lg'>
          {HEADLINE} · {LOCATION}
        </p>
        <ul className='flex flex-wrap gap-x-6 gap-y-2'>
          {CONTACTS.map(({ label, href }) => (
            <li key={href}>
              <ProfileLink href={href}>{label}</ProfileLink>
            </li>
          ))}
        </ul>
      </header>

      <main className='flex flex-col gap-10 print:gap-6'>
        <Section title='Summary'>
          <p className='max-w-prose'>{SUMMARY}</p>
        </Section>

        <Section title='Experience'>
          {EXPERIENCE.map(({ role, organization, location, start, end, highlights }) => (
            <article key={`${organization.label}-${start}`} className='flex flex-col gap-2'>
              <div className='flex flex-wrap items-baseline justify-between gap-x-4'>
                <h3 className='text-lg font-semibold'>
                  {role},{' '}
                  {organization.href ? (
                    <ProfileLink href={organization.href}>{organization.label}</ProfileLink>
                  ) : (
                    organization.label
                  )}
                </h3>
                <p>
                  <time dateTime={start}>{formatMonth(start)}</time> –{' '}
                  {end ? <time dateTime={end}>{formatMonth(end)}</time> : 'present'}
                  {' · '}
                  {location}
                </p>
              </div>
              {highlights.length > 0 && (
                <ul className='flex list-disc flex-col gap-1 pl-5'>
                  {highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </Section>

        <Section title='Skills'>
          <dl className='grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-[max-content_1fr]'>
            {SKILLS.map(({ area, items }) => (
              <div key={area} className='contents'>
                <dt className='font-semibold'>{area}</dt>
                <dd className='mb-2 sm:mb-0'>{items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title='Open source'>
          <ul className='flex flex-col gap-2'>
            {PROJECTS.map(({ name, href, description }) => (
              <li key={href}>
                <ProfileLink href={href} className='font-semibold'>
                  {name}
                </ProfileLink>
                : {description}
              </li>
            ))}
          </ul>
          <p>
            Also contributed to{' '}
            {CONTRIBUTIONS.map(({ label, href }, index) => (
              <span key={href}>
                <ProfileLink href={href}>{label}</ProfileLink>
                {index < CONTRIBUTIONS.length - 2 ? ', ' : ''}
                {index === CONTRIBUTIONS.length - 2 ? ' and ' : ''}
              </span>
            ))}
            .
          </p>
        </Section>

        <Section title='Education'>
          {EDUCATION.map(({ degree, institution, start, end, status }) => (
            <article key={`${institution.label}-${start}`} className='flex flex-col gap-1'>
              <div className='flex flex-wrap items-baseline justify-between gap-x-4'>
                <h3 className='text-lg font-semibold'>
                  {degree}, <ProfileLink href={institution.href}>{institution.label}</ProfileLink>
                </h3>
                <p>
                  <time dateTime={start}>{start}</time> –{' '}
                  {end ? <time dateTime={end}>{end}</time> : 'present'}
                </p>
              </div>
              <p>{status[0].toUpperCase() + status.slice(1)}.</p>
            </article>
          ))}
        </Section>

        <Section title='Certifications'>
          <ul className='flex list-disc flex-col gap-1 pl-5'>
            {CERTIFICATIONS.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        </Section>

        <Section title='Talks'>
          <ul className='flex list-disc flex-col gap-1 pl-5'>
            {TALKS.map(({ title, lang, href, event, date, coauthors }) => (
              <li key={href}>
                <ProfileLink href={href}>
                  <cite lang={lang}>{title}</cite>
                </ProfileLink>{' '}
                (slides in Portuguese). {event},{' '}
                <time dateTime={date}>
                  {new Date(`${date}T00:00`).toLocaleDateString('en-US', { dateStyle: 'long' })}
                </time>
                . With {coauthors.join(' and ')}.
              </li>
            ))}
          </ul>
        </Section>

        <Section title='Languages'>
          <ul className='flex list-disc flex-col gap-1 pl-5'>
            {LANGUAGES.map(({ language, level }) => (
              <li key={language}>
                {language}: {level}
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </div>
  );
}

export default App;
