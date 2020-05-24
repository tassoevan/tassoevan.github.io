import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

const StyledNavBar = styled.nav`
  h1 {
    font-size: 1em;
    font-weight: normal;
  }
`;

function NavBar() {
  const { title, description } = useSiteMetadata();

  return (
    <StyledNavBar>
      <h1>
        <Link to='/' title={description}>
          {title}
        </Link>
      </h1>
    </StyledNavBar>
  );
}

export default NavBar;
