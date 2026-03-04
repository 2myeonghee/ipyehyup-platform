"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "서비스소개", href: "/" },
  { label: "계산기", href: "/calculator/" },
  { label: "AI상담", href: "/ai-consult/" },
  { label: "담당단지", href: "/districts/" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E2E5EA",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="hidden sm:block">
              <div
                className="font-bold text-sm leading-tight"
                style={{ color: "#1B2A3A" }}
              >
                법무법인 더 에이치 황해
              </div>
              <div className="text-xs" style={{ color: "#6b7280" }}>
                입예협 집단등기 전문
              </div>
            </div>
            <div className="sm:hidden font-bold text-sm" style={{ color: "#1B2A3A" }}>
              더 에이치 황해
            </div>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold transition-colors hover:opacity-70"
                style={{ color: "#1B2A3A" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/register/"
              className="px-4 py-2 rounded-md text-sm font-semibold transition-colors hover:opacity-90"
              style={{ backgroundColor: "#1B2A3A", color: "#ffffff" }}
            >
              신청하기
            </Link>
          </nav>

          {/* 모바일 햄버거 버튼 */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "#1B2A3A" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <span
                className={`block h-0.5 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                style={{ backgroundColor: "#1B2A3A" }}
              />
              <span
                className={`block h-0.5 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
                style={{ backgroundColor: "#1B2A3A" }}
              />
              <span
                className={`block h-0.5 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                style={{ backgroundColor: "#1B2A3A" }}
              />
            </div>
          </button>
        </div>

        {/* 모바일 드롭다운 메뉴 */}
        {menuOpen && (
          <div className="md:hidden py-4" style={{ borderTop: "1px solid #E2E5EA" }}>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-gray-50"
                  style={{ color: "#1B2A3A" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/register/"
                className="mt-2 px-4 py-2 rounded-md text-sm font-semibold text-center transition-colors hover:opacity-90"
                style={{ backgroundColor: "#1B2A3A", color: "#ffffff" }}
                onClick={() => setMenuOpen(false)}
              >
                신청하기
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
