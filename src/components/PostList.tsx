import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Post from './Post';

const StyledPostList = styled.div`
  max-width: 38em;
  margin: 0 auto;
`;

function PostList() {
  const data = useStaticQuery<{
    allMdx: {
      nodes: {
        frontmatter: {
          title: string;
          date: string;
          formattedDate: string;
        };
        fields: {
          slug: string;
        };
        body: string;
        timeToRead: number;
      }[];
    };
  }>(graphql`
    {
      allMdx(
        sort: { frontmatter: { date: DESC } }
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
        }) => (
          <Post
            key={slug}
            slug={slug}
            title={title}
            date={date}
            formattedDate={formattedDate}
            timeToRead={timeToRead}
          />
        )
      )}
    </StyledPostList>
  );
}

export default PostList;
