module.exports = {
  siteMetadata: {
    title: 'Tasso & As Vozes',
    description:
      'Um lugar calmo e tranquilo onde dialogo com as vozes que habitam a minha cabeça',
    lang: 'pt-BR',
    author: '@tassoevan',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-31191590-3',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Tasso & As Vozes',
        description:
          'Um lugar calmo e tranquilo onde dialogo com as vozes que habitam a minha cabeça',
        short_name: 'Tasso & As Vozes',
        start_url: '/',
        background_color: '#91d2fa',
        theme_color: '#91d2fa',
        display: 'minimal-ui',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
