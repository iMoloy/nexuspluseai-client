import type { Metadata } from 'next';
import './globals.css';
import 'font-awesome/css/font-awesome.min.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'NexusPulse AI | AI-Powered Gig, Rental & Escrow Super-App',
  description: 'Next-Gen Ecosystem for Micro-Task Gigs, Asset Rentals & Escrow Financial Payments',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.ico',
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
