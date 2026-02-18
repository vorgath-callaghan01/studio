import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Basic Chatbot by Vorgawall Shop',
    template: '%s | Basic Chatbot by Vorgawall Shop',
  },
  description: 'Experience the next generation of AI interaction with Basic Chatbot by Vorgawall Shop. Secure, fast, and private chat interface with local storage support.',
  keywords: ['Chatbot', 'AI', 'Vorgawall Shop', 'Next.js Chatbot', 'Private AI', 'Modern UI'],
  authors: [{ name: 'Vorgawall Shop', url: 'https://vorgawall.shop' }],
  creator: 'Vorgawall Shop',
  publisher: 'Vorgawall Shop',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Basic Chatbot by Vorgawall Shop',
    description: 'A professional-grade AI chat interface with local persistence and modern design.',
    url: 'https://basic-chatbot.vorgawall.shop',
    siteName: 'Basic Chatbot',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Basic Chatbot by Vorgawall Shop',
    description: 'A professional-grade AI chat interface with local persistence and modern design.',
    creator: '@vorgawall',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-[#F0F0F0] text-[#0a0a0a]">
        {children}
      </body>
    </html>
  );
}
