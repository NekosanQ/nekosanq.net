import './global.css';
import Navbar from '../components/Navbar';
import { ReactNode } from 'react';
import type { Viewport } from 'next';

export const metadata = {
  title: 'NekosanQ - Portfolio',
  description: 'NekosnQのポートフォリオサイトです。',
  keywords: ['NeksaanQ', 'Nekonnection', 'Portfolio']
};

export const viewport: Viewport = {
  themeColor: '#90ee90',
};
interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ja" data-bs-theme="dark">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
};
export default RootLayout;
