import React from 'react';
import styled from 'styled-components';
import Post from './Post';

const StyledPostList = styled.div`
  max-width: 38em;
  margin: 0 auto;
`;

interface PostListProps {
  posts: {
    title: string;
    date: number;
    slug: string;
    timeToRead: number;
  }[];
}

function PostList({ posts }: PostListProps) {
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
