const siteMetadata = {
  siteUrl: 'https://tassoevan.me',
  lang: 'pt-BR',
  title: 'Tasso & As Vozes',
  description:
    'Um lugar calmo e tranquilo onde dialogo com as vozes que habitam a minha cabeça',
  twitterHandle: '@tassoevan',
} as const;

export const useSiteMetadata = () => {
  return siteMetadata;
};
