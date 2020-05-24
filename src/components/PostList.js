import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const StyledPostList = styled.div`
  max-width: 38em;
  margin: 0 auto;
`;

function PostList() {
  const data = useStaticQuery(graphql`
    query {
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

  return data.allMdx.nodes.map(({ id, frontmatter, fields, excerpt }) => (
    <StyledPostList key={id}>
      <h2>
        <Link to={fields.slug}>{frontmatter.title}</Link>
      </h2>
      <p>{frontmatter.date}</p>
      <p>{excerpt}</p>
    </StyledPostList>
  ));
}

export default PostList;
