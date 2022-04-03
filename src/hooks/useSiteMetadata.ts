import { useStaticQuery, graphql } from 'gatsby';

export const useSiteMetadata = () => {
  const data = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
            description
            lang
            twitterHandle
          }
        }
      }
    `
  );

  return data.site.siteMetadata;
};
