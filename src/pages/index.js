import React from 'react';
import 'normalize.css';
import 'sakura.css';

import { useSiteMetadata } from '../hooks/useSiteMetadata';
import { Link } from 'gatsby';
import SEO from '../components/SEO';

const IndexPage = () => {
  const { title, description } = useSiteMetadata();

  return (
    <>
      <SEO />
      <header>
        <Link to='/'>
          <h1>{title}</h1>
        </Link>
        <p>{description}</p>
      </header>
    </>
  );
};

export default IndexPage;
