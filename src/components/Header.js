import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

const StyledHeader = styled.header`
  text-align: center;
  max-width: 38em;
  margin: 0 auto;
`;

function Header() {
  const { title, description } = useSiteMetadata();

  return (
    <StyledHeader>
      <Link to='/'>
        <h1>{title}</h1>
      </Link>
      <p>{description}</p>
    </StyledHeader>
  );
}

export default Header;
