import React from 'react';
import 'normalize.css';
import 'sakura.css';

import { useSiteMetadata } from '../hooks/useSiteMetadata';

const IndexPage = () => {
  const { title, description } = useSiteMetadata();

  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
};

export default IndexPage;
