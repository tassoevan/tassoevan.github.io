import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import 'normalize.css';
import 'sakura.css';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

const GlobalStyle = createGlobalStyle`
  body {
    /* font-family: Baskerville, "Baskerville Old Face", "Goudy Old Style", Garamond, "Times New Roman", serif; */
    font-family: "Lucida Sans Typewriter", "Lucida Console", Monaco, "Bitstream Vera Sans Mono", monospace;
    max-width: unset;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: inherit;
    font-weight: 500;
  }
`;

const BodyTitle = styled.h1`
  display: none;
`;

function Layout({ children }) {
  const { title } = useSiteMetadata();

  return (
    <>
      <GlobalStyle />
      <BodyTitle>{title}</BodyTitle>
      {children}
    </>
  );
}

export default Layout;
