"use client";

import { useState, useCallback } from "react";

function formatWon(n: number): string {
  if (n >= 100000000) {
    const eok = Math.floor(n / 100000000);
    const man = Math.floor((n % 100000000) / 10000);
    if (man > 0) return `${eok}억 ${man.toLocaleString()}만원`;
    return `${eok}억원`;
  }
  if (n >= 10000) {
    return `${Math.floor(n / 10000).toLocaleString()}만원`;
  }
  return `${n.toLocaleString()}원`;
}

function formatKrw(n: number): string {
  return `${Math.round(n).toLocaleString()}원`;
}

interface CalcResult {
  acquisitionTax: number;
  localEducationTax: number;
  ruralSpecialTax: number;
  bondPurchase: number;
  lawFirmFee: number;
  totalTax: number;
  grandTotal: number;
}

function calculateTax(params: {
  price: number;
  area: "under85" | "over85";
  firstHome: boolean;
  units: number;
}): CalcResult {
  const { price, area, firstHome, units } = params;

  // 취득세율 계산
  let acquisitionRate: number;
  if (price <= 600000000) {
    acquisitionRate = 0.01;
  } else if (price <= 900000000) {
    // 실제 공식: 취득세율 = (취득가 × 2 / 300,000,000 - 3) / 100
    acquisitionRate = (price * 2 / 300000000 - 3) / 100;
  } else {
    acquisitionRate = 0.03;
  }

  let acquisitionTax = price * acquisitionRate;

  // 생애최초 감면 (12억 이하, 200만원 한도)
  if (firstHome && price <= 1200000000) {
    const reduction = Math.min(acquisitionTax, 2000000);
    acquisitionTax = acquisitionTax - reduction;
  }

  // 지방교육세: 취득세의 10%
  const localEducationTax = acquisitionTax * 0.1;

  // 농어촌특별세: 취득세의 20% (단, 85㎡ 이하 비과세)
  const ruralSpecialTax = area === "over85" ? acquisitionTax * 0.2 : 0;

  // 국민주택채권 매입
  // 채권최고액 = 취득가 × 120%, 집단등기 할인 적용
  const bondBase = price * 1.2 * 0.002; // 0.2%
  const bondPurchase = bondBase * 0.8; // 집단등기 20% 할인

  // 법무법인 수수료
  let lawFirmFeePerUnit: number;
  if (units < 100) {
    lawFirmFeePerUnit = 400000;
  } else if (units < 200) {
    lawFirmFeePerUnit = 320000;
  } else {
    lawFirmFeePerUnit = 250000;
  }
  const lawFirmFee = lawFirmFeePerUnit * Math.max(1, units);

  const totalTax = acquisitionTax + localEducationTax + ruralSpecialTax;
  const grandTotal = totalTax + bondPurchase + lawFirmFee;

  return {
    acquisitionTax,
    localEducationTax,
    ruralSpecialTax,
    bondPurchase,
    lawFirmFee,
    totalTax,
    grandTotal,
  };
}

