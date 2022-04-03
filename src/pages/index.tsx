import React from 'react';

import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Header from '../components/Header';
import PostList from '../components/PostList';

function IndexPage() {
  return (
    <>
      <SEO />
      <Layout>
        <Header />
        <PostList />
      </Layout>
    </>
  );
}

export default IndexPage;
