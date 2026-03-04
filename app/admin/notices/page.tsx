"use client";

import { useState } from "react";

const districts = [
  "광명 자이 더샵",
  "호반써밋동탄",
  "힐스테이트 인천시청역",
  "e편한세상 부천",
  "힐스테이트 동탄 포레스트",
  "송도 더샵 그린스퀘어",
  "e편한세상 인천어천",
  "더샵 인천부평역 센트럴",
  "자이 강동 센트럴파크",
  "래미안 원펜타스",
  "디에이치 방배",
  "올림픽파크 포레온",
];

type Priority = "일반" | "중요" | "긴급";

interface Notice {
  id: number;
  title: string;
  content: string;
  priority: Priority;
  date: string;
  district: string;
}

const sampleNotices: Notice[] = [
  {
    id: 1,
    title: "등기 서류 제출 안내 (3월 마감)",
    content: "오는 3월 31일까지 잔금 영수증 및 주민등록등본을 제출해 주시기 바랍니다. 미제출 시 진행이 지연될 수 있습니다.",
    priority: "긴급",
    date: "2026-03-01",
    district: "광명 자이 더샵",
  },
  {
    id: 2,
    title: "2차 입주민 설명회 일정 공지",
    content: "2026년 3월 15일 오후 2시, 단지 내 커뮤니티센터에서 집단등기 진행 설명회가 개최됩니다.",
    priority: "중요",
    date: "2026-02-25",
    district: "광명 자이 더샵",
  },
  {
    id: 3,
    title: "담당 법무사 변경 안내",
    content: "본 단지 담당 법무사가 변경되었습니다. 문의사항은 사무소 대표번호로 연락 바랍니다.",
    priority: "일반",
    date: "2026-02-20",
    district: "광명 자이 더샵",
  },
];

const priorityStyle = (p: Priority): React.CSSProperties => {
  if (p === "긴급") return { border: "1px solid #dc2626", color: "#dc2626", background: "transparent" };
  if (p === "중요") return { border: "1px solid #ca8a04", color: "#ca8a04", background: "transparent" };
  return { border: "1px solid #6b7280", color: "#6b7280", background: "transparent" };
};

export default function NoticesPage() {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [notices, setNotices] = useState<Notice[]>(sampleNotices);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("일반");

  const districtNotices = notices.filter((n) => n.district === selectedDistrict);

  const handleAddNotice = () => {
    if (!newTitle.trim()) return;
    const newNotice: Notice = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
      priority: newPriority,
      date: new Date().toISOString().split("T")[0],
      district: selectedDistrict,
    };
    setNotices((prev) => [newNotice, ...prev]);
    setNewTitle("");
    setNewContent("");
    setNewPriority("일반");
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("이 공지를 삭제하시겠습니까?")) {
      setNotices((prev) => prev.filter((n) => n.id !== id));
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1f2937", margin: "0 0 4px" }}>공지 관리</h2>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>단지별 공지사항을 등록하고 관리합니다.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "20px" }}>
        {/* 왼쪽: 단지 선택 */}
        <div>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}>
            <h3 style={{ fontSize: "13px", fontWeight: "700", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px" }}>
              단지 선택
            </h3>
            {districts.map((d) => {
              const count = notices.filter((n) => n.district === d).length;
              return (
                <button
                  key={d}
                  onClick={() => setSelectedDistrict(d)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    padding: "10px 12px",
                    marginBottom: "4px",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "13px",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.1s",
                    ...(selectedDistrict === d
                      ? { background: "rgba(44,62,80,0.08)", color: "#2C3E50", fontWeight: "600", borderLeft: "3px solid #fff" }
                      : { background: "transparent", color: "#374151", fontWeight: "400" }),
                  }}
                >
                  <span>{d}</span>
                  {count > 0 && (
                    <span style={{
                      padding: "1px 7px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "700",
                      background: selectedDistrict === d ? "#1B2A3A" : "#f3f4f6",
                      color: selectedDistrict === d ? "#fff" : "#6b7280",
                    }}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 오른쪽: 공지 목록 + 작성 */}
        <div>
          {/* 공지 작성 버튼 / 폼 */}
          {!showForm ? (
            <div style={{ marginBottom: "16px" }}>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  padding: "10px 20px",
                  background: "#2C3E50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                + 새 공지 작성
              </button>
            </div>
          ) : (
            <div style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
              border: "2px solid #1B2A3A",
            }}>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1f2937", margin: "0 0 16px" }}>
                새 공지 작성 — {selectedDistrict}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px" }}>제목</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="공지 제목을 입력하세요"
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px" }}>내용</label>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="공지 내용을 입력하세요"
                    rows={4}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box", resize: "vertical" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "6px" }}>중요도</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {(["일반", "중요", "긴급"] as Priority[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => setNewPriority(p)}
                        style={{
                          padding: "6px 16px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "600",
                          cursor: "pointer",
                          border: "1px solid",
                          transition: "all 0.15s",
                          ...(newPriority === p ? priorityStyle(p) : { background: "#fff", color: "#6b7280", borderColor: "#e5e7eb" }),
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                <button
                  onClick={handleAddNotice}
                  disabled={!newTitle.trim()}
                  style={{ padding: "10px 20px", background: "#2C3E50", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
                >
                  등록
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  style={{ padding: "10px 20px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}
                >
                  취소
                </button>
              </div>
            </div>
          )}

          {/* 공지 목록 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {districtNotices.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: "12px", padding: "40px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}>
                <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>이 단지에 등록된 공지가 없습니다.</p>
              </div>
            ) : (
              districtNotices.map((notice) => (
                <div key={notice.id} style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
                  borderLeft: `4px solid ${notice.priority === "긴급" ? "#dc2626" : notice.priority === "중요" ? "#f59e0b" : "#e5e7eb"}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", ...priorityStyle(notice.priority) }}>
                        {notice.priority}
                      </span>
                      <h4 style={{ fontSize: "15px", fontWeight: "600", color: "#1f2937", margin: 0 }}>{notice.title}</h4>
                    </div>
                    <button
                      onClick={() => handleDelete(notice.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: "0", display: "flex" }}
                      title="삭제"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6" /><path d="M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </div>
                  <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 8px", lineHeight: "1.6" }}>{notice.content}</p>
                  <span style={{ fontSize: "12px", color: "#9ca3af" }}>작성일: {notice.date}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
