import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'MyGiftNurs Admin',
  description: 'MyGiftNurs E-commerce Admin Dashboard',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#E8315B" />
      </head>
      <body className={`${inter.className} ${playfair.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
