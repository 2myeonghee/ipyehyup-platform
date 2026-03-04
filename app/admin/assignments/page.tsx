"use client";

import { useState } from "react";

interface District {
  id: number;
  name: string;
  units: number;
  region: string;
  progress: number;
  status: string;
  lawyer: string | null;
}

const initialDistricts: District[] = [
  { id: 1, name: "광명 자이 더샵", units: 3344, region: "경기 광명시", progress: 68, status: "진행중", lawyer: "이현준" },
  { id: 2, name: "호반써밋동탄", units: 1842, region: "경기 화성시", progress: 45, status: "진행중", lawyer: "박성민" },
  { id: 3, name: "힐스테이트 인천시청역", units: 956, region: "인천 남동구", progress: 82, status: "진행중", lawyer: "이현준" },
  { id: 4, name: "e편한세상 부천", units: 1056, region: "경기 부천시", progress: 100, status: "완료", lawyer: "이현준" },
  { id: 5, name: "힐스테이트 동탄 포레스트", units: 792, region: "경기 화성시", progress: 30, status: "진행중", lawyer: "박성민" },
  { id: 6, name: "송도 더샵 그린스퀘어", units: 888, region: "인천 연수구", progress: 55, status: "진행중", lawyer: "박성민" },
  { id: 7, name: "e편한세상 인천어천", units: 728, region: "인천 서구", progress: 20, status: "준비중", lawyer: "이현준" },
  { id: 8, name: "더샵 인천부평역 센트럴", units: 1134, region: "인천 부평구", progress: 75, status: "진행중", lawyer: "박성민" },
  { id: 9, name: "자이 강동 센트럴파크", units: 684, region: "서울 강동구", progress: 100, status: "완료", lawyer: "이현준" },
  { id: 10, name: "래미안 원펜타스", units: 292, region: "서울 서초구", progress: 90, status: "진행중", lawyer: "박성민" },
  { id: 11, name: "디에이치 방배", units: 3080, region: "서울 서초구", progress: 15, status: "준비중", lawyer: "이현준" },
  { id: 12, name: "올림픽파크 포레온", units: 6702, region: "서울 송파구", progress: 40, status: "진행중", lawyer: null },
];

const lawyers = [
  {
    name: "이현준",
    title: "수석 변호사",
    email: "hyeonjun.lee@lawfirmthe-h.com",
    phone: "02-1234-5678",
    speciality: "부동산 등기 전문",
    avatar: "이",
    color: "#5b21b6",
    bg: "#ede9fe",
  },
  {
    name: "박성민",
    title: "선임 변호사",
    email: "seongmin.park@lawfirmthe-h.com",
    phone: "02-1234-5679",
    speciality: "집단등기 전문",
    avatar: "박",
    color: "#0369a1",
    bg: "#e0f2fe",
  },
];

const statusStyle = (status: string): React.CSSProperties => {
  if (status === "진행중") return { background: "#dbeafe", color: "#1d4ed8" };
  if (status === "완료") return { background: "#dcfce7", color: "#166534" };
  if (status === "준비중") return { background: "#f3f4f6", color: "#6b7280" };
  return {};
};

