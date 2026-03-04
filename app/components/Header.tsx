"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "서비스 소개", href: "/" },
  { label: "취득세 계산기", href: "/calculator/" },
  { label: "AI 상담", href: "/ai-consult/" },
  { label: "담당단지", href: "/districts/" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: "#fff", borderBottom: "1px solid #E2E8F0" }}
    >
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>

          {/* 로고 */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "1px" }}>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#0D1117", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              법무법인 더 에이치 황해
            </span>
            <span style={{ fontSize: "11px", color: "#64748B", fontWeight: 500, letterSpacing: "-0.01em" }}>
              입예협 집단등기 전문
            </span>
          </Link>

          {/* 데스크탑 네비 */}
          <nav style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ fontSize: "14px", fontWeight: 500, color: "#374151", textDecoration: "none", letterSpacing: "-0.01em" }}
                className="hover:text-[#1B2A3A]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/register/"
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#fff",
                backgroundColor: "#1B2A3A",
                padding: "8px 20px",
                borderRadius: "5px",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              신청하기
            </Link>
          </nav>

          {/* 모바일 햄버거 */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴"
            style={{ background: "none", border: "none", padding: "8px", cursor: "pointer" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: "#0D1117", transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: "#0D1117", transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: "#0D1117", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </div>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {menuOpen && (
          <div
            className="md:hidden"
            style={{ borderTop: "1px solid #E2E8F0", padding: "16px 0 20px" }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: "10px 4px",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#374151",
                    textDecoration: "none",
                    borderBottom: "1px solid #F1F5F9",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/register/"
                onClick={() => setMenuOpen(false)}
                style={{
                  marginTop: "12px",
                  padding: "11px 0",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: "#1B2A3A",
                  borderRadius: "5px",
                  textDecoration: "none",
                  textAlign: "center",
                  letterSpacing: "-0.01em",
                }}
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
