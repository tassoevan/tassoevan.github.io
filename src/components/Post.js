import { Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import styled from 'styled-components';

const StyledPost = styled.article`
  max-width: 38em;
  margin: 0 auto;
`;

const NextArticle = styled.div`
  text-align: right;
  text-align: end;
`;

function Post({ title, date, formattedDate, body, words, slug, next }) {
  return (
    <StyledPost>
      <h2>
        <Link to={slug}>{title}</Link>
      </h2>
      <p>
        <time dateTime={date}>{formattedDate}</time> &middot;{' '}
        {Math.round(words / 200)} minutos
      </p>
      {body && <MDXRenderer>{body}</MDXRenderer>}
      {next && (
        <NextArticle>
          <hr />
          <Link to={next.slug}>{next.title}</Link>
        </NextArticle>
      )}
    </StyledPost>
  );
}

export default Post;
