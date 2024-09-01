import { resolve } from 'path';
import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: 'https://tassoevan.me',
    lang: 'pt-BR',
    title: 'Tasso & As Vozes',
    description:
      'Um lugar calmo e tranquilo onde dialogo com as vozes que habitam a minha cabeça',
    twitterHandle: '@tassoevan',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: resolve(`posts`),
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: resolve(`src/images`),
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-31191590-3',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
                title
                description
              }
            }
          }
        `,
        feeds: [
          {
            title: 'Tasso & As Vozes',
            serialize: ({
              query: { site, allMdx },
            }: {
              query: {
                site: {
                  siteMetadata: {
                    siteUrl: string;
                  };
                };
                allMdx: {
                  edges: {
                    node: {
                      frontmatter: { date: string };
                      excerpt: string;
                      fields: { slug: string };
                      body: string;
                    };
                  }[];
                };
              };
            }) => {
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.body }],
                });
              });
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                      }
                      excerpt
                      body
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Tasso & As Vozes',
        short_name: '@tassoevan',
        lang: 'pt-BR',
        start_url: '/',
        background_color: '#ececec',
        theme_color: '#ececec',
        display: 'minimal-ui',
        icon: resolve(`src/images/icon.svg`),
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-cname',
  ],
};

export default config;
