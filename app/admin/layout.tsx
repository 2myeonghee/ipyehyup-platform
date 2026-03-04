"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  {
    href: "/admin",
    label: "대시보드",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: "/admin/applications",
    label: "신청관리",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    href: "/admin/districts",
    label: "단지관리",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="9" width="18" height="13" rx="1" />
        <path d="M3 9l9-6 9 6" />
        <line x1="9" y1="22" x2="9" y2="12" />
        <line x1="15" y1="22" x2="15" y2="12" />
      </svg>
    ),
  },
  {
    href: "/admin/assignments",
    label: "변호사배정",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: "/admin/notices",
    label: "공지관리",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminName, setAdminName] = useState("관리자");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("admin_token");
    if (!token && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.replace("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!mounted) {
    return (
      <div style={{ minHeight: "100vh", background: "#F8F9FA", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#1B2A3A", fontSize: "14px" }}>로딩 중...</div>
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F1F5F9" }}>
      {/* 사이드바 */}
      <aside style={{
        width: "240px",
        minWidth: "240px",
        background: "#0F172A",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 100,
      }}>
        {/* 로고 */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: "700", fontSize: "14px", lineHeight: "1.3" }}>
              더 에이치 황해
            </div>
            <div style={{ color: "#C4973A", fontSize: "11px", marginTop: "3px", fontWeight: "500" }}>
              관리자 패널
            </div>
          </div>
        </div>

        {/* 메뉴 */}
        <nav style={{ padding: "12px 0", flex: 1 }}>
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "11px 20px",
                  color: active ? "#fff" : "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: active ? "600" : "400",
                  background: active ? "#1E293B" : "transparent",
                  borderLeft: active ? "3px solid #C4973A" : "3px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ display: "flex", flexShrink: 0 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 로그아웃 */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "rgba(255,255,255,0.45)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              padding: "8px 0",
              width: "100%",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 컨텐츠 영역 */}
      <div style={{ marginLeft: "240px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* 상단 바 */}
        <header style={{
          height: "64px",
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}>
          <div>
            <h1 style={{ fontSize: "16px", fontWeight: "600", color: "#1f2937", margin: 0 }}>
              {menuItems.find((m) => isActive(m.href))?.label ?? "관리자 패널"}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#6b7280",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span style={{
                position: "absolute",
                top: "-2px",
                right: "-2px",
                width: "8px",
                height: "8px",
                background: "#ef4444",
                borderRadius: "50%",
              }} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "32px",
                height: "32px",
                background: "#1B2A3A",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "13px",
                fontWeight: "600",
              }}>
                관
              </div>
              <span style={{ fontSize: "14px", color: "#374151", fontWeight: "500" }}>
                {adminName}
              </span>
            </div>
          </div>
        </header>

        {/* 페이지 컨텐츠 */}
        <main style={{ padding: "24px", flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
