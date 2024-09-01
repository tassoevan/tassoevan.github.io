import { graphql } from 'gatsby';
import React, { ReactNode } from 'react';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import Post from '../components/Post';

function PostTemplate({
  data,
  pageContext,
  children,
}: {
  data: any;
  pageContext: any;
  children: ReactNode;
}) {
  const {
    frontmatter: { title, date, formattedDate },
    excerpt,
    timeToRead,
  } = data.mdx;
  const { slug, next } = pageContext;

  return (
    <>
      <SEO title={title} description={excerpt} />
      <Layout>
        <NavBar />
        <Post
          slug={slug}
          title={title}
          date={date}
          formattedDate={formattedDate}
          timeToRead={timeToRead}
          next={next}
        >
          {children}
        </Post>
      </Layout>
    </>
  );
}

export default PostTemplate;

export const query = graphql`
  query PostsBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        formattedDate: date(formatString: "LLL", locale: "pt-BR")
      }
      excerpt
      timeToRead
    }
  }
`;
