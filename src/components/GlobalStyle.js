import { createGlobalStyle } from 'styled-components';
import 'normalize.css';
import 'sakura.css';

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

export default GlobalStyle;
