"use client";

import { useState } from "react";
import Link from "next/link";

type Role = "회장" | "총무" | "임원" | "일반수분양자";
type Region = "서울" | "경기" | "인천" | "부산" | "대구" | "광주" | "대전" | "울산" | "세종" | "강원" | "충북" | "충남" | "전북" | "전남" | "경북" | "경남" | "제주";

const REGIONS: Region[] = ["서울","경기","인천","부산","대구","광주","대전","울산","세종","강원","충북","충남","전북","전남","경북","경남","제주"];
const ROLES: Role[] = ["회장","총무","임원","일반수분양자"];
const STEPS = ["신청자 정보", "단지 정보", "접수 완료"];

/* ─── 스텝 인디케이터 ─── */
function StepIndicator({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px" }}>
      {STEPS.map((label, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "12px", fontWeight: 700,
              background: i < current ? "#1B2A3A" : i === current ? "#1B2A3A" : "#E2E8F0",
              color: i <= current ? "#fff" : "#94A3B8",
              flexShrink: 0,
            }}>
              {i < current
                ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                : i + 1}
            </div>
            <span style={{ fontSize: "11px", fontWeight: i === current ? 600 : 400, color: i === current ? "#0D1117" : "#94A3B8", whiteSpace: "nowrap" }}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ width: "56px", height: "1px", background: i < current ? "#1B2A3A" : "#E2E8F0", margin: "0 6px", marginBottom: "22px", flexShrink: 0 }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── 입력 필드 래퍼 ─── */
function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>
        {label}{required && <span style={{ color: "#EF4444", marginLeft: "2px" }}>*</span>}
      </label>
      {children}
      {error && <span style={{ fontSize: "11px", color: "#EF4444" }}>{error}</span>}
    </div>
  );
}

