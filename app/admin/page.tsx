"use client";

const recentApps = [
  { id: "APP-00028", name: "김민수", apt: "광명 자이 더샵", date: "2026-03-04", status: "검토중" },
  { id: "APP-00027", name: "이지영", apt: "호반써밋동탄", date: "2026-03-03", status: "승인" },
  { id: "APP-00026", name: "박현우", apt: "e편한세상 부천", date: "2026-03-02", status: "승인" },
  { id: "APP-00025", name: "최서연", apt: "힐스테이트 인천시청역", date: "2026-03-01", status: "검토중" },
  { id: "APP-00024", name: "정도현", apt: "광명 자이 더샵", date: "2026-02-28", status: "반려" },
];

const districtProgress = [
  { name: "광명 자이 더샵", progress: 68, status: "진행중" },
  { name: "호반써밋동탄", progress: 45, status: "진행중" },
  { name: "힐스테이트 인천시청역", progress: 82, status: "진행중" },
  { name: "e편한세상 부천", progress: 100, status: "완료" },
  { name: "힐스테이트 동탄 포레스트", progress: 30, status: "진행중" },
];

const recentActivity = [
  { time: "10분 전", text: "APP-00028 신청 접수 - 김민수 (광명 자이 더샵)", type: "new" },
  { time: "1시간 전", text: "APP-00027 승인 완료 - 이지영 (호반써밋동탄)", type: "approve" },
  { time: "2시간 전", text: "광명 자이 더샵 진행률 65% → 68% 업데이트", type: "update" },
  { time: "3시간 전", text: "APP-00026 승인 완료 - 박현우 (e편한세상 부천)", type: "approve" },
  { time: "어제", text: "힐스테이트 인천시청역 공지 등록", type: "notice" },
  { time: "어제", text: "APP-00024 반려 처리 - 정도현 (광명 자이 더샵)", type: "reject" },
];

const kpiCards = [
  { label: "총 신청건수", value: "28", icon: "📋", color: "#3b82f6", bg: "#eff6ff" },
  { label: "진행중 단지", value: "4", icon: "🏗️", color: "#f59e0b", bg: "#fffbeb" },
  { label: "완료 단지", value: "7", icon: "✅", color: "#10b981", bg: "#ecfdf5" },
  { label: "이번달 신청", value: "12", icon: "📅", color: "#8b5cf6", bg: "#f5f3ff" },
];

const statusStyle = (status: string) => {
  if (status === "검토중") return { background: "#fef9c3", color: "#854d0e", border: "1px solid #fde047" };
  if (status === "승인") return { background: "#dcfce7", color: "#166534", border: "1px solid #86efac" };
  if (status === "반려") return { background: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5" };
  return {};
};

export default function AdminDashboard() {
  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1f2937", margin: "0 0 4px" }}>대시보드</h2>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>2026년 3월 4일 기준</p>
      </div>

      {/* KPI 카드 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {kpiCards.map((card) => (
          <div key={card.label} style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              background: card.bg,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
            }}>
              {card.icon}
            </div>
            <div>
              <div style={{ fontSize: "26px", fontWeight: "700", color: card.color, lineHeight: 1 }}>
                {card.value}
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                {card.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "20px" }}>
        {/* 왼쪽: 최근 신청 + 진행 현황 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* 최근 신청 목록 */}
          <div style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#1f2937", margin: 0 }}>최근 신청 현황</h3>
              <a href="/admin/applications" style={{ fontSize: "12px", color: "#2C3E50", textDecoration: "none" }}>전체 보기 →</a>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                  {["신청번호", "신청자", "단지명", "신청일", "상태"].map((h) => (
                    <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: "11px", fontWeight: "600", color: "#9ca3af", textTransform: "uppercase" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentApps.map((app) => (
                  <tr key={app.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                    <td style={{ padding: "10px 12px", fontSize: "13px", color: "#2C3E50", fontWeight: "600" }}>{app.id}</td>
                    <td style={{ padding: "10px 12px", fontSize: "13px", color: "#374151" }}>{app.name}</td>
                    <td style={{ padding: "10px 12px", fontSize: "13px", color: "#374151" }}>{app.apt}</td>
                    <td style={{ padding: "10px 12px", fontSize: "13px", color: "#6b7280" }}>{app.date}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{
                        padding: "3px 8px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: "600",
                        ...statusStyle(app.status),
                      }}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 단지별 진행 현황 */}
          <div style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
          }}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#1f2937", margin: "0 0 16px" }}>단지별 진행 현황</h3>
            {districtProgress.map((d) => (
              <div key={d.name} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ fontSize: "13px", color: "#374151", fontWeight: "500" }}>{d.name}</span>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: d.progress === 100 ? "#10b981" : "#2C3E50" }}>
                    {d.progress}%
                  </span>
                </div>
                <div style={{ height: "8px", background: "#f3f4f6", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${d.progress}%`,
                    background: d.progress === 100 ? "#10b981" : "linear-gradient(90deg, #2C3E50, #C9A84C)",
                    borderRadius: "4px",
                    transition: "width 0.5s ease",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽: 최근 활동 피드 */}
        <div style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
          height: "fit-content",
        }}>
          <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#1f2937", margin: "0 0 16px" }}>최근 활동</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {recentActivity.map((act, i) => {
              const iconMap: Record<string, string> = {
                new: "📥",
                approve: "✅",
                reject: "❌",
                update: "🔄",
                notice: "📢",
              };
              return (
                <div key={i} style={{
                  display: "flex",
                  gap: "12px",
                  padding: "12px 0",
                  borderBottom: i < recentActivity.length - 1 ? "1px solid #f3f4f6" : "none",
                }}>
                  <div style={{ fontSize: "18px", marginTop: "1px" }}>{iconMap[act.type]}</div>
                  <div>
                    <p style={{ fontSize: "12px", color: "#374151", margin: "0 0 4px", lineHeight: "1.5" }}>{act.text}</p>
                    <span style={{ fontSize: "11px", color: "#9ca3af" }}>{act.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
