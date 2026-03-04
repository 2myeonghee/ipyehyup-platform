"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "진행중" | "완료" | "예정";

interface District {
  id: string; name: string; location: string; units: number;
  status: Status; progress: number; date: string; attorney: string;
}

const districts: District[] = [
  { id: "1",  name: "호반써밋동탄",            location: "경기 화성", units: 1842, status: "진행중", progress: 65,  date: "2026-04", attorney: "이현준 변호사" },
  { id: "2",  name: "힐스테이트 인천시청역",    location: "인천 남동", units: 956,  status: "진행중", progress: 30,  date: "2026-05", attorney: "박성민 변호사" },
  { id: "3",  name: "e편한세상 인천어천",       location: "인천 서구", units: 728,  status: "예정",   progress: 0,   date: "2026-06", attorney: "미정" },
  { id: "4",  name: "더샵 인천부평역 센트럴",   location: "인천 부평", units: 1134, status: "완료",   progress: 100, date: "2025-11", attorney: "이현준 변호사" },
  { id: "5",  name: "검단신도시 우미린",        location: "인천 서구", units: 814,  status: "완료",   progress: 100, date: "2025-09", attorney: "박성민 변호사" },
  { id: "6",  name: "힐스테이트 송도 The H",   location: "인천 연수", units: 620,  status: "완료",   progress: 100, date: "2025-07", attorney: "이현준 변호사" },
  { id: "7",  name: "e편한세상 부천 센트럴파크",location: "경기 부천", units: 1056, status: "진행중", progress: 45,  date: "2026-04", attorney: "박성민 변호사" },
  { id: "8",  name: "힐스테이트 동탄 포레스트", location: "경기 화성", units: 792,  status: "예정",   progress: 0,   date: "2026-07", attorney: "미정" },
  { id: "9",  name: "용인 역북지구 자이",       location: "경기 용인", units: 1200, status: "완료",   progress: 100, date: "2025-10", attorney: "이현준 변호사" },
  { id: "10", name: "광명 자이 더샵",           location: "경기 광명", units: 3344, status: "진행중", progress: 20,  date: "2026-06", attorney: "박성민 변호사" },
  { id: "11", name: "청라 호반써밋",            location: "인천 서구", units: 1432, status: "완료",   progress: 100, date: "2025-08", attorney: "이현준 변호사" },
  { id: "12", name: "송도 더샵 그린스퀘어",     location: "인천 연수", units: 888,  status: "예정",   progress: 0,   date: "2026-08", attorney: "미정" },
];

const STATUS_STYLE: Record<Status, { border: string; color: string }> = {
  진행중: { border: "#BFDBFE", color: "#1D4ED8" },
  완료:   { border: "#BBF7D0", color: "#15803D" },
  예정:   { border: "#D1D5DB", color: "#4B5563" },
};

const PROGRESS_COLOR: Record<Status, string> = {
  진행중: "#1B2A3A", 완료: "#1B2A3A", 예정: "#E2E8F0",
};

export default function DistrictsPage() {
  const [statusFilter, setStatusFilter] = useState<Status | "전체">("전체");

  const filtered = statusFilter === "전체" ? districts : districts.filter((d) => d.status === statusFilter);

  const counts: Record<string, number> = {
    전체: districts.length,
    진행중: districts.filter((d) => d.status === "진행중").length,
    완료:   districts.filter((d) => d.status === "완료").length,
    예정:   districts.filter((d) => d.status === "예정").length,
  };

  return (
    <div style={{ background: "#F5F6F8", minHeight: "100vh" }}>
      {/* 헤더 */}
      <div style={{ background: "#1B2A3A", padding: "48px 24px 40px" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "8px" }}>담당단지 현황</h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>법무법인 더 에이치 황해가 담당하는 집단등기 단지 목록</p>
        </div>
      </div>

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "32px 24px" }}>
        {/* 필터 탭 */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
          {(["전체", "진행중", "완료", "예정"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: "7px 16px", borderRadius: "5px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                border: statusFilter === s ? "none" : "1.5px solid #E2E8F0",
                background: statusFilter === s ? "#1B2A3A" : "#fff",
                color: statusFilter === s ? "#fff" : "#374151",
              }}
            >
              {s} {counts[s]}
            </button>
          ))}
        </div>

        {/* 단지 카드 그리드 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {filtered.map((d) => {
            const sc = STATUS_STYLE[d.status];
            return (
              <Link
                key={d.id}
                href={`/districts/${d.id}/`}
                style={{ textDecoration: "none", background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "20px 24px", display: "block" }}
                className="hover:border-[#1B2A3A] transition-colors"
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "#0D1117", letterSpacing: "-0.01em", marginBottom: "3px" }}>{d.name}</div>
                    <div style={{ fontSize: "12px", color: "#94A3B8" }}>{d.location} · {d.units.toLocaleString()}세대</div>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "4px", border: `1px solid ${sc.border}`, color: sc.color, whiteSpace: "nowrap", marginLeft: "8px" }}>
                    {d.status}
                  </span>
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#94A3B8", marginBottom: "6px" }}>
                    <span>진행률</span><span style={{ fontWeight: 600, color: "#374151" }}>{d.progress}%</span>
                  </div>
                  <div style={{ height: "3px", background: "#E2E8F0", borderRadius: "2px" }}>
                    <div style={{ height: "100%", width: `${d.progress}%`, background: PROGRESS_COLOR[d.status], borderRadius: "2px" }} />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#94A3B8" }}>
                  <span>담당: <span style={{ color: "#374151", fontWeight: 500 }}>{d.attorney}</span></span>
                  <span>입주 {d.date}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#94A3B8", fontSize: "14px" }}>해당 상태의 단지가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
