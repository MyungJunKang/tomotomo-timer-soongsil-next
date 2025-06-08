import type { Metadata } from "next";
import localFont from "next/font/local";
import "@styles/globals.scss";
import AntdStyledComponentProvider from "src/utils/provider/AntdStyledComponentProvider";

const gmarketSans = localFont({
  src: [
    {
      path: "./fonts/GmarketSansLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/GmarketSansMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GmarketSansBold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gmarket-sans",
});

export const metadata: Metadata = {
  title: "TOMOTOMO TIMER",
  description: "미디어경영학과 1학년 1학기 프로그래밍 프로젝트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <AntdStyledComponentProvider>
        <body className={`${gmarketSans.variable}`}>{children}</body>
      </AntdStyledComponentProvider>
    </html>
  );
}
