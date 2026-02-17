import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vorgawall Chat',
  description: 'A modern AI chat interface by Vorgawall',
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