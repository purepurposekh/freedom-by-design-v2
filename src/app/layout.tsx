import type { Metadata } from 'next';
import { Poppins, Public_Sans } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const publicSans = Public_Sans({
  variable: '--font-public-sans',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Freedom by Design | Tracy Harris',
  description:
    'What does your Human Design say about the business you were meant to build? Tracy Harris maps your design to a Freedom Filled strategy.',
  keywords: ['Human Design', 'business strategy', 'Tracy Harris', 'Freedom Filled', 'entrepreneur'],
  openGraph: {
    title: 'Freedom by Design | Tracy Harris',
    description: 'Discover the business strategy written in your Human Design chart.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${publicSans.variable} h-full`}>
      <head>
        {/* Showit-hosted brand fonts */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Editors Note Regular';
                src: url('https://static.showit.co/file/TvhrrI7NQuaBtkycz2Vf9Q/shared/editors_note-regular.woff') format('woff');
                font-display: swap;
              }
              @font-face {
                font-family: 'Editors Note Light Italic';
                src: url('https://static.showit.co/file/A4oH9ACtQ4OLBZLd7GAE3Q/shared/editor_snote-lightitalic.woff') format('woff');
                font-display: swap;
              }
              @font-face {
                font-family: 'Chic Societe Script';
                src: url('https://static.showit.co/file/Jmg9m0ObRte7TbO4pWwW-A/shared/chicsocietescript.woff') format('woff');
                font-display: swap;
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full antialiased">
        {children}
      </body>
    </html>
  );
}
