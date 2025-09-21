import { forwardRef } from 'react';
import type { LinkProps } from './link';
import Link from './link';

export type ExternalLinkProps = LinkProps;

export default forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  function ExternalLink(props, ref) {
    return (
      <Link ref={ref} target="_blank" rel="noopener noreferrer" {...props} />
    );
  },
);
