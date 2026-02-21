import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CouponGenie.in - Deals, Coupons & Offers',
  description: 'Find the best loot deals, discounts, and promo codes for Amazon, Flipkart, Myntra, and 300+ stores.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://coupongenie.in/',
    siteName: 'CouponGenie',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'CouponGenie Deals' }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@CouponGenieIn'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-50">
      <body className={`${inter.className} text-slate-800 antialiased min-h-screen flex flex-col`}>
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
