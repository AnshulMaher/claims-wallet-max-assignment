import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import '../styles/globals.css';
import { I18nProvider } from '@/shared/components/I18nProvider';
import { Header } from '@/features/navigation/components/Header';
import { Footer } from '@/features/navigation/components/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Claims Wallet Max - Juice Financial',
  description:
    'Access your funds instantly and choose how you want to receive your payment. Enhanced features with maximum flexibility.',
  keywords: ['claims', 'wallet', 'payments', 'insurance', 'juice financial'],
  authors: [{ name: 'Juice Financial' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Claims Wallet Max - Juice Financial',
    description:
      'Access your funds instantly and choose how you want to receive your payment.',
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <I18nProvider>
          <Header />
          <div className="py-16">{children}</div>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
