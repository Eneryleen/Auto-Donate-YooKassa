import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import siteConfig from '@/config/site.config';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: siteConfig.seo.title.replace('{server_name}', siteConfig.server.name),
  description: siteConfig.seo.description.replace('{server_name}', siteConfig.server.name),
  keywords: siteConfig.seo.keywords,
  openGraph: {
    title: siteConfig.seo.title.replace('{server_name}', siteConfig.server.name),
    description: siteConfig.seo.description.replace('{server_name}', siteConfig.server.name),
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
