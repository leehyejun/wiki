import type { Metadata } from "next";
import "./globals.css";
import SiteTabs from "@/components/site-tabs";

export const metadata: Metadata = {
  title: "스시로 서버 Wiki",
  description: "스시로 서버의 바다 탐험, 낚시, 초밥 요리와 방송인 안내",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

import {getText} from "@/lib/wiki-content";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const label = await getText();
  return (
    <html lang="ko">
      <body className="antialiased"><SiteTabs name={label("상단-6")} suffix={label("상단-7")}/>{children}</body>
    </html>
  );
}


