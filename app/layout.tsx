import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './Home/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hariom Studio Bilaspur - Professional Photography in Himachal Pradesh',
  description: 'Professional photography services in Bilaspur, Himachal Pradesh. Specializing in wedding, portrait, and event photography with 10+ years of experience.',
  keywords: 'photography, Himachal Pradesh, Bilaspur, wedding photography, portrait photography, professional photographer',
  metadataBase: new URL('https://www.hariomstudiobilaspur.in'),
  alternates: {
    canonical: 'https://www.hariomstudiobilaspur.in'
  },
  openGraph: {
    title: 'Hariom Studio Bilaspur - Professional Photography',
    description: 'Professional photography services in Bilaspur, Himachal Pradesh',
    url: 'https://www.hariomstudiobilaspur.in',
    siteName: 'Hariom Studio',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'your-google-verification-code',  // Add your verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} dark`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}