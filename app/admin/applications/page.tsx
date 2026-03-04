"use client";

import { useState } from "react";

type Status = "검토중" | "승인" | "반려";

interface Application {
  id: string;
  name: string;
  role: string;
  apt: string;
  units: number;
  date: string;
  status: Status;
  phone: string;
  email: string;
}

const initialApps: Application[] = [
  { id: "APP-00028", name: "김민수", role: "회장", apt: "광명 자이 더샵", units: 3344, date: "2026-03-04", status: "검토중", phone: "010-1234-5678", email: "kim@test.com" },
  { id: "APP-00027", name: "이지영", role: "총무", apt: "호반써밋동탄", units: 1842, date: "2026-03-03", status: "승인", phone: "010-2345-6789", email: "lee@test.com" },
  { id: "APP-00026", name: "박현우", role: "회장", apt: "e편한세상 부천", units: 1056, date: "2026-03-02", status: "승인", phone: "010-3456-7890", email: "park@test.com" },
  { id: "APP-00025", name: "최서연", role: "임원", apt: "힐스테이트 인천시청역", units: 956, date: "2026-03-01", status: "검토중", phone: "010-4567-8901", email: "choi@test.com" },
  { id: "APP-00024", name: "정도현", role: "일반", apt: "광명 자이 더샵", units: 3344, date: "2026-02-28", status: "반려", phone: "010-5678-9012", email: "jung@test.com" },
  { id: "APP-00023", name: "윤소희", role: "회장", apt: "송도 더샵 그린스퀘어", units: 888, date: "2026-02-27", status: "검토중", phone: "010-6789-0123", email: "yoon@test.com" },
  { id: "APP-00022", name: "강준혁", role: "총무", apt: "힐스테이트 동탄 포레스트", units: 792, date: "2026-02-26", status: "승인", phone: "010-7890-1234", email: "kang@test.com" },
  { id: "APP-00021", name: "임채원", role: "회장", apt: "e편한세상 인천어천", units: 728, date: "2026-02-25", status: "검토중", phone: "010-8901-2345", email: "lim@test.com" },
  { id: "APP-00020", name: "한미래", role: "임원", apt: "호반써밋동탄", units: 1842, date: "2026-02-24", status: "승인", phone: "010-9012-3456", email: "han@test.com" },
  { id: "APP-00019", name: "오태양", role: "총무", apt: "더샵 인천부평역 센트럴", units: 1134, date: "2026-02-23", status: "승인", phone: "010-0123-4567", email: "oh@test.com" },
];

const statusStyle = (status: string): React.CSSProperties => {
  if (status === "검토중") return { background: "#fef9c3", color: "#854d0e", border: "1px solid #fde047" };
  if (status === "승인") return { background: "#dcfce7", color: "#166534", border: "1px solid #86efac" };
  if (status === "반려") return { background: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5" };
  return {};
};

const roleColor = (role: string): React.CSSProperties => {
  if (role === "회장") return { background: "#ede9fe", color: "#5b21b6" };
  if (role === "총무") return { background: "#e0f2fe", color: "#0369a1" };
  if (role === "임원") return { background: "#fce7f3", color: "#9d174d" };
  return { background: "#f3f4f6", color: "#374151" };
};

export default function ApplicationsPage() {
  const [apps, setApps] = useState<Application[]>(initialApps);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("전체");

  const filtered = apps.filter((a) => {
    const matchSearch = a.name.includes(search) || a.apt.includes(search);
    const matchStatus = statusFilter === "전체" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, newStatus: Status) => {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
  };

  const counts = {
    전체: apps.length,
    검토중: apps.filter((a) => a.status === "검토중").length,
    승인: apps.filter((a) => a.status === "승인").length,
    반려: apps.filter((a) => a.status === "반려").length,
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1f2937", margin: "0 0 4px" }}>신청 관리</h2>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>입주예정자 집단등기 신청 목록을 관리합니다.</p>
      </div>

      {/* 상태 요약 탭 */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {(["전체", "검토중", "승인", "반려"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.15s",
              ...(statusFilter === s
                ? { background: "#2C3E50", color: "#fff", borderColor: "#2C3E50" }
                : { background: "#fff", color: "#6b7280", borderColor: "#e5e7eb" }),
            }}
          >
            {s} ({counts[s]})
          </button>
        ))}
      </div>

      {/* 검색 + 필터 바 */}
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "16px 20px",
        marginBottom: "16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
        display: "flex",
        gap: "12px",
        alignItems: "center",
      }}>
        <div style={{ position: "relative", flex: 1 }}>
          <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" }}>🔍</span>
          <input
            type="text"
            placeholder="신청자명 또는 단지명으로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 38px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ fontSize: "13px", color: "#6b7280" }}>
          총 {filtered.length}건
        </div>
      </div>

      {/* 테이블 */}
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
        overflow: "hidden",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              {["신청번호", "신청자", "역할", "단지명", "세대수", "신청일", "상태", "액션"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: "700", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e5e7eb" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((app, i) => (
              <tr key={app.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                <td style={{ padding: "14px 16px", fontSize: "13px", fontWeight: "600", color: "#2C3E50" }}>{app.id}</td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#1f2937" }}>{app.name}</div>
                  <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{app.phone}</div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ padding: "2px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", ...roleColor(app.role) }}>
                    {app.role}
                  </span>
                </td>
                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#374151" }}>{app.apt}</td>
                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#6b7280" }}>{app.units.toLocaleString()}세대</td>
                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#6b7280" }}>{app.date}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", ...statusStyle(app.status) }}>
                    {app.status}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  {app.status === "검토중" && (
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        onClick={() => updateStatus(app.id, "승인")}
                        style={{
                          padding: "5px 10px",
                          background: "#10b981",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        승인
                      </button>
                      <button
                        onClick={() => updateStatus(app.id, "반려")}
                        style={{
                          padding: "5px 10px",
                          background: "#ef4444",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        반려
                      </button>
                    </div>
                  )}
                  {app.status !== "검토중" && (
                    <button
                      onClick={() => updateStatus(app.id, "검토중")}
                      style={{
                        padding: "5px 10px",
                        background: "#f3f4f6",
                        color: "#6b7280",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      재검토
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
