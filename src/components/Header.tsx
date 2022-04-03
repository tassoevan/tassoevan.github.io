import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

const StyledHeader = styled.section`
  text-align: center;
  max-width: 38em;
  margin: 0 auto;
`;

function Header() {
  const { title, description } = useSiteMetadata();

  return (
    <StyledHeader>
      <h1>
        <Link to='/'>{title}</Link>
      </h1>
      <p>{description}</p>
    </StyledHeader>
  );
}

export default Header;
