import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import 'normalize.css';

import Hero from '../components/Hero';
import SEO from '../components/SEO';

const IndexPage = () => {
  const {
    site: {
      siteMetadata: { title, description },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  return (
    <Hero>
      <SEO title='Home' />
      <h1>{title}</h1>
      <p>{description}</p>
    </Hero>
  );
};

export default IndexPage;
