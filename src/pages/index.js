import React from 'react';

import SEO from '../components/SEO';
import GlobalStyle from '../components/GlobalStyle';
import Header from '../components/Header';
import PostList from '../components/PostList';

function IndexPage() {
  return (
    <>
      <SEO />
      <GlobalStyle />
      <Header />
      <PostList />
    </>
  );
}

export default IndexPage;
