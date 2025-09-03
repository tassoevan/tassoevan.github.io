import type { Metadata } from 'next';
import { Open_Sans, Roboto_Mono } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tasso Evangelista - Personal Website',
  description: 'Personal Website of Tasso Evangelista',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${robotoMono.variable} ${openSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
