"use client";

import { useState } from "react";
import Link from "next/link";

interface District {
  id: number;
  name: string;
  units: number;
  region: string;
  lawyer: string;
  progress: number;
  status: "진행중" | "완료" | "준비중";
  moveIn: string;
}

const initialDistricts: District[] = [
  { id: 1, name: "광명 자이 더샵", units: 3344, region: "경기 광명시", lawyer: "이현준", progress: 68, status: "진행중", moveIn: "2026-08" },
  { id: 2, name: "호반써밋동탄", units: 1842, region: "경기 화성시", lawyer: "박성민", progress: 45, status: "진행중", moveIn: "2026-10" },
  { id: 3, name: "힐스테이트 인천시청역", units: 956, region: "인천 남동구", lawyer: "이현준", progress: 82, status: "진행중", moveIn: "2026-06" },
  { id: 4, name: "e편한세상 부천", units: 1056, region: "경기 부천시", lawyer: "이현준", progress: 100, status: "완료", moveIn: "2025-12" },
  { id: 5, name: "힐스테이트 동탄 포레스트", units: 792, region: "경기 화성시", lawyer: "박성민", progress: 30, status: "진행중", moveIn: "2027-02" },
  { id: 6, name: "송도 더샵 그린스퀘어", units: 888, region: "인천 연수구", lawyer: "박성민", progress: 55, status: "진행중", moveIn: "2026-09" },
  { id: 7, name: "e편한세상 인천어천", units: 728, region: "인천 서구", lawyer: "이현준", progress: 20, status: "준비중", moveIn: "2027-04" },
  { id: 8, name: "더샵 인천부평역 센트럴", units: 1134, region: "인천 부평구", lawyer: "박성민", progress: 75, status: "진행중", moveIn: "2026-07" },
  { id: 9, name: "자이 강동 센트럴파크", units: 684, region: "서울 강동구", lawyer: "이현준", progress: 100, status: "완료", moveIn: "2025-11" },
  { id: 10, name: "래미안 원펜타스", units: 292, region: "서울 서초구", lawyer: "박성민", progress: 90, status: "진행중", moveIn: "2026-05" },
  { id: 11, name: "디에이치 방배", units: 3080, region: "서울 서초구", lawyer: "이현준", progress: 15, status: "준비중", moveIn: "2027-06" },
  { id: 12, name: "올림픽파크 포레온", units: 6702, region: "서울 송파구", lawyer: "박성민", progress: 40, status: "진행중", moveIn: "2026-11" },
];

const statusStyle = (status: string): React.CSSProperties => {
  if (status === "진행중") return { border: "1px solid #1d4ed8", color: "#1d4ed8", background: "transparent" };
  if (status === "완료") return { border: "1px solid #166534", color: "#166534", background: "transparent" };
  if (status === "준비중") return { border: "1px solid #6b7280", color: "#6b7280", background: "transparent" };
  return {};
};

interface NewDistrictForm {
  name: string;
  units: string;
  region: string;
  lawyer: string;
  moveIn: string;
}

