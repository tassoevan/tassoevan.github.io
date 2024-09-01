import { graphql } from 'gatsby';
import React, { ReactNode } from 'react';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import Post from '../components/Post';

export const query = graphql`
  query PostsBySlusg($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      excerpt
      timeToRead
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
      excerpt: string;
      timeToRead: number;
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

  const { excerpt, timeToRead } = data.mdx;

  return (
    <>
      <SEO title={title} description={excerpt} />
      <Layout>
        <NavBar />
        <Post
          slug={slug}
          title={title}
          date={new Date(Date.parse(date))}
          timeToRead={Math.ceil(timeToRead)}
          next={next}
        >
          {children}
        </Post>
      </Layout>
    </>
  );
}

export default PostTemplate;
