import { useEffect, useState } from 'react';

// Chromium-only event, missing from the DOM typings.
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

// Offers to install the page as an app, but only where the browser supports it (Chrome and
// Edge on Android). Safari has no such API: there it is "Compartilhar > Adicionar à Tela de Início".
export default function InstallButton() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handlePrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as BeforeInstallPromptEvent);
    };
    const handleInstalled = () => setPrompt(null);

    window.addEventListener('beforeinstallprompt', handlePrompt);
    window.addEventListener('appinstalled', handleInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handlePrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  if (!prompt) return null;

  const install = async () => {
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') setPrompt(null);
  };

  return (
    <button
      type='button'
      onClick={() => void install()}
      className='border-primary text-primary bg-surface focus-visible:outline-foreground mx-auto flex cursor-pointer items-center gap-2 rounded-full border-2 px-4 py-2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2'
    >
      <span aria-hidden>📲</span>
      Colocar na tela inicial
    </button>
  );
}
