import React, { useState } from 'react';
import styled, {
  createGlobalStyle,
  ThemeProvider,
  css,
} from 'styled-components';
import 'normalize.css';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import { useMediaQuery } from '../hooks/useMediaQuery';

const wordWrapMixin = css`
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-word;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
`;

const foregroundColor = (props) =>
  props.theme.isDark ? '#ececec' : 'hsl(0deg, 0%, 30%)';

const backgroundColor = (props) =>
  props.theme.isDark ? 'hsl(0deg, 0%, 30%)' : '#ececec';

const alternativeBackgroundColor = (props) =>
  props.theme.isDark ? 'hsla(0deg, 0%, 70%, 10%)' : 'hsla(0deg, 0%, 30%, 10%)';

const primaryColor = 'rgb(46, 170, 190)';
const accentColor = 'rgba(46, 170, 190, 90%)';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 100%;
    font-family: Baskerville, 'Baskerville Old Face', 'Goudy Old Style', Garamond, 'Times New Roman', serif;
    scroll-behavior: smooth;
  }

  body {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
    color: ${foregroundColor};
    background-color: ${backgroundColor};
    padding: 1rem;
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.1;
    font-family: inherit;
    font-weight: 700;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    ${wordWrapMixin}
  }

  h1 { font-size: 2.35em }
  h2 { font-size: 2.00em }
  h3 { font-size: 1.75em }
  h4 { font-size: 1.5em }
  h5 { font-size: 1.25em }
  h6 { font-size: 1em }

  p {
    margin-top: 0px;
    margin-bottom: 2.5rem;
  }

  small, sub, sup {
    font-size: 75%;
  }

  hr {
    border-color: ${primaryColor};
  }

  a {
    text-decoration: none;
    color: ${primaryColor};

    &:hover {
      color: ${accentColor};
      border-bottom: 1px dashed ${foregroundColor};
    }
  }

  ul {
    padding-left: 1.4em;
    margin-top: 0px;
    margin-bottom: 2.5rem;
  }

  li {
    margin-bottom: 0.4em;
  }

  blockquote {
    font-style: italic;
    margin-left: 1.5em;
    padding-left: 1em;
    border-left: 3px solid ${primaryColor};
  }

  img {
    height: auto;
    max-width: 100%;
    margin-top: 0px;
    margin-bottom: 2.5rem;
  }

  pre {
    background-color: ${alternativeBackgroundColor};
    display: block;
    padding: 1em;
    overflow-x: auto;
    margin-top: 0px;
    margin-bottom: 2.5rem;
  }

  code {
    font-size: 0.9em;
    padding: 0 0.5em;
    background-color: ${alternativeBackgroundColor};
    white-space: pre-wrap;
  }

  pre > code {
    padding: 0;
    background-color: transparent;
    white-space: pre;
  }

  table {
    text-align: justify;
    width: 100%;
    border-collapse: collapse;
  }

  td, th {
    padding: 0.5em;
    border-bottom: 1px solid ${alternativeBackgroundColor};
  }

  input, textarea {
    border: 1px solid ${foregroundColor};

    &:focus {
      border: 1px solid ${primaryColor};
    }
  }

  textarea {
    width: 100%;
  }

  .button, button, input[type="submit"], input[type="reset"], input[type="button"] {
    display: inline-block;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;

    background-color: ${primaryColor};
    color: ${backgroundColor};
    border-radius: 1px;
    border: 1px solid ${primaryColor};
    cursor: pointer;
    box-sizing: border-box;

    &[disabled] {
      cursor: default;
      opacity: .5;
    }

    &:focus, &:hover {
      background-color: ${accentColor};
      border-color: ${accentColor};
      color: ${backgroundColor};
      outline: 0;
    }
  }

  textarea, select, input[type] {
    color: ${foregroundColor};
    padding: 6px 10px;
    margin-bottom: 10px;
    background-color: ${alternativeBackgroundColor};
    border: 1px solid ${alternativeBackgroundColor};
    border-radius: 4px;
    box-shadow: none;
    box-sizing: border-box;

    &:focus {
      border: 1px solid ${primaryColor};
      outline: 0;
    }
  }

  input[type="checkbox"]:focus {
    outline: 1px dotted ${primaryColor};
  }

  label, legend, fieldset {
    display: block;
    margin-bottom: .5rem;
    font-weight: 600;
  }
`;

const BodyTitle = styled.h1`
  display: none;
`;

function Layout({ children }) {
  const { title } = useSiteMetadata();
  const preferDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDark] = useState();

  return (
    <ThemeProvider theme={{ isDark: isDark ?? preferDark }}>
      <GlobalStyle />
      <BodyTitle>{title}</BodyTitle>
      {children}
    </ThemeProvider>
  );
}

export default Layout;
