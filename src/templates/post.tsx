import { graphql } from 'gatsby';
import React, { ReactNode } from 'react';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import Post from '../components/Post';
import { siteMetadata } from '../siteMetadata';

export const query = graphql`
  query PostsBySlusg($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      fields {
        timeToRead {
          minutes
        }
      }
      excerpt
    }
  }
`;

interface PostTemplateProps {
  pageContext: {
    frontmatter: { title: string; date: string };
    slug: string;
    next?: {
      slug: string;
      title: string;
    };
  };
  data: {
    mdx: {
      fields: {
        timeToRead: {
          minutes: number;
        };
      };
      excerpt: string;
    };
  };
  children: ReactNode;
}

function PostTemplate({ pageContext, data, children }: PostTemplateProps) {
  const {
    frontmatter: { title, date },
    slug,
    next,
  } = pageContext;

  return (
    <>
      <Layout title={title}>
        <NavBar
          title={siteMetadata.title}
          description={siteMetadata.description}
        />
        <Post
          slug={slug}
          title={title}
          date={Date.parse(date)}
          timeToRead={Math.ceil(data.mdx.fields.timeToRead.minutes)}
          next={next}
        >
          {children}
        </Post>
      </Layout>
    </>
  );
}

export default PostTemplate;

export const Head = ({ pageContext, data, children }: PostTemplateProps) => {
  const {
    frontmatter: { title },
  } = pageContext;

  const { excerpt } = data.mdx;

  return <SEO title={title} description={excerpt} />;
};
