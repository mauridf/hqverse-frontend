import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { QueryProvider } from '@/lib/providers/QueryProvider';
import { ToastProvider } from '@/components/shared/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'HQVerse - A maior comunidade de HQs digitalizadas',
    template: '%s | HQVerse',
  },
  description: 'Catálogo completo, reviews, coleções e comunidade para fãs de HQs.',
  keywords: ['HQs', 'quadrinhos', 'comunidade', 'coleções', 'reviews', 'scans'],
  authors: [{ name: 'HQVerse Team' }],
  openGraph: {
    title: 'HQVerse - A maior comunidade de HQs digitalizadas',
    description: 'Catálogo completo, reviews, coleções e comunidade para fãs de HQs.',
    url: 'https://hqverse.com',
    siteName: 'HQVerse',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HQVerse - A maior comunidade de HQs digitalizadas',
    description: 'Catálogo completo, reviews, coleções e comunidade para fãs de HQs.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <QueryProvider>
            <ToastProvider />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}