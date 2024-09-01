import React from 'react';
import styled from 'styled-components';
import Link from './Link';

const StyledHeader = styled.section`
  text-align: center;
  max-width: 38em;
  margin: 0 auto;
`;

interface HeaderProps {
  title: string;
  description: string;
}

function Header({ title, description }: HeaderProps) {
  return (
    <StyledHeader>
      <h1>
        <Link href='/'>{title}</Link>
      </h1>
      <p>{description}</p>
    </StyledHeader>
  );
}

export default Header;
