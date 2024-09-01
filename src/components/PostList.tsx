import React from 'react';
import styled from 'styled-components';
import Post from './Post';
import { usePostList } from '../hooks/usePostList';

const StyledPostList = styled.div`
  max-width: 38em;
  margin: 0 auto;
`;

function PostList() {
  const posts = usePostList();

  return (
    <StyledPostList>
      {posts.map(({ title, date, slug, timeToRead }) => (
        <Post
          key={slug}
          slug={slug}
          title={title}
          date={date}
          timeToRead={timeToRead}
        />
      ))}
    </StyledPostList>
  );
}

export default PostList;
