import styled from "styled-components"

export const Container = styled.section`
  background-color: hsl(270deg, 25%, 50%);
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 3rem;
    font-weight: 100;
    line-height: 1.25;
    margin: 0;
    color: hsl(270deg, 25%, 90%);
    text-shadow: 0 0 0.5rem hsl(270deg, 25%, 25%);
  }

  p {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.25;
    margin: 0;
    color: hsl(270deg, 25%, 90%);
    text-shadow: 0 0 0.25rem hsl(270deg, 25%, 25%);
  }
`
