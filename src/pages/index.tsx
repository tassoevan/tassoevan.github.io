import React from 'react';

import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Header from '../components/Header';
import PostList from '../components/PostList';
import { graphql, useStaticQuery } from 'gatsby';

function IndexPage() {
  const data = useStaticQuery<{
    allMdx: {
      nodes: {
        frontmatter: {
          title: string;
          date: string;
        };
        fields: {
          slug: string;
          timeToRead: {
            minutes: number;
          };
        };
        timeToRead: number;
      }[];
    };
  }>(graphql`
    {
      allMdx(
        filter: { frontmatter: { published: { eq: true } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          frontmatter {
            title
            date
          }
          fields {
            slug
            timeToRead {
              minutes
            }
          }
        }
      }
    }
  `);

  const posts = data.allMdx.nodes.map(
    ({ frontmatter: { title, date }, fields: { slug, timeToRead } }) => ({
      title,
      date: Date.parse(date),
      slug,
      timeToRead: Math.ceil(timeToRead.minutes),
    })
  );

  return (
    <>
      <SEO />
      <Layout>
        <Header />
        <PostList posts={posts} />
      </Layout>
    </>
  );
}

export default IndexPage;