export default function DistrictsPage() {
  const [districts, setDistricts] = useState<District[]>(initialDistricts);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editProgress, setEditProgress] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [newForm, setNewForm] = useState<NewDistrictForm>({
    name: "", units: "", region: "", lawyer: "이현준", moveIn: ""
  });

  const startEdit = (d: District) => {
    setEditingId(d.id);
    setEditProgress(d.progress);
  };

  const saveProgress = (id: number) => {
    setDistricts((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, progress: editProgress, status: editProgress === 100 ? "완료" : editProgress === 0 ? "준비중" : "진행중" }
          : d
      )
    );
    setEditingId(null);
  };

  const handleAddDistrict = () => {
    const newD: District = {
      id: districts.length + 1,
      name: newForm.name,
      units: parseInt(newForm.units) || 0,
      region: newForm.region,
      lawyer: newForm.lawyer,
      progress: 0,
      status: "준비중",
      moveIn: newForm.moveIn,
    };
    setDistricts((prev) => [...prev, newD]);
    setShowModal(false);
    setNewForm({ name: "", units: "", region: "", lawyer: "이현준", moveIn: "" });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1f2937", margin: "0 0 4px" }}>단지 관리</h2>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>담당 단지 현황 및 진행률을 관리합니다. 총 {districts.length}개 단지</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "10px 20px",
            background: "#2C3E50",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          + 새 단지 추가
        </button>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.07)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              {["단지명", "세대수", "지역", "담당변호사", "진행률", "상태", "입주예정", "액션"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: "700", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e5e7eb" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {districts.map((d, i) => (
              <tr key={d.id} style={{ borderBottom: i < districts.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                <td style={{ padding: "14px 16px" }}><Link href={`/admin/districts/${d.id}`} style={{ fontSize: "13px", fontWeight: "600", color: "#1B2A3A", textDecoration: "none" }}>{d.name}</Link></td>
                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#6b7280" }}>{d.units.toLocaleString()}</td>
                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#374151" }}>{d.region}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    padding: "3px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    background: d.lawyer === "이현준" ? "#ede9fe" : "#e0f2fe",
                    color: d.lawyer === "이현준" ? "#5b21b6" : "#0369a1",
                  }}>
                    {d.lawyer}
                  </span>
                </td>
                <td style={{ padding: "14px 16px", minWidth: "160px" }}>
                  {editingId === d.id ? (
                    <div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={editProgress}
                        onChange={(e) => setEditProgress(parseInt(e.target.value))}
                        style={{ width: "100px", marginRight: "8px", accentColor: "#1B2A3A" }}
                      />
                      <span style={{ fontSize: "13px", fontWeight: "700", color: "#2C3E50" }}>{editProgress}%</span>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <div style={{ flex: 1, height: "6px", background: "#f3f4f6", borderRadius: "3px", overflow: "hidden", minWidth: "80px" }}>
                          <div style={{
                            height: "100%",
                            width: `${d.progress}%`,
                            background: d.progress === 100 ? "#10b981" : "linear-gradient(90deg, #2C3E50, #1B2A3A)",
                            borderRadius: "3px",
                          }} />
                        </div>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: d.progress === 100 ? "#10b981" : "#2C3E50" }}>
                          {d.progress}%
                        </span>
                      </div>
                    </div>
                  )}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", ...statusStyle(d.status) }}>
                    {d.status}
                  </span>
                </td>
                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#6b7280" }}>{d.moveIn}</td>
                <td style={{ padding: "14px 16px" }}>
                  {editingId === d.id ? (
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button onClick={() => saveProgress(d.id)} style={{ padding: "5px 10px", background: "#10b981", color: "#fff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                        저장
                      </button>
                      <button onClick={() => setEditingId(null)} style={{ padding: "5px 10px", background: "#f3f4f6", color: "#6b7280", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>
                        취소
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => startEdit(d)} style={{ padding: "5px 12px", background: "transparent", color: "#2C3E50", border: "1px solid #2C3E50", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                      진행률 수정
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 새 단지 추가 모달 */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 200,
        }}>
          <div style={{
            background: "#fff", borderRadius: "16px", padding: "32px",
            width: "480px", maxWidth: "90vw", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1f2937", margin: "0 0 24px" }}>새 단지 추가</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "단지명", key: "name", placeholder: "예) 광명 자이 더샵" },
                { label: "세대수", key: "units", placeholder: "예) 3344" },
                { label: "지역", key: "region", placeholder: "예) 경기 광명시" },
                { label: "입주예정월", key: "moveIn", placeholder: "예) 2027-06" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px" }}>{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={(newForm as unknown as Record<string, string>)[key]}
                    onChange={(e) => setNewForm((prev) => ({ ...prev, [key]: e.target.value }))}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px" }}>담당변호사</label>
                <select
                  value={newForm.lawyer}
                  onChange={(e) => setNewForm((prev) => ({ ...prev, lawyer: e.target.value }))}
                  style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none" }}
                >
                  <option>이현준</option>
                  <option>박성민</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button
                onClick={handleAddDistrict}
                disabled={!newForm.name}
                style={{ flex: 1, padding: "12px", background: "#2C3E50", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
              >
                추가하기
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{ flex: 1, padding: "12px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
