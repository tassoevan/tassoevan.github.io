import ExternalLink from '@/components/external-link';

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px]">
        <h1 className="text-primary text-center text-4xl font-bold">
          Tasso Evangelista
        </h1>
        <p className="text-center">
          I&apos;m a frontend developer based in Brazil. I love building web
          applications and coding open source software.
        </p>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
        <ExternalLink href="https://github.com/tassoevan">GitHub</ExternalLink>
        <ExternalLink href="https://bsky.app/profile/tassoevan.me">
          Bluesky
        </ExternalLink>
        <ExternalLink href="https://mastodon.social/@tassoevan">
          Mastodon
        </ExternalLink>
        <ExternalLink href="https://www.linkedin.com/in/tassoevan">
          LinkedIn
        </ExternalLink>
        <ExternalLink href="mailto:tasso@tassoevan.me">Email</ExternalLink>
      </footer>
    </div>
  );
}