/* ─── 메인 ─── */
export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [receipt, setReceipt] = useState("");

  const [s1, setS1] = useState({ name: "", phone: "", email: "", role: "일반수분양자" as Role });
  const [s2, setS2] = useState({ districtName: "", region: "" as Region | "", totalUnits: "", moveInDate: "", inquiry: "" });
  const [e1, setE1] = useState<Partial<Record<keyof typeof s1, string>>>({});
  const [e2, setE2] = useState<Partial<Record<keyof typeof s2, string>>>({});

  const validate1 = () => {
    const errs: typeof e1 = {};
    if (!s1.name.trim()) errs.name = "이름을 입력해주세요.";
    if (!s1.phone.trim()) errs.phone = "연락처를 입력해주세요.";
    else if (!/^01[0-9]\d{7,8}$/.test(s1.phone.replace(/-/g, ""))) errs.phone = "올바른 연락처 형식이 아닙니다.";
    if (!s1.email.trim()) errs.email = "이메일을 입력해주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s1.email)) errs.email = "올바른 이메일 형식이 아닙니다.";
    setE1(errs);
    return Object.keys(errs).length === 0;
  };

  const validate2 = () => {
    const errs: typeof e2 = {};
    if (!s2.districtName.trim()) errs.districtName = "단지명을 입력해주세요.";
    if (!s2.region) errs.region = "소재지를 선택해주세요.";
    if (!s2.totalUnits.trim() || isNaN(Number(s2.totalUnits)) || Number(s2.totalUnits) <= 0)
      errs.totalUnits = "올바른 세대수를 입력해주세요.";
    if (!s2.moveInDate) errs.moveInDate = "입주예정일을 입력해주세요.";
    setE2(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate2()) return;
    setReceipt(String(Math.floor(10000 + Math.random() * 90000)));
    setStep(2);
  };

  /* 공통 input 스타일 */
  const inp: React.CSSProperties = {
    width: "100%", padding: "10px 12px", fontSize: "13px", fontFamily: "inherit",
    border: "1.5px solid #E2E8F0", borderRadius: "5px", outline: "none",
    background: "#fff", color: "#0D1117", boxSizing: "border-box",
    appearance: "none", WebkitAppearance: "none",
  };
  const inpErr: React.CSSProperties = { ...inp, borderColor: "#FCA5A5" };
  const btnPrimary: React.CSSProperties = {
    width: "100%", padding: "12px 0", fontSize: "14px", fontWeight: 700,
    background: "#1B2A3A", color: "#fff", border: "none", borderRadius: "6px",
    cursor: "pointer", fontFamily: "inherit", letterSpacing: "-0.01em",
  };
  const btnSecondary: React.CSSProperties = {
    width: "100%", padding: "12px 0", fontSize: "14px", fontWeight: 700,
    background: "#fff", color: "#374151", border: "1.5px solid #E2E8F0", borderRadius: "6px",
    cursor: "pointer", fontFamily: "inherit",
  };

  return (
    <div style={{ background: "#F5F6F8", minHeight: "100vh" }}>
      {/* 헤더 */}
      <div style={{ background: "#1B2A3A", padding: "44px 24px 38px" }}>
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "6px" }}>집단등기 신청</h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)" }}>입주예정자협의회 집단등기 신청 접수</p>
        </div>
      </div>

      <div style={{ maxWidth: "520px", margin: "0 auto", padding: "28px 24px 48px" }}>
        <StepIndicator current={step} />

        <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "28px" }}>

          {/* ── Step 1: 신청자 정보 ── */}
          {step === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0D1117", letterSpacing: "-0.01em", margin: 0 }}>신청자 정보</h2>

              <Field label="이름" required error={e1.name}>
                <input type="text" value={s1.name} onChange={(e) => setS1({ ...s1, name: e.target.value })}
                  style={e1.name ? inpErr : inp} placeholder="홍길동" />
              </Field>

              <Field label="연락처" required error={e1.phone}>
                <input type="tel" value={s1.phone} onChange={(e) => setS1({ ...s1, phone: e.target.value })}
                  style={e1.phone ? inpErr : inp} placeholder="010-0000-0000" />
              </Field>

              <Field label="이메일" required error={e1.email}>
                <input type="email" value={s1.email} onChange={(e) => setS1({ ...s1, email: e.target.value })}
                  style={e1.email ? inpErr : inp} placeholder="example@email.com" />
              </Field>

              <Field label="역할" required>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {ROLES.map((r) => (
                    <button key={r} onClick={() => setS1({ ...s1, role: r })} style={{
                      padding: "10px 12px", borderRadius: "5px", fontSize: "13px", fontWeight: 600,
                      cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                      border: s1.role === r ? "1.5px solid #1B2A3A" : "1.5px solid #E2E8F0",
                      background: s1.role === r ? "#1B2A3A" : "#fff",
                      color: s1.role === r ? "#fff" : "#374151",
                    }}>
                      {r}
                    </button>
                  ))}
                </div>
              </Field>

              <div style={{ paddingTop: "8px" }}>
                <button onClick={() => validate1() && setStep(1)} style={btnPrimary}>다음 단계</button>
              </div>
            </div>
          )}

          {/* ── Step 2: 단지 정보 ── */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0D1117", letterSpacing: "-0.01em", margin: 0 }}>단지 정보</h2>

              <Field label="단지명" required error={e2.districtName}>
                <input type="text" value={s2.districtName} onChange={(e) => setS2({ ...s2, districtName: e.target.value })}
                  style={e2.districtName ? inpErr : inp} placeholder="예: 호반써밋 동탄" />
              </Field>

              <Field label="소재지" required error={e2.region}>
                <div style={{ position: "relative" }}>
                  <select value={s2.region} onChange={(e) => setS2({ ...s2, region: e.target.value as Region })}
                    style={{ ...e2.region ? inpErr : inp, paddingRight: "36px", cursor: "pointer" }}>
                    <option value="">선택해주세요</option>
                    {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <svg style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
              </Field>

              <Field label="총 세대수" required error={e2.totalUnits}>
                <div style={{ position: "relative" }}>
                  <input type="number" value={s2.totalUnits} onChange={(e) => setS2({ ...s2, totalUnits: e.target.value })}
                    style={{ ...e2.totalUnits ? inpErr : inp, paddingRight: "40px" }} placeholder="예: 500" min={1} />
                  <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "12px", color: "#94A3B8", pointerEvents: "none" }}>세대</span>
                </div>
              </Field>

              <Field label="입주예정일" required error={e2.moveInDate}>
                <input type="date" value={s2.moveInDate} onChange={(e) => setS2({ ...s2, moveInDate: e.target.value })}
                  style={e2.moveInDate ? inpErr : inp} />
              </Field>

              <Field label="문의사항">
                <textarea value={s2.inquiry} onChange={(e) => setS2({ ...s2, inquiry: e.target.value })}
                  style={{ ...inp, minHeight: "96px", resize: "vertical" as const }}
                  placeholder="궁금하신 사항을 자유롭게 작성해주세요." />
              </Field>

              <div style={{ display: "flex", gap: "10px", paddingTop: "8px" }}>
                <button onClick={() => setStep(0)} style={{ ...btnSecondary, flex: 1 }}>이전</button>
                <button onClick={handleSubmit} style={{ ...btnPrimary, flex: 2 }}>신청 완료</button>
              </div>
            </div>
          )}

          {/* ── Step 3: 완료 ── */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "12px 0 8px" }}>
              {/* 체크 아이콘 */}
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#1B2A3A", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0D1117", letterSpacing: "-0.02em", marginBottom: "8px" }}>신청이 완료되었습니다</h2>
              <p style={{ fontSize: "14px", color: "#64748B", marginBottom: "24px" }}>영업일 2일 내 담당자가 연락드립니다.</p>

              {/* 접수번호 */}
              <div style={{ width: "100%", background: "#F5F6F8", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#94A3B8", letterSpacing: "0.06em", marginBottom: "8px" }}>접수번호</div>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "#0D1117", letterSpacing: "0.08em" }}>{receipt}</div>
              </div>

              {/* 신청 요약 */}
              <div style={{ width: "100%", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "16px", marginBottom: "24px", textAlign: "left" }}>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "12px" }}>신청 정보 요약</div>
                {[
                  ["이름", `${s1.name} (${s1.role})`],
                  ["연락처", s1.phone],
                  ["단지명", `${s2.districtName}${s2.region ? ` · ${s2.region}` : ""}`],
                  ["총 세대수", `${Number(s2.totalUnits).toLocaleString()}세대`],
                ].map(([l, v]) => (
                  <div key={l} style={{ display: "flex", gap: "12px", padding: "6px 0", borderBottom: "1px solid #F1F5F9" }}>
                    <span style={{ fontSize: "12px", color: "#94A3B8", width: "60px", flexShrink: 0 }}>{l}</span>
                    <span style={{ fontSize: "12px", color: "#374151", fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>

              <Link href="/" style={{ display: "block", width: "100%", padding: "12px 0", background: "#1B2A3A", color: "#fff", borderRadius: "6px", fontSize: "14px", fontWeight: 700, textDecoration: "none", textAlign: "center", letterSpacing: "-0.01em" }}>
                홈으로 돌아가기
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        input[type=date]::-webkit-calendar-picker-indicator { opacity: 0.4; cursor: pointer; }
        input:focus, select:focus, textarea:focus { border-color: #1B2A3A !important; outline: none; box-shadow: 0 0 0 2px rgba(27,42,58,0.08); }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        select { background-image: none; }
      `}</style>
    </div>
  );
}
