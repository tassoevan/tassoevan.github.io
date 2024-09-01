import { graphql, useStaticQuery } from 'gatsby';

export const usePostList = () => {
  const data = useStaticQuery<{
    allMdx: {
      nodes: {
        frontmatter: {
          title: string;
          date: string;
        };
        fields: {
          slug: string;
        };
        timeToRead: number;
      }[];
    };
  }>(graphql`
    {
      allMdx(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        nodes {
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
          timeToRead
        }
      }
    }
  `);

  return data.allMdx.nodes.map(
    ({ frontmatter: { title, date }, fields: { slug }, timeToRead }) => ({
      title,
      date: new Date(Date.parse(date)),
      slug,
      timeToRead: Math.ceil(timeToRead),
    })
  );
};
