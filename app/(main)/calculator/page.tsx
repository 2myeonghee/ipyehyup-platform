"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

/* ─── 유틸 ─── */
function formatWon(n: number): string {
  if (n >= 100000000) {
    const eok = Math.floor(n / 100000000);
    const man = Math.floor((n % 100000000) / 10000);
    return man > 0 ? `${eok}억 ${man.toLocaleString()}만원` : `${eok}억원`;
  }
  return `${Math.floor(n / 10000).toLocaleString()}만원`;
}

function formatKrw(n: number): string {
  return `${Math.round(n).toLocaleString()}원`;
}

/* ─── 계산 로직 ─── */
interface CalcResult {
  acquisitionTax: number;
  localEducationTax: number;
  ruralSpecialTax: number;
  bondPurchase: number;
  lawFirmFee: number;
  totalTax: number;
  grandTotal: number;
  rateLabel: string;
}

function calculateTax(price: number, area: "under85" | "over85", firstHome: boolean, units: number): CalcResult {
  let rate: number;
  let rateLabel: string;
  if (price <= 600000000) {
    rate = 0.01; rateLabel = "1%";
  } else if (price <= 900000000) {
    rate = (price * 2 / 300000000 - 3) / 100;
    rateLabel = `${(rate * 100).toFixed(2)}%`;
  } else {
    rate = 0.03; rateLabel = "3%";
  }

  let acqTax = price * rate;
  if (firstHome && price <= 1200000000) {
    acqTax = Math.max(0, acqTax - Math.min(acqTax, 2000000));
  }

  const localEduTax = acqTax * 0.1;
  const ruralTax = area === "over85" ? acqTax * 0.2 : 0;
  const bond = price * 1.2 * 0.002 * 0.8;
  const feePerUnit = units < 100 ? 400000 : units < 200 ? 320000 : 250000;
  const fee = feePerUnit * Math.max(1, units);
  const totalTax = acqTax + localEduTax + ruralTax;

  return { acquisitionTax: acqTax, localEducationTax: localEduTax, ruralSpecialTax: ruralTax, bondPurchase: bond, lawFirmFee: fee, totalTax, grandTotal: totalTax + bond + fee, rateLabel };
}

/* ─── 서브 컴포넌트 ─── */
function Row({ label, value, sub, bold, muted }: { label: string; value: number | string; sub?: string; bold?: boolean; muted?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", padding: "10px 0", borderBottom: "1px solid #F1F5F9" }}>
      <div>
        <div style={{ fontSize: "13px", fontWeight: bold ? 700 : 500, color: bold ? "#0D1117" : "#374151" }}>{label}</div>
        {sub && <div style={{ fontSize: "11px", color: muted ? "#94A3B8" : "#64748B", marginTop: "2px" }}>{sub}</div>}
      </div>
      <div style={{ fontSize: "14px", fontWeight: bold ? 700 : 500, color: bold ? "#0D1117" : "#374151", whiteSpace: "nowrap", flexShrink: 0 }}>
        {typeof value === "string" ? value : formatKrw(value)}
      </div>
    </div>
  );
}

function ToggleBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{ flex: 1, padding: "9px 0", borderRadius: "5px", fontSize: "13px", fontWeight: 600, cursor: "pointer", border: active ? "none" : "1.5px solid #E2E8F0", background: active ? "#1B2A3A" : "#fff", color: active ? "#fff" : "#374151", transition: "all 0.15s" }}>
      {children}
    </button>
  );
}

