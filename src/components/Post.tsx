import { Link } from 'gatsby';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledPost = styled.div`
  max-width: 38em;
  margin: 0 auto;
`;

const NextArticle = styled.footer`
  border-top: 1pt dashed currentColor;
  text-align: right;
  text-align: end;
`;

function Post({
  title,
  date,
  formattedDate,
  children,
  timeToRead,
  slug,
  next,
}: {
  title: string;
  date: string;
  formattedDate: string;
  children?: ReactNode;
  timeToRead: number;
  slug: string;
  next?: {
    slug: string;
    title: string;
  };
}) {
  return (
    <StyledPost>
      <header>
        <h2>
          <Link to={slug}>{title}</Link>
        </h2>
        <div>
          <time dateTime={date}>{formattedDate}</time> &middot; {timeToRead}{' '}
          {timeToRead === 1 ? 'minuto' : 'minutos'}
        </div>
      </header>
      {children && <article>{children}</article>}
      {next && (
        <NextArticle>
          <Link to={next.slug}>{next.title}</Link>
        </NextArticle>
      )}
    </StyledPost>
  );
}

export default Post;
