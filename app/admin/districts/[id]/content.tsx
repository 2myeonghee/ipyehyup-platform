"use client";

import { useState, use } from "react";
import Link from "next/link";

const districtsData = [
  { id: "1", name: "호반써밋동탄", location: "경기 화성", units: 1842, status: "진행중", progress: 65, date: "2026-04", attorney: "이현준 변호사", phone: "032-251-1001", email: "hyunjun.lee@hhlawfirm.kr", apps: 28 },
  { id: "2", name: "힐스테이트 인천시청역", location: "인천 남동", units: 956, status: "진행중", progress: 30, date: "2026-05", attorney: "박성민 변호사", phone: "032-251-1002", email: "sungmin.park@hhlawfirm.kr", apps: 12 },
  { id: "3", name: "e편한세상 인천어천", location: "인천 서구", units: 728, status: "예정", progress: 0, date: "2026-06", attorney: "미정", phone: "032-251-1000", email: "info@hhlawfirm.kr", apps: 3 },
  { id: "4", name: "더샵 인천부평역 센트럴", location: "인천 부평", units: 1134, status: "완료", progress: 100, date: "2025-11", attorney: "이현준 변호사", phone: "032-251-1001", email: "hyunjun.lee@hhlawfirm.kr", apps: 45 },
  { id: "5", name: "검단신도시 우미린", location: "인천 서구", units: 814, status: "완료", progress: 100, date: "2025-09", attorney: "박성민 변호사", phone: "032-251-1002", email: "sungmin.park@hhlawfirm.kr", apps: 31 },
  { id: "6", name: "힐스테이트 송도 The H", location: "인천 연수", units: 620, status: "완료", progress: 100, date: "2025-07", attorney: "이현준 변호사", phone: "032-251-1001", email: "hyunjun.lee@hhlawfirm.kr", apps: 22 },
  { id: "7", name: "e편한세상 부천 센트럴파크", location: "경기 부천", units: 1056, status: "진행중", progress: 45, date: "2026-04", attorney: "박성민 변호사", phone: "032-251-1002", email: "sungmin.park@hhlawfirm.kr", apps: 18 },
  { id: "8", name: "힐스테이트 동탄 포레스트", location: "경기 화성", units: 792, status: "예정", progress: 0, date: "2026-07", attorney: "미정", phone: "032-251-1000", email: "info@hhlawfirm.kr", apps: 5 },
  { id: "9", name: "용인 역북지구 자이", location: "경기 용인", units: 1200, status: "완료", progress: 100, date: "2025-10", attorney: "이현준 변호사", phone: "032-251-1001", email: "hyunjun.lee@hhlawfirm.kr", apps: 38 },
  { id: "10", name: "광명 자이 더샵", location: "경기 광명", units: 3344, status: "진행중", progress: 20, date: "2026-06", attorney: "박성민 변호사", phone: "032-251-1002", email: "sungmin.park@hhlawfirm.kr", apps: 9 },
  { id: "11", name: "청라 호반써밋", location: "인천 서구", units: 1432, status: "완료", progress: 100, date: "2025-08", attorney: "이현준 변호사", phone: "032-251-1001", email: "hyunjun.lee@hhlawfirm.kr", apps: 52 },
  { id: "12", name: "송도 더샵 그린스퀘어", location: "인천 연수", units: 888, status: "예정", progress: 0, date: "2026-08", attorney: "미정", phone: "032-251-1000", email: "info@hhlawfirm.kr", apps: 2 },
];

const TIMELINE_STEPS = ["계약 체결", "서류 수집", "등기 신청", "등기 완료"];

const STATUS_COLORS: Record<string, { border: string; color: string }> = {
  진행중: { border: "#BFDBFE", color: "#1D4ED8" },
  완료:   { border: "#BBF7D0", color: "#15803D" },
  예정:   { border: "#D1D5DB", color: "#4B5563" },
};

const NOTICE_SAMPLES = [
  { id: 1, title: "서류 제출 기한 안내", date: "2026-03-01", type: "중요" },
  { id: 2, title: "담당 변호사 배정 완료", date: "2026-02-20", type: "일반" },
  { id: 3, title: "협의회 동의율 현황 공유", date: "2026-02-10", type: "일반" },
];