export default function CalculatorPage() {
  const [price, setPrice] = useState(500000000);
  const [priceInput, setPriceInput] = useState("500000000");
  const [area, setArea] = useState<"under85" | "over85">("under85");
  const [firstHome, setFirstHome] = useState(false);
  const [units, setUnits] = useState(100);

  const result = calculateTax({ price, area, firstHome, units });

  const handleSlider = useCallback((v: number) => {
    setPrice(v);
    setPriceInput(String(v));
  }, []);

  const handlePriceInput = useCallback((v: string) => {
    const raw = v.replace(/[^0-9]/g, "");
    setPriceInput(raw);
    const num = parseInt(raw, 10);
    if (!isNaN(num) && num >= 100000000 && num <= 3000000000) {
      setPrice(num);
    }
  }, []);

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#2C3E50" }}>취득세 계산기</h1>
          <p className="text-gray-500">집단등기 비용을 실시간으로 계산해보세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 입력 패널 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-6" style={{ color: "#2C3E50" }}>입력 정보</h2>

            {/* 취득가 슬라이더 */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                취득가액 <span className="font-bold" style={{ color: "#2C3E50" }}>{formatWon(price)}</span>
              </label>
              <input
                type="range"
                min={100000000}
                max={3000000000}
                step={10000000}
                value={price}
                onChange={(e) => handleSlider(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer mb-3"
                style={{ accentColor: "#2C3E50" }}
              />
              <div className="flex justify-between text-xs text-gray-400 mb-3">
                <span>1억</span>
                <span>30억</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={priceInput}
                  onChange={(e) => handlePriceInput(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                  style={{ "--tw-ring-color": "#2C3E50" } as React.CSSProperties}
                  placeholder="직접 입력 (원)"
                />
                <span className="text-sm text-gray-500 whitespace-nowrap">원</span>
              </div>
            </div>

            {/* 전용면적 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">전용면적</label>
              <div className="flex gap-3">
                {[
                  { value: "under85", label: "85㎡ 이하" },
                  { value: "over85", label: "85㎡ 초과" },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer flex-1">
                    <input
                      type="radio"
                      value={opt.value}
                      checked={area === opt.value}
                      onChange={() => setArea(opt.value as "under85" | "over85")}
                      className="w-4 h-4"
                      style={{ accentColor: "#2C3E50" }}
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
              {area === "under85" && (
                <p className="text-xs text-green-600 mt-1.5">✓ 85㎡ 이하: 농어촌특별세 비과세</p>
              )}
            </div>

            {/* 생애최초 */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={firstHome}
                  onChange={(e) => setFirstHome(e.target.checked)}
                  className="w-4 h-4"
                  style={{ accentColor: "#2C3E50" }}
                />
                <div>
                  <div className="text-sm font-semibold text-gray-700">생애최초 주택 구입</div>
                  <div className="text-xs text-gray-400">12억 이하 시 취득세 최대 200만원 감면</div>
                </div>
              </label>
            </div>

            {/* 세대수 */}
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                단지 세대수 <span className="text-xs text-gray-400 font-normal">(수수료 계산용)</span>
              </label>
              <input
                type="number"
                value={units}
                min={1}
                max={5000}
                onChange={(e) => setUnits(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": "#2C3E50" } as React.CSSProperties}
              />
              <p className="text-xs text-gray-400 mt-1">
                {units < 100 ? "세대당 40만원" : units < 200 ? "세대당 32만원" : "세대당 25만원"} 수수료 적용
              </p>
            </div>
          </div>

          {/* 결과 패널 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-6" style={{ color: "#2C3E50" }}>계산 결과</h2>

            <div className="space-y-3 mb-6">
              <ResultRow label="취득세" value={result.acquisitionTax}
                sub={firstHome && price <= 1200000000 ? "생애최초 감면 적용" : undefined} />
              <ResultRow label="지방교육세" value={result.localEducationTax} sub="취득세의 10%" />
              <ResultRow label="농어촌특별세" value={result.ruralSpecialTax}
                sub={area === "under85" ? "85㎡ 이하 비과세" : "취득세의 20%"} green={area === "under85"} />

              <div className="border-t border-gray-100 pt-3">
                <ResultRow label="세금 합계" value={result.totalTax} bold />
              </div>

              <ResultRow label="국민주택채권 매입" value={result.bondPurchase} sub="집단등기 20% 할인 적용" />
              <ResultRow label="법무법인 수수료" value={result.lawFirmFee}
                sub={`${units < 100 ? 40 : units < 200 ? 32 : 25}만원 × ${units.toLocaleString()}세대`} />
            </div>

            <div className="rounded-xl p-5 text-center" style={{ backgroundColor: "#2C3E50" }}>
              <div className="text-gray-300 text-sm mb-1">예상 총 비용</div>
              <div className="text-3xl font-bold text-white">{formatKrw(result.grandTotal)}</div>
              <div className="text-xs text-gray-400 mt-1">* 세금 + 채권 + 법무법인 수수료 합계</div>
            </div>

            <div className="mt-4 p-4 rounded-xl text-xs text-gray-500 space-y-1"
              style={{ backgroundColor: "#F8F9FA" }}>
              <p className="font-semibold text-gray-600 mb-2">⚠️ 안내사항</p>
              <p>• 계산 결과는 참고용이며 실제 금액과 다를 수 있습니다.</p>
              <p>• 지방자치단체별 감면 혜택이 다를 수 있습니다.</p>
              <p>• 정확한 비용은 전문가 상담을 통해 확인하세요.</p>
            </div>

            <a
              href="tel:032-251-1000"
              className="mt-4 block text-center py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: "#1B2A3A", color: "#fff" }}
            >
              전문가 상담 받기 (032-251-1000)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  sub,
  bold,
  green,
}: {
  label: string;
  value: number;
  sub?: string;
  bold?: boolean;
  green?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex-1">
        <span className={`text-sm ${bold ? "font-bold" : "text-gray-600"}`}>{label}</span>
        {sub && (
          <p className={`text-xs mt-0.5 ${green ? "text-green-600" : "text-gray-400"}`}>{sub}</p>
        )}
      </div>
      <div className={`text-sm text-right ${bold ? "font-bold" : ""} ${green && value === 0 ? "text-green-600" : ""}`}
        style={{ color: bold && !green ? "#2C3E50" : undefined }}>
        {value === 0 && green ? "비과세" : `${Math.round(value).toLocaleString()}원`}
      </div>
    </div>
  );
}
