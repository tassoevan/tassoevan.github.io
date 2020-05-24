import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Post from './Post';

const StyledPostList = styled.div`
  max-width: 38em;
  margin: 0 auto;
`;

function PostList() {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        nodes {
          frontmatter {
            title
            date
            formattedDate: date(formatString: "LLL", locale: "pt-BR")
          }
          fields {
            slug
          }
          timeToRead
          body
        }
      }
    }
  `);

  return (
    <StyledPostList>
      {data.allMdx.nodes.map(
        ({
          frontmatter: { title, date, formattedDate },
          fields: { slug },
          timeToRead,
          body,
        }) => (
          <Post
            key={slug}
            slug={slug}
            title={title}
            date={date}
            formattedDate={formattedDate}
            timeToRead={timeToRead}
            body={body}
          />
        )
      )}
    </StyledPostList>
  );
}

export default PostList;
