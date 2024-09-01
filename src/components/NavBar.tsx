import React from 'react';
import styled from 'styled-components';
import Link from './Link';

const StyledNavBar = styled.nav`
  h1 {
    font-size: 1em;
    font-weight: normal;
    margin: 0;
  }
`;

interface NavBarProps {
  title: string;
  description: string;
}

function NavBar({ title, description }: NavBarProps) {
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
