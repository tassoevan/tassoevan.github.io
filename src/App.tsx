import ProfileLink from './components/ProfileLink';

function App() {
  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20'>
      <main className='row-start-2 flex flex-col items-center gap-[32px]'>
        <h1 className='text-primary text-center text-4xl font-bold'>Tasso Evangelista</h1>
        <p className='max-w-prose text-center'>
          I&apos;m a frontend developer based in Brazil.
          <br />I love building web applications and coding open source software.
        </p>
      </main>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-[24px]'>
        <ProfileLink href='https://github.com/tassoevan'>GitHub</ProfileLink>
        <ProfileLink href='https://codeberg.org/tassoevan'>Codeberg</ProfileLink>
        <ProfileLink href='https://bsky.app/profile/tassoevan.me'>Bluesky</ProfileLink>
        <ProfileLink href='https://mastodon.social/@tassoevan'>Mastodon</ProfileLink>
        <ProfileLink href='https://www.linkedin.com/in/tassoevan'>LinkedIn</ProfileLink>
        <ProfileLink href='mailto:tasso@tassoevan.me'>Email</ProfileLink>
      </footer>
    </div>
  );
}

export default App;
