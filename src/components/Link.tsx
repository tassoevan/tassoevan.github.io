import { Link as GatsbyLink } from 'gatsby';

import React, { ReactNode } from 'react';

interface LinkProps {
  href: string;
  title?: string;
  children: ReactNode;
}

function Link({ href, title, children }: LinkProps) {
  return (
    <GatsbyLink to={href} title={title}>
      {children}
    </GatsbyLink>
  );
}

export default Link;
