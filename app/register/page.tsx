"use client";

import { useState } from "react";
import Link from "next/link";

type Role = "회장" | "총무" | "임원" | "일반수분양자";
type Region = "서울" | "경기" | "인천" | "부산" | "대구" | "광주" | "대전" | "울산" | "세종" | "강원" | "충북" | "충남" | "전북" | "전남" | "경북" | "경남" | "제주";

interface Step1Data {
  name: string;
  phone: string;
  email: string;
  role: Role;
}

interface Step2Data {
  districtName: string;
  region: Region | "";
  totalUnits: string;
  moveInDate: string;
  inquiry: string;
}

const regions: Region[] = ["서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"];
const roles: Role[] = ["회장", "총무", "임원", "일반수분양자"];

function StepIndicator({ current }: { current: number }) {
  const steps = ["신청자 정보", "단지 정보", "접수 완료"];
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all"
              style={{
                backgroundColor: i < current ? "#22c55e" : i === current ? "#2C3E50" : "#e5e7eb",
                color: i <= current ? "white" : "#9ca3af",
              }}
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span className={`text-xs mt-1 ${i === current ? "font-semibold" : "text-gray-400"}`}
              style={{ color: i === current ? "#2C3E50" : undefined }}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-all"
              style={{ backgroundColor: i < current ? "#22c55e" : "#e5e7eb" }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [receiptNumber, setReceiptNumber] = useState("");
  const [errors1, setErrors1] = useState<Partial<Record<keyof Step1Data, string>>>({});
  const [errors2, setErrors2] = useState<Partial<Record<keyof Step2Data, string>>>({});

  const [step1, setStep1] = useState<Step1Data>({
    name: "",
    phone: "",
    email: "",
    role: "일반수분양자",
  });

  const [step2, setStep2] = useState<Step2Data>({
    districtName: "",
    region: "",
    totalUnits: "",
    moveInDate: "",
    inquiry: "",
  });

  const validateStep1 = (): boolean => {
    const errs: Partial<Record<keyof Step1Data, string>> = {};
    if (!step1.name.trim()) errs.name = "이름을 입력해주세요.";
    if (!step1.phone.trim()) errs.phone = "연락처를 입력해주세요.";
    else if (!/^01[0-9]-?\d{3,4}-?\d{4}$/.test(step1.phone.replace(/-/g, ""))) {
      errs.phone = "올바른 연락처 형식을 입력해주세요.";
    }
    if (!step1.email.trim()) errs.email = "이메일을 입력해주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step1.email)) {
      errs.email = "올바른 이메일 형식을 입력해주세요.";
    }
    setErrors1(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: Partial<Record<keyof Step2Data, string>> = {};
    if (!step2.districtName.trim()) errs.districtName = "단지명을 입력해주세요.";
    if (!step2.region) errs.region = "소재지를 선택해주세요.";
    if (!step2.totalUnits.trim()) errs.totalUnits = "총 세대수를 입력해주세요.";
    else if (isNaN(Number(step2.totalUnits)) || Number(step2.totalUnits) <= 0) {
      errs.totalUnits = "올바른 세대수를 입력해주세요.";
    }
    if (!step2.moveInDate) errs.moveInDate = "입주예정일을 입력해주세요.";
    setErrors2(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && validateStep1()) {
      setStep(1);
    }
  };

  const handleSubmit = () => {
    if (!validateStep2()) return;

    const receipt = String(Math.floor(10000 + Math.random() * 90000));
    const formData = { ...step1, ...step2, receiptNumber: receipt, submittedAt: new Date().toISOString() };
    console.log("[집단등기 신청 데이터]", formData);
    setReceiptNumber(receipt);
    setStep(2);
  };

  const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all";
  const ringStyle = { "--tw-ring-color": "#2C3E50" } as React.CSSProperties;
  const errorCls = "text-red-500 text-xs mt-1";

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#2C3E50" }}>집단등기 신청</h1>
          <p className="text-gray-500">입주예정자협의회 집단등기를 신청해주세요</p>
        </div>

        <StepIndicator current={step} />

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {/* Step 1: 신청자 정보 */}
          {step === 0 && (
            <div>
              <h2 className="font-bold text-lg mb-6" style={{ color: "#2C3E50" }}>신청자 정보</h2>

              <div className="space-y-5">
                {/* 이름 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={step1.name}
                    onChange={(e) => setStep1({ ...step1, name: e.target.value })}
                    className={`${inputCls} ${errors1.name ? "border-red-400" : ""}`}
                    style={ringStyle}
                    placeholder="홍길동"
                  />
                  {errors1.name && <p className={errorCls}>{errors1.name}</p>}
                </div>

                {/* 연락처 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={step1.phone}
                    onChange={(e) => setStep1({ ...step1, phone: e.target.value })}
                    className={`${inputCls} ${errors1.phone ? "border-red-400" : ""}`}
                    style={ringStyle}
                    placeholder="010-0000-0000"
                  />
                  {errors1.phone && <p className={errorCls}>{errors1.phone}</p>}
                </div>

                {/* 이메일 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={step1.email}
                    onChange={(e) => setStep1({ ...step1, email: e.target.value })}
                    className={`${inputCls} ${errors1.email ? "border-red-400" : ""}`}
                    style={ringStyle}
                    placeholder="example@email.com"
                  />
                  {errors1.email && <p className={errorCls}>{errors1.email}</p>}
                </div>

                {/* 역할 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    역할 <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {roles.map((r) => (
                      <label key={r} className="flex items-center gap-2 cursor-pointer border rounded-lg px-3 py-2.5 transition-all"
                        style={{
                          borderColor: step1.role === r ? "#2C3E50" : "#e5e7eb",
                          backgroundColor: step1.role === r ? "rgba(44,62,80,0.05)" : "transparent",
                        }}>
                        <input
                          type="radio"
                          value={r}
                          checked={step1.role === r}
                          onChange={() => setStep1({ ...step1, role: r })}
                          className="w-4 h-4"
                          style={{ accentColor: "#2C3E50" }}
                        />
                        <span className="text-sm font-medium">{r}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="mt-8 w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#2C3E50", color: "white" }}
              >
                다음 단계 →
              </button>
            </div>
          )}

          {/* Step 2: 단지 정보 */}
          {step === 1 && (
            <div>
              <h2 className="font-bold text-lg mb-6" style={{ color: "#2C3E50" }}>단지 정보</h2>

              <div className="space-y-5">
                {/* 단지명 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    단지명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={step2.districtName}
                    onChange={(e) => setStep2({ ...step2, districtName: e.target.value })}
                    className={`${inputCls} ${errors2.districtName ? "border-red-400" : ""}`}
                    style={ringStyle}
                    placeholder="예: 호반써밋 동탄"
                  />
                  {errors2.districtName && <p className={errorCls}>{errors2.districtName}</p>}
                </div>

                {/* 소재지 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    소재지 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={step2.region}
                    onChange={(e) => setStep2({ ...step2, region: e.target.value as Region })}
                    className={`${inputCls} ${errors2.region ? "border-red-400" : ""}`}
                    style={ringStyle}
                  >
                    <option value="">선택해주세요</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  {errors2.region && <p className={errorCls}>{errors2.region}</p>}
                </div>

                {/* 총 세대수 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    총 세대수 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={step2.totalUnits}
                    onChange={(e) => setStep2({ ...step2, totalUnits: e.target.value })}
                    className={`${inputCls} ${errors2.totalUnits ? "border-red-400" : ""}`}
                    style={ringStyle}
                    placeholder="예: 500"
                    min={1}
                  />
                  {errors2.totalUnits && <p className={errorCls}>{errors2.totalUnits}</p>}
                </div>

                {/* 입주예정일 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    입주예정일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={step2.moveInDate}
                    onChange={(e) => setStep2({ ...step2, moveInDate: e.target.value })}
                    className={`${inputCls} ${errors2.moveInDate ? "border-red-400" : ""}`}
                    style={ringStyle}
                  />
                  {errors2.moveInDate && <p className={errorCls}>{errors2.moveInDate}</p>}
                </div>

                {/* 문의사항 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">문의사항</label>
                  <textarea
                    value={step2.inquiry}
                    onChange={(e) => setStep2({ ...step2, inquiry: e.target.value })}
                    className={inputCls}
                    style={{ ...ringStyle, minHeight: "100px", resize: "vertical" }}
                    placeholder="궁금하신 사항을 자유롭게 작성해주세요."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setStep(0)}
                  className="flex-1 py-3.5 rounded-xl font-bold text-sm border-2 border-gray-300 transition-all hover:border-gray-400"
                >
                  ← 이전
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3.5 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: "#1B2A3A", color: "#fff" }}
                >
                  신청 완료
                </button>
              </div>
            </div>
          )}

          {/* Step 3: 완료 */}
          {step === 2 && (
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl"
                style={{ backgroundColor: "#22c55e" }}>
                ✓
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#2C3E50" }}>신청이 완료되었습니다!</h2>
              <p className="text-gray-500 mb-6">영업일 2일 내 담당자가 연락드립니다.</p>

              <div className="rounded-xl p-5 mb-6" style={{ backgroundColor: "#F8F9FA" }}>
                <p className="text-sm text-gray-500 mb-1">접수번호</p>
                <p className="text-3xl font-bold tracking-widest" style={{ color: "#2C3E50" }}>
                  {receiptNumber}
                </p>
              </div>

              <div className="text-sm text-gray-500 mb-8 text-left space-y-1 p-4 rounded-xl border border-gray-100">
                <p className="font-semibold text-gray-700 mb-2">신청자 정보</p>
                <p>이름: {step1.name} ({step1.role})</p>
                <p>연락처: {step1.phone}</p>
                <p>단지명: {step2.districtName} ({step2.region})</p>
                <p>총 세대수: {step2.totalUnits}세대</p>
              </div>

              <Link
                href="/"
                className="block py-3.5 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#2C3E50", color: "white" }}
              >
                홈으로 돌아가기
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
