import { clsx } from 'clsx';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';

export type LinkProps = Readonly<ComponentProps<'a'>>;

export default forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    return (
      <a
        ref={ref}
        {...props}
        className={clsx(
          'text-secundary hover:underline hover:underline-offset-4',
          props.className,
        )}
      />
    );
  },
);
