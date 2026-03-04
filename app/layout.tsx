import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "법무법인 더 에이치 황해 | 입예협 집단등기 전문",
  description: "입주예정자협의회 집단등기 전문 법무법인. AI 법률상담, 실시간 진행현황, 비용 계산기.",
  keywords: "집단등기, 입주예정자협의회, 법무법인, 더에이치황해, 소유권이전등기",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} ${notoSerifKr.variable} ${notoSansKr.className}`}>
        {children}
      </body>
    </html>
  );
}
