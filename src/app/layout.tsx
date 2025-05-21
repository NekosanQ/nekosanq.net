import './global.css';
import Navbar from '../components/Navbar';
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ja">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
};
export default RootLayout;
