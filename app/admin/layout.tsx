"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  {
    href: "/admin",
    label: "대시보드",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: "/admin/applications",
    label: "신청관리",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    href: "/admin/districts",
    label: "단지관리",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18M6 21V8l6-5 6 5v13M10 21v-4h4v4" />
      </svg>
    ),
  },
  {
    href: "/admin/assignments",
    label: "변호사배정",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
  },
  {
    href: "/admin/notices",
    label: "공지관리",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("admin_token");
    if (!token && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [pathname, router]);

  if (!mounted) return null;
  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.replace("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F5F6F8" }}>
      {/* 사이드바 오버레이 (모바일) */}
      {sidebarOpen && (
        <div
          className="lg:hidden"
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside
        style={{
          width: "220px",
          background: "#0F172A",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : undefined,
          height: "100vh",
          zIndex: 50,
          transition: "left 0.2s",
        }}
        className={`hidden lg:flex ${sidebarOpen ? "!flex" : ""}`}
      >
        {/* 로고 */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>더에이치 황해</div>
          <div style={{ fontSize: "11px", color: "#475569", marginTop: "2px", fontWeight: 500 }}>관리자</div>
        </div>

        {/* 내비 */}
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "2px" }}>
          {menuItems.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 12px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: active ? 600 : 400,
                  color: active ? "#fff" : "#64748B",
                  background: active ? "#1E293B" : "transparent",
                  borderLeft: active ? "2px solid #fff" : "2px solid transparent",
                  transition: "all 0.1s",
                  letterSpacing: "-0.01em",
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 로그아웃 */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "9px 12px",
              background: "none",
              border: "none",
              color: "#475569",
              fontSize: "13px",
              cursor: "pointer",
              textAlign: "left",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              letterSpacing: "-0.01em",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <div style={{ flex: 1, marginLeft: "220px", display: "flex", flexDirection: "column", minWidth: 0 }} className="admin-main">
        {/* 상단 모바일 헤더 */}
        <div
          className="lg:hidden"
          style={{ background: "#0F172A", padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px", position: "sticky", top: 0, zIndex: 30 }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer", padding: "4px" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>더에이치 황해 관리자</span>
        </div>

        <main style={{ flex: 1, padding: "32px 32px", maxWidth: "1160px" }} className="admin-content">
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .admin-main { margin-left: 0 !important; }
          .admin-content { padding: 20px 16px !important; }
        }
      `}</style>
    </div>
  );
}
