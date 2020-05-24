import React from 'react';
import 'normalize.css';
import 'sakura.css';

import { useSiteMetadata } from '../hooks/useSiteMetadata';
import { Link, useStaticQuery, graphql } from 'gatsby';
import SEO from '../components/SEO';

const IndexPage = () => {
  const { title, description } = useSiteMetadata();

  const data = useStaticQuery(graphql`
    query SITE_INDEX_QUERY {
      allMdx(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        nodes {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  return (
    <>
      <SEO />
      <header>
        <Link to='/'>
          <h1>{title}</h1>
        </Link>
        <p>{description}</p>
      </header>
      {data.allMdx.nodes.map(({ frontmatter, fields, excerpt }) => (
        <>
          <h2>
            <Link to={fields.slug}>{frontmatter.title}</Link>
          </h2>
          <p>{frontmatter.date}</p>
          <p>{excerpt}</p>
        </>
      ))}
    </>
  );
};

export default IndexPage;