/* ─── 메인 페이지 ─── */
export default function CalculatorPage() {
  const [price, setPrice] = useState(500000000);
  const [priceText, setPriceText] = useState("500,000,000");
  const [area, setArea] = useState<"under85" | "over85">("under85");
  const [firstHome, setFirstHome] = useState(false);
  const [units, setUnits] = useState(200);

  const result = calculateTax(price, area, firstHome, units);

  const handleSlider = useCallback((v: number) => {
    setPrice(v);
    setPriceText(v.toLocaleString());
  }, []);

  const handlePriceText = useCallback((v: string) => {
    const raw = v.replace(/[^0-9]/g, "");
    setPriceText(raw ? parseInt(raw).toLocaleString() : "");
    const num = parseInt(raw, 10);
    if (!isNaN(num) && num >= 100000000 && num <= 3000000000) setPrice(num);
  }, []);

  const feePerUnit = units < 100 ? 40 : units < 200 ? 32 : 25;

  return (
    <div style={{ background: "#F5F6F8", minHeight: "100vh" }}>
      {/* 헤더 */}
      <div style={{ background: "#1B2A3A", padding: "44px 24px 38px" }}>
        <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "6px" }}>취득세 계산기</h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)" }}>집단등기 비용을 실시간으로 계산해보세요</p>
        </div>
      </div>

      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "28px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "20px" }} className="calc-grid">

          {/* ── 입력 패널 ── */}
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0D1117", letterSpacing: "-0.01em", margin: 0 }}>입력 정보</h2>

            {/* 취득가액 */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>취득가액</label>
                <span style={{ fontSize: "16px", fontWeight: 700, color: "#0D1117", letterSpacing: "-0.02em" }}>{formatWon(price)}</span>
              </div>
              <input
                type="range" min={100000000} max={3000000000} step={10000000}
                value={price}
                onChange={(e) => handleSlider(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#1B2A3A", height: "4px", cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94A3B8", margin: "4px 0 10px" }}>
                <span>1억</span><span>30억</span>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={priceText}
                  onChange={(e) => handlePriceText(e.target.value)}
                  className="form-input"
                  placeholder="직접 입력"
                  style={{ paddingRight: "32px", fontSize: "13px" }}
                />
                <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "12px", color: "#94A3B8", pointerEvents: "none" }}>원</span>
              </div>
            </div>

            {/* 전용면적 */}
            <div>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "10px" }}>전용면적</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <ToggleBtn active={area === "under85"} onClick={() => setArea("under85")}>85㎡ 이하</ToggleBtn>
                <ToggleBtn active={area === "over85"} onClick={() => setArea("over85")}>85㎡ 초과</ToggleBtn>
              </div>
              <div style={{ fontSize: "12px", color: area === "under85" ? "#15803D" : "#94A3B8", marginTop: "8px" }}>
                {area === "under85" ? "85㎡ 이하 — 농어촌특별세 비과세" : "85㎡ 초과 — 농어촌특별세 취득세의 20%"}
              </div>
            </div>

            {/* 생애최초 */}
            <div>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "10px" }}>생애최초 주택 구입</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <ToggleBtn active={firstHome} onClick={() => setFirstHome(true)}>해당</ToggleBtn>
                <ToggleBtn active={!firstHome} onClick={() => setFirstHome(false)}>해당 없음</ToggleBtn>
              </div>
              {firstHome && price <= 1200000000 && (
                <div style={{ fontSize: "12px", color: "#15803D", marginTop: "8px" }}>12억 이하 — 취득세 최대 200만원 감면 적용</div>
              )}
              {firstHome && price > 1200000000 && (
                <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: "8px" }}>12억 초과 — 생애최초 감면 미적용</div>
              )}
            </div>

            {/* 단지 세대수 */}
            <div>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "10px" }}>
                단지 세대수 <span style={{ fontWeight: 400, color: "#94A3B8", fontSize: "12px" }}>— 법무사 수수료 계산용</span>
              </label>
              <input
                type="number" value={units} min={1} max={5000}
                onChange={(e) => setUnits(Math.max(1, parseInt(e.target.value) || 1))}
                className="form-input"
                style={{ fontSize: "13px" }}
              />
              <div style={{ fontSize: "12px", color: "#64748B", marginTop: "6px" }}>
                세대당 {feePerUnit}만원 수수료 적용
                {units >= 200 ? " (200세대 이상 할인)" : units >= 100 ? " (100세대 이상 할인)" : ""}
              </div>
            </div>
          </div>

          {/* ── 결과 패널 ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* 세금 내역 */}
            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0D1117", letterSpacing: "-0.01em", marginBottom: "4px" }}>세금 내역</h2>
              <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "16px" }}>취득세율 {result.rateLabel} 적용</p>

              <Row label="취득세" value={result.acquisitionTax}
                sub={firstHome && price <= 1200000000 ? "생애최초 감면 적용 (최대 200만원)" : undefined} />
              <Row label="지방교육세" value={result.localEducationTax} sub="취득세의 10%" muted />
              <Row
                label="농어촌특별세"
                value={area === "under85" ? "비과세" : result.ruralSpecialTax}
                sub={area === "under85" ? "85㎡ 이하 — 면제" : "취득세의 20%"}
                muted={area === "under85"}
              />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", marginTop: "4px", background: "#F5F6F8", borderRadius: "6px", paddingLeft: "12px", paddingRight: "12px" }}>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#0D1117" }}>세금 합계</span>
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#0D1117" }}>{formatKrw(result.totalTax)}</span>
              </div>
            </div>

            {/* 기타 비용 */}
            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "24px" }}>
              <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0D1117", letterSpacing: "-0.01em", marginBottom: "16px" }}>기타 비용</h2>
              <Row label="국민주택채권 매입" value={result.bondPurchase} sub="집단등기 20% 할인 적용" muted />
              <Row label="법무법인 수수료" value={result.lawFirmFee} sub={`세대당 ${feePerUnit}만원 × ${units.toLocaleString()}세대`} muted />
            </div>

            {/* 총합 */}
            <div style={{ background: "#1B2A3A", borderRadius: "8px", padding: "24px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "8px", letterSpacing: "0.02em", fontWeight: 600 }}>예상 총 비용</div>
              <div style={{ fontSize: "32px", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>{formatKrw(result.grandTotal)}</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "8px" }}>세금 + 국민주택채권 + 법무법인 수수료 합계</div>
            </div>

            {/* 안내 */}
            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "16px 18px" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#64748B", marginBottom: "8px" }}>유의사항</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                {["계산 결과는 참고용이며 실제 금액과 다를 수 있습니다.", "지방자치단체별 추가 감면 혜택이 있을 수 있습니다.", "정확한 비용은 전문가 상담을 통해 확인하세요."].map((t, i) => (
                  <li key={i} style={{ fontSize: "12px", color: "#94A3B8", display: "flex", gap: "6px" }}>
                    <span style={{ color: "#CBD5E1", flexShrink: 0 }}>·</span>{t}
                  </li>
                ))}
              </ul>
            </div>

            <a href="tel:032-251-1000" style={{ display: "block", textAlign: "center", padding: "13px 0", background: "#fff", border: "1.5px solid #1B2A3A", borderRadius: "6px", fontSize: "14px", fontWeight: 700, color: "#1B2A3A", textDecoration: "none", letterSpacing: "-0.01em" }}>
              전문가 상담 · 032-251-1000
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .calc-grid { grid-template-columns: 1fr !important; }
        }
        input[type=range] { -webkit-appearance: none; appearance: none; background: #E2E8F0; border-radius: 2px; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #1B2A3A; cursor: pointer; border: 2px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
        input[type=range]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #1B2A3A; cursor: pointer; border: 2px solid #fff; }
      `}</style>
    </div>
  );
}
