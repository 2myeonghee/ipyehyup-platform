"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  { href: "/admin", label: "대시보드", icon: "📊" },
  { href: "/admin/applications", label: "신청관리", icon: "🗂" },
  { href: "/admin/districts", label: "단지관리", icon: "🏢" },
  { href: "/admin/assignments", label: "변호사배정", icon: "👨‍⚖️" },
  { href: "/admin/notices", label: "공지관리", icon: "📢" },
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

  // 로그인 페이지는 사이드바 없이 그냥 렌더링
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // 마운트 전에는 빈 화면
  if (!mounted) {
    return (
      <div style={{ minHeight: "100vh", background: "#F8F9FA", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#2C3E50", fontSize: "14px" }}>로딩 중...</div>
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8F9FA" }}>
      {/* 사이드바 */}
      <aside style={{
        width: "240px",
        minWidth: "240px",
        background: "#2C3E50",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 100,
      }}>
        {/* 로고 */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px",
              height: "36px",
              background: "#C9A84C",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2C3E50",
              fontWeight: "700",
              fontSize: "12px",
            }}>
              관리
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: "700", fontSize: "13px", lineHeight: "1.3" }}>
                더 에이치 황해
              </div>
              <div style={{ color: "#C9A84C", fontSize: "11px", marginTop: "2px" }}>
                관리자 패널
              </div>
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
                  padding: "12px 20px",
                  color: active ? "#fff" : "rgba(255,255,255,0.65)",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: active ? "600" : "400",
                  background: active ? "rgba(201,168,76,0.15)" : "transparent",
                  borderLeft: active ? "3px solid #C9A84C" : "3px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: "18px", lineHeight: 1 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 로그아웃 */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "rgba(255,255,255,0.6)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              padding: "8px 0",
              width: "100%",
            }}
          >
            <span>🚪</span>
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
              fontSize: "20px",
              position: "relative",
            }}>
              🔔
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
                background: "#2C3E50",
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
