import { Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';
import GlobalStyle from '../components/GlobalStyle';
import NavBar from '../components/NavBar';

const StyledPost = styled.article`
  max-width: 38em;
  margin: 0 auto;
`;

function PostTemplate({ data, pageContext }) {
  const {
    frontmatter: { title, date },
    body,
  } = data.mdx;
  const { slug } = pageContext;

  return (
    <>
      <SEO title={title} />
      <GlobalStyle />
      <NavBar />
      <StyledPost>
        <h2>
          <Link to={slug}>{title}</Link>
        </h2>
        <p>{date}</p>
        <MDXRenderer>{body}</MDXRenderer>
      </StyledPost>
    </>
  );
}

export default PostTemplate;

export const query = graphql`
  query PostsBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date
      }
    }
  }
`;
