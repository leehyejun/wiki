import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "블록로그 서버 위키",
  description: "마인크래프트 서버 커뮤니티 안내와 위키",
  other: {
    "codex-preview": "development",
  },
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
      <body className="antialiased">{children}</body>
    </html>
  );
}

