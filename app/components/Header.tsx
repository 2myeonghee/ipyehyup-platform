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
    <header style={{ backgroundColor: "#2C3E50" }} className="sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: "#C9A84C", color: "#2C3E50" }}>
              에이치
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-sm leading-tight">법무법인 더 에이치 황해</div>
              <div className="text-xs text-gray-300">입예협 집단등기 전문</div>
            </div>
            <div className="sm:hidden font-bold text-sm">더 에이치 황해</div>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/register/"
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              style={{ backgroundColor: "#C9A84C", color: "#2C3E50" }}
            >
              신청하기
            </Link>
          </nav>

          {/* 모바일 햄버거 버튼 */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>

        {/* 모바일 드롭다운 메뉴 */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/20 py-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/register/"
                className="mt-2 px-4 py-2 rounded-lg text-sm font-semibold text-center transition-colors"
                style={{ backgroundColor: "#C9A84C", color: "#2C3E50" }}
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
