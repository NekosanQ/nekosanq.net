import './global.css';
import Navbar from '../components/Navbar';
import { ReactNode } from 'react';

export const metadata = {
  title: 'NekosanQ - Portfolio',
  description: 'NekosnQのポートフォリオサイトです。',
  keywords: ['NeksaanQ', 'Nekonnection', 'Portfolio'],
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
