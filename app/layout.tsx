import type { Metadata } from "next";
import "./globals.css";

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
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
