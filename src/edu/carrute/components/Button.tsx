import { clsx } from 'clsx';
import type { ComponentProps } from 'react';

type ButtonProps = Readonly<ComponentProps<'button'> & { variant?: 'primary' | 'secondary' }>;

export default function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      type='button'
      {...props}
      className={clsx(
        'cursor-pointer rounded-lg px-4 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:outline-foreground focus-visible:outline-2 focus-visible:outline-offset-2',
        variant === 'primary' && 'bg-primary text-background px-6 py-3 text-lg',
        variant === 'secondary' &&
          'border-primary text-primary aria-pressed:bg-primary aria-pressed:text-background border-2',
        className,
      )}
    />
  );
}
