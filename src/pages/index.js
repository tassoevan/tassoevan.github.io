import React from 'react';
import 'normalize.css';

import Hero from '../components/Hero';
import SEO from '../components/SEO';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

const IndexPage = () => {
  const { title, description } = useSiteMetadata();

  return (
    <Hero>
      <SEO title='Home' />
      <h1>{title}</h1>
      <p>{description}</p>
    </Hero>
  );
};

export default IndexPage;
