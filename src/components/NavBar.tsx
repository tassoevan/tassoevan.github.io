import React from 'react';
import styled from 'styled-components';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import Link from './Link';

const StyledNavBar = styled.nav`
  h1 {
    font-size: 1em;
    font-weight: normal;
    margin: 0;
  }
`;

function NavBar() {
  const { title, description } = useSiteMetadata();

  return (
    <StyledNavBar>
      <h1>
        <Link href='/' title={description}>
          {title}
        </Link>
      </h1>
    </StyledNavBar>
  );
}

export default NavBar;
