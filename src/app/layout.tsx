import "./global.css";
import Navbar from "../components/Navbar";
import { ReactNode } from "react";
import type { Viewport } from "next";

export const metadata = {
  title: "NekosanQ - Portfolio",
  description: "NekosnQのポートフォリオサイトです。",
  keywords: ["NeksaanQ", "Nekonnection", "Portfolio"],
  openGraph: {
    title: "NekosanQ - Portfolio",
    description: "NekosnQのポートフォリオサイトです。",
    url: "https://www.nekosanq.net",
    siteName: "nekosanq.net",
    images: [
      {
        url: "https://www.nekosanq.net/NekosanQ.png",
        alt: "NekosanQ"
      }
    ],
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "NekosanQ - Portfolio",
    description: "NekosnQのポートフォリオサイトです。",
    images: ["https://www.nekosanq.net/NekosanQ.png"],
    creator: "@nekosanq_ts"
  }
};

export const viewport: Viewport = {
  themeColor: "#90ee90"
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
