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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased"><SiteTabs/>{children}</body>
    </html>
  );
}