export default function AssignmentsPage() {
  const [districts, setDistricts] = useState<District[]>(initialDistricts);
  const [pendingAssign, setPendingAssign] = useState<Record<number, string>>({});

  const getLawyerDistricts = (lawyerName: string) =>
    districts.filter((d) => d.lawyer === lawyerName);

  const getUnassigned = () => districts.filter((d) => !d.lawyer);

  const handleAssign = (districtId: number) => {
    const selectedLawyer = pendingAssign[districtId];
    if (!selectedLawyer) return;
    setDistricts((prev) =>
      prev.map((d) => (d.id === districtId ? { ...d, lawyer: selectedLawyer } : d))
    );
    setPendingAssign((prev) => {
      const next = { ...prev };
      delete next[districtId];
      return next;
    });
  };

  const handleUnassign = (districtId: number) => {
    setDistricts((prev) =>
      prev.map((d) => (d.id === districtId ? { ...d, lawyer: null } : d))
    );
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1f2937", margin: "0 0 4px" }}>변호사 배정</h2>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>단지별 담당 변호사를 배정하고 업무량을 관리합니다.</p>
      </div>

      {/* 변호사 업무량 카드 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
        {lawyers.map((lawyer) => {
          const myDistricts = getLawyerDistricts(lawyer.name);
          const totalUnits = myDistricts.reduce((sum, d) => sum + d.units, 0);
          const activeCount = myDistricts.filter((d) => d.status === "진행중").length;
          return (
            <div key={lawyer.name} style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
              border: `2px solid ${lawyer.bg}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: lawyer.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: "700",
                }}>
                  {lawyer.avatar}
                </div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "700", color: "#1f2937" }}>{lawyer.name} 변호사</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>{lawyer.title} · {lawyer.speciality}</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {[
                  { label: "담당 단지", value: `${myDistricts.length}개` },
                  { label: "진행중", value: `${activeCount}개` },
                  { label: "총 세대수", value: `${totalUnits.toLocaleString()}` },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    background: lawyer.bg,
                    borderRadius: "8px",
                    padding: "10px 12px",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: lawyer.color }}>{value}</div>
                    <div style={{ fontSize: "11px", color: lawyer.color, opacity: 0.8, marginTop: "2px" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 미배정 단지 */}
      {getUnassigned().length > 0 && (
        <div style={{
          background: "#fffbeb",
          border: "1px solid #fde68a",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "24px",
        }}>
          <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#92400e", margin: "0 0 12px" }}>
            ⚠️ 미배정 단지 ({getUnassigned().length}개)
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {getUnassigned().map((d) => (
              <div key={d.id} style={{
                background: "#fff",
                borderRadius: "8px",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <div>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#1f2937" }}>{d.name}</span>
                  <span style={{ fontSize: "12px", color: "#6b7280", marginLeft: "12px" }}>{d.region} · {d.units.toLocaleString()}세대</span>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <select
                    value={pendingAssign[d.id] ?? ""}
                    onChange={(e) => setPendingAssign((prev) => ({ ...prev, [d.id]: e.target.value }))}
                    style={{ padding: "6px 10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "13px", outline: "none" }}
                  >
                    <option value="">변호사 선택</option>
                    <option>이현준</option>
                    <option>박성민</option>
                  </select>
                  <button
                    onClick={() => handleAssign(d.id)}
                    disabled={!pendingAssign[d.id]}
                    style={{
                      padding: "6px 14px",
                      background: pendingAssign[d.id] ? "#2C3E50" : "#e5e7eb",
                      color: pendingAssign[d.id] ? "#fff" : "#9ca3af",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: pendingAssign[d.id] ? "pointer" : "not-allowed",
                    }}
                  >
                    배정
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 전체 배정 현황 테이블 */}
      <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.07)", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#1f2937", margin: 0 }}>전체 단지 배정 현황</h3>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              {["단지명", "지역", "세대수", "진행률", "상태", "담당변호사", "액션"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: "700", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e5e7eb" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {districts.map((d, i) => (
              <tr key={d.id} style={{ borderBottom: i < districts.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                <td style={{ padding: "13px 16px", fontSize: "13px", fontWeight: "600", color: "#1f2937" }}>{d.name}</td>
                <td style={{ padding: "13px 16px", fontSize: "13px", color: "#6b7280" }}>{d.region}</td>
                <td style={{ padding: "13px 16px", fontSize: "13px", color: "#6b7280" }}>{d.units.toLocaleString()}</td>
                <td style={{ padding: "13px 16px", minWidth: "100px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ flex: 1, height: "6px", background: "#f3f4f6", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{
                        height: "100%",
                        width: `${d.progress}%`,
                        background: d.progress === 100 ? "#10b981" : "linear-gradient(90deg, #2C3E50, #C9A84C)",
                        borderRadius: "3px",
                      }} />
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: "700", color: "#374151", minWidth: "28px" }}>{d.progress}%</span>
                  </div>
                </td>
                <td style={{ padding: "13px 16px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", ...statusStyle(d.status) }}>
                    {d.status}
                  </span>
                </td>
                <td style={{ padding: "13px 16px" }}>
                  {d.lawyer ? (
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600",
                      background: d.lawyer === "이현준" ? "#ede9fe" : "#e0f2fe",
                      color: d.lawyer === "이현준" ? "#5b21b6" : "#0369a1",
                    }}>
                      👨‍⚖️ {d.lawyer}
                    </span>
                  ) : (
                    <span style={{ fontSize: "12px", color: "#f59e0b", fontWeight: "600" }}>⚠️ 미배정</span>
                  )}
                </td>
                <td style={{ padding: "13px 16px" }}>
                  {d.lawyer ? (
                    <button
                      onClick={() => handleUnassign(d.id)}
                      style={{
                        padding: "5px 10px",
                        background: "transparent",
                        color: "#9ca3af",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      배정 해제
                    </button>
                  ) : (
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <select
                        value={pendingAssign[d.id] ?? ""}
                        onChange={(e) => setPendingAssign((prev) => ({ ...prev, [d.id]: e.target.value }))}
                        style={{ padding: "5px 8px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "12px", outline: "none" }}
                      >
                        <option value="">선택</option>
                        <option>이현준</option>
                        <option>박성민</option>
                      </select>
                      <button
                        onClick={() => handleAssign(d.id)}
                        disabled={!pendingAssign[d.id]}
                        style={{
                          padding: "5px 10px",
                          background: pendingAssign[d.id] ? "#2C3E50" : "#e5e7eb",
                          color: pendingAssign[d.id] ? "#fff" : "#9ca3af",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: pendingAssign[d.id] ? "pointer" : "not-allowed",
                        }}
                      >
                        배정
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
