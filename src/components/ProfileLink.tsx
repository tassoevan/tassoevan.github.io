import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { ExternalLinkProps } from './ExternalLink';
import ExternalLink from './ExternalLink';

export type ProfileLinkProps = ExternalLinkProps;

export default forwardRef<HTMLAnchorElement, ProfileLinkProps>(function ProfileLink(props, ref) {
  return (
    <ExternalLink
      ref={ref}
      {...props}
      className={clsx(
        'focus-visible:outline-secundary rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4',
        props.className,
      )}
    />
  );
});
