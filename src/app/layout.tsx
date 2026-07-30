import "./global.css";
import Navbar from "../components/Navbar";
import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://nekosanq.net"),
  title: "NekosanQ - Portfolio",
  description: "NekosanQのポートフォリオサイトです。",
  keywords: ["NekosanQ", "Nekonnection", "Portfolio"],
  openGraph: {
    title: "NekosanQ - Portfolio",
    description: "NekosanQのポートフォリオサイトです。",
    url: "https://www.nekosanq.net",
    siteName: "nekosanq.net",
    images: [
      {
        url: "/NekosanQ.png",
        alt: "NekosanQ"
      }
    ],
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "NekosanQ - Portfolio",
    description: "NekosanQのポートフォリオサイトです。",
    images: ["/NekosanQ.png"],
    creator: "@nekosanq_ts"
  }
};

export const viewport: Viewport = {
  themeColor: "#000000"
};

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