export default function AdminDistrictDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const district = districtsData.find((d) => d.id === id);
  const [progress, setProgress] = useState(district?.progress ?? 0);
  const [status, setStatus] = useState(district?.status ?? "예정");
  const [attorney, setAttorney] = useState(district?.attorney ?? "미정");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeType, setNoticeType] = useState("일반");
  const [notices, setNotices] = useState(NOTICE_SAMPLES);

  if (!district) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p style={{ color: "#64748B", marginBottom: "12px" }}>단지를 찾을 수 없습니다.</p>
        <Link href="/admin/districts" style={{ color: "#1B2A3A", fontSize: "14px" }}>← 목록으로</Link>
      </div>
    );
  }

  const sc = STATUS_COLORS[status] ?? STATUS_COLORS["예정"];
  const timelineActive = progress === 0 ? 0 : progress <= 30 ? 1 : progress <= 65 ? 2 : progress < 100 ? 3 : 4;

  const addNotice = () => {
    if (!noticeTitle.trim()) return;
    setNotices((prev) => [{ id: Date.now(), title: noticeTitle, date: new Date().toISOString().slice(0, 10), type: noticeType }, ...prev]);
    setNoticeTitle("");
  };

  return (
    <div style={{ maxWidth: "960px" }}>
      {/* 브레드크럼 */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
        <Link href="/admin/districts" style={{ color: "#64748B", textDecoration: "none", fontSize: "13px", display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          단지 목록
        </Link>
        <span style={{ color: "#CBD5E1", fontSize: "13px" }}>/</span>
        <span style={{ fontSize: "13px", color: "#0D1117", fontWeight: 600 }}>{district.name}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "20px", alignItems: "start" }}>
        {/* 좌측 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* 기본 정보 */}
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0D1117", letterSpacing: "-0.02em", marginBottom: "4px" }}>{district.name}</h2>
                <p style={{ fontSize: "13px", color: "#64748B" }}>{district.location} · {district.units.toLocaleString()}세대</p>
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, padding: "4px 10px", borderRadius: "4px", border: `1px solid ${sc.border}`, color: sc.color }}>
                {status}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              {[
                ["입주 예정", district.date],
                ["신청 건수", `${district.apps}건`],
                ["담당 변호사", attorney],
              ].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "#94A3B8", letterSpacing: "0.02em", marginBottom: "4px" }}>{l}</div>
                  <div style={{ fontSize: "14px", color: "#0D1117", fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 진행 타임라인 */}
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "24px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0D1117", marginBottom: "20px", letterSpacing: "-0.01em" }}>진행 현황</h3>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", gap: "0" }}>
              {TIMELINE_STEPS.map((step, i) => (
                <div key={step} style={{ display: "flex", alignItems: "center", flex: i < TIMELINE_STEPS.length - 1 ? 1 : undefined }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, background: i < timelineActive ? "#1B2A3A" : i === timelineActive ? "#1B2A3A" : "#E2E8F0", color: i <= timelineActive ? "#fff" : "#94A3B8", border: i === timelineActive ? "2px solid #0D1117" : "none" }}>
                      {i < timelineActive ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> : i + 1}
                    </div>
                    <span style={{ fontSize: "11px", marginTop: "6px", color: i <= timelineActive ? "#0D1117" : "#94A3B8", fontWeight: i === timelineActive ? 600 : 400, whiteSpace: "nowrap" }}>{step}</span>
                  </div>
                  {i < TIMELINE_STEPS.length - 1 && (
                    <div style={{ flex: 1, height: "2px", background: i < timelineActive ? "#1B2A3A" : "#E2E8F0", margin: "0 4px", marginBottom: "18px" }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 공지 관리 */}
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "24px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0D1117", marginBottom: "16px", letterSpacing: "-0.01em" }}>공지사항 관리</h3>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <input value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addNotice()} className="form-input" placeholder="공지 제목 입력" style={{ flex: 1, fontSize: "13px" }} />
              <select value={noticeType} onChange={(e) => setNoticeType(e.target.value)} className="form-select" style={{ width: "90px", fontSize: "13px" }}>
                <option>일반</option><option>중요</option><option>긴급</option>
              </select>
              <button onClick={addNotice} className="btn-primary" style={{ padding: "10px 14px", fontSize: "13px", whiteSpace: "nowrap" }}>등록</button>
            </div>
            {notices.map((n) => (
              <div key={n.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F1F5F9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "11px", padding: "2px 6px", borderRadius: "3px", background: n.type === "긴급" ? "#FEE2E2" : n.type === "중요" ? "#FEF9C3" : "#F5F6F8", color: n.type === "긴급" ? "#DC2626" : n.type === "중요" ? "#92400E" : "#64748B", fontWeight: 600 }}>{n.type}</span>
                  <span style={{ fontSize: "13px", color: "#374151" }}>{n.title}</span>
                </div>
                <span style={{ fontSize: "11px", color: "#94A3B8" }}>{n.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 우측 패널 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* 진행률 편집 */}
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#94A3B8", marginBottom: "12px", letterSpacing: "0.02em" }}>진행률</div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "#0D1117", letterSpacing: "-0.02em", marginBottom: "8px" }}>{progress}%</div>
            <div style={{ height: "4px", background: "#E2E8F0", borderRadius: "2px", marginBottom: "12px" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "#1B2A3A", borderRadius: "2px", transition: "width 0.2s" }} />
            </div>
            <input type="range" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} style={{ width: "100%", accentColor: "#1B2A3A" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94A3B8", marginTop: "4px" }}>
              <span>0%</span><span>100%</span>
            </div>
          </div>

          {/* 상태 변경 */}
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#94A3B8", marginBottom: "12px", letterSpacing: "0.02em" }}>상태 변경</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {["예정", "진행중", "완료"].map((s) => (
                <button key={s} onClick={() => setStatus(s)} style={{ padding: "8px 12px", borderRadius: "5px", border: status === s ? "1.5px solid #1B2A3A" : "1.5px solid #E2E8F0", background: status === s ? "#1B2A3A" : "#fff", color: status === s ? "#fff" : "#374151", fontSize: "13px", fontWeight: 600, cursor: "pointer", textAlign: "left" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 변호사 배정 */}
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#94A3B8", marginBottom: "12px", letterSpacing: "0.02em" }}>담당 변호사</div>
            <select value={attorney} onChange={(e) => setAttorney(e.target.value)} className="form-select" style={{ fontSize: "13px" }}>
              <option>미정</option>
              <option>이현준 변호사</option>
              <option>박성민 변호사</option>
            </select>
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "10px", fontSize: "13px", padding: "9px 0" }}>저장</button>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.detail-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
