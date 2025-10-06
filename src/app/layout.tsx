import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Colinha de Harmonia Musical'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-KVMC4R69" />
      <GoogleAnalytics gaId={'G-NS28JRP075'} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  font-sans`}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
