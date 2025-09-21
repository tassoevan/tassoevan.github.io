import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Open_Sans } from 'next/font/google';

import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Tasso Evangelista',
    template: '%s · Tasso Evangelista',
  },
  description: 'Personal Website',
  creator: 'Tasso Evangelista',
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="overscroll-none">
      <body className={`${openSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
