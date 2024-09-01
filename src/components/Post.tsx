import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Link from './Link';

const StyledPost = styled.div`
  max-width: 38em;
  margin: 0 auto;
`;

const NextArticle = styled.footer`
  border-top: 1pt dashed currentColor;
  text-align: right;
  text-align: end;
`;

interface PostProps {
  title: string;
  date: Date;
  children?: ReactNode;
  timeToRead: number;
  slug: string;
  next?: {
    slug: string;
    title: string;
  };
}

function Post({ title, date, children, timeToRead, slug, next }: PostProps) {
  return (
    <StyledPost>
      <header>
        <h2>
          <Link href={slug}>{title}</Link>
        </h2>
        <div>
          <time dateTime={date.toISOString()}>
            {new Intl.DateTimeFormat('pt-BR', {
              dateStyle: 'long',
              timeStyle: 'short',
            }).format(date)}
          </time>{' '}
          &middot; {timeToRead} {timeToRead === 1 ? 'minuto' : 'minutos'}
        </div>
      </header>
      {children && <article>{children}</article>}
      {next && (
        <NextArticle>
          <Link href={next.slug}>{next.title}</Link>
        </NextArticle>
      )}
    </StyledPost>
  );
}

export default Post;
