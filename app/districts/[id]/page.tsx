import Link from "next/link";

type Status = "진행중" | "완료" | "예정";

interface District {
  id: string; name: string; location: string; units: number;
  status: Status; progress: number; date: string; attorney: string; phone: string; email: string;
}

const districts: District[] = [
  { id: "1",  name: "호반써밋동탄",            location: "경기 화성", units: 1842, status: "진행중", progress: 65,  date: "2026-04", attorney: "이현준 변호사", phone: "032-251-1001", email: "hyunjun.lee@hhlawfirm.kr" },
  { id: "2",  name: "힐스테이트 인천시청역",    location: "인천 남동", units: 956,  status: "진행중", progress: 30,  date: "2026-05", attorney: "박성민 변호사", phone: "032-251-1002", email: "sungmin.park@hhlawfirm.kr" },
  { id: "3",  name: "e편한세상 인천어천",       location: "인천 서구", units: 728,  status: "예정",   progress: 0,   date: "2026-06", attorney: "미정", phone: "032-251-1000", email: "info@hhlawfirm.kr" },
  { id: "4",  name: "더샵 인천부평역 센트럴",   location: "인천 부평", units: 1134, status: "완료",   progress: 100, date: "2025-11", attorney: "이현준 변호사", phone: "032-251-1001", email: "hyunjun.lee@hhlawfirm.kr" },
  { id: "5",  name: "검단신도시 우미린",        location: "인천 서구", units: 814,  status: "완료",   progress: 100, date: "2025-09", attorney: "박성민 변호사", phone: "032-251-1002", email: "sungmin.park@hhlawfirm.kr" },
  { id: "6",  name: "힐스테이트 송도 The H",   location: "인천 연수", units: 620,  status: "완료",   progress: 100, date: "2025-07", attorney: "이현준 변호사", phone: "032-251-1001", email: "hyunjun.lee@hhlawfirm.kr" },
  { id: "7",  name: "e편한세상 부천 센트럴파크",location: "경기 부천", units: 1056, status: "진행중", progress: 45,  date: "2026-04", attorney: "박성민 변호사", phone: "032-251-1002", email: "sungmin.park@hhlawfirm.kr" },
  { id: "8",  name: "힐스테이트 동탄 포레스트", location: "경기 화성", units: 792,  status: "예정",   progress: 0,   date: "2026-07", attorney: "미정", phone: "032-251-1000", email: "info@hhlawfirm.kr" },
  { id: "9",  name: "용인 역북지구 자이",       location: "경기 용인", units: 1200, status: "완료",   progress: 100, date: "2025-10", attorney: "이현준 변호사", phone: "032-251-1001", email: "hyunjun.lee@hhlawfirm.kr" },
  { id: "10", name: "광명 자이 더샵",           location: "경기 광명", units: 3344, status: "진행중", progress: 20,  date: "2026-06", attorney: "박성민 변호사", phone: "032-251-1002", email: "sungmin.park@hhlawfirm.kr" },
  { id: "11", name: "청라 호반써밋",            location: "인천 서구", units: 1432, status: "완료",   progress: 100, date: "2025-08", attorney: "이현준 변호사", phone: "032-251-1001", email: "hyunjun.lee@hhlawfirm.kr" },
  { id: "12", name: "송도 더샵 그린스퀘어",     location: "인천 연수", units: 888,  status: "예정",   progress: 0,   date: "2026-08", attorney: "미정", phone: "032-251-1000", email: "info@hhlawfirm.kr" },
];

export function generateStaticParams() {
  return districts.map((d) => ({ id: d.id }));
}

const STATUS_STYLE: Record<Status, { border: string; color: string }> = {
  진행중: { border: "#BFDBFE", color: "#1D4ED8" },
  완료:   { border: "#BBF7D0", color: "#15803D" },
  예정:   { border: "#D1D5DB", color: "#4B5563" },
};

const TIMELINE_STEPS = ["계약 체결", "서류 수집", "등기 신청", "등기 완료"];

const NOTICES = [
  { date: "2026-03-01", title: "서류 제출 기한 안내" },
  { date: "2026-02-20", title: "담당 변호사 배정 안내" },
  { date: "2026-02-10", title: "집단등기 진행 현황 공유" },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DistrictDetailPage({ params }: PageProps) {
  const { id } = await params;
  const district = districts.find((d) => d.id === id);

  if (!district) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "12px" }}>
        <p style={{ fontSize: "16px", color: "#64748B" }}>단지를 찾을 수 없습니다.</p>
        <Link href="/districts/" style={{ fontSize: "14px", color: "#1B2A3A" }}>← 목록으로 돌아가기</Link>
      </div>
    );
  }

  const sc = STATUS_STYLE[district.status];
  const timelineActive = district.progress === 0 ? 0 : district.progress <= 30 ? 1 : district.progress <= 65 ? 2 : district.progress < 100 ? 3 : 4;

  return (
    <div style={{ background: "#F5F6F8", minHeight: "100vh" }}>
      {/* 헤더 */}
      <div style={{ background: "#1B2A3A", padding: "40px 24px 36px" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <Link href="/districts/" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "16px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            담당단지 현황
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>{district.name}</h1>
            <span style={{ fontSize: "12px", fontWeight: 600, padding: "3px 10px", borderRadius: "4px", border: `1px solid ${sc.border}`, color: sc.color, background: "rgba(255,255,255,0.08)" }}>
              {district.status}
            </span>
          </div>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginTop: "6px" }}>
            {district.location} · {district.units.toLocaleString()}세대 · 입주 {district.date}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "28px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "20px", alignItems: "start" }}>
          {/* 좌측 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* 진행 현황 */}
            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "24px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0D1117", marginBottom: "20px", letterSpacing: "-0.01em" }}>등기 진행 현황</h3>
              {/* 진행률 바 */}
              <div style={{ marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "8px" }}>
                  <span style={{ color: "#64748B" }}>진행률</span>
                  <span style={{ fontWeight: 700, color: "#0D1117" }}>{district.progress}%</span>
                </div>
                <div style={{ height: "6px", background: "#E2E8F0", borderRadius: "3px" }}>
                  <div style={{ height: "100%", width: `${district.progress}%`, background: "#1B2A3A", borderRadius: "3px" }} />
                </div>
              </div>
              {/* 타임라인 */}
              <div style={{ display: "flex", alignItems: "center" }}>
                {TIMELINE_STEPS.map((step, i) => (
                  <div key={step} style={{ display: "flex", alignItems: "center", flex: i < TIMELINE_STEPS.length - 1 ? 1 : undefined }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, background: i < timelineActive ? "#1B2A3A" : i === timelineActive ? "#1B2A3A" : "#E2E8F0", color: i <= timelineActive ? "#fff" : "#94A3B8" }}>
                        {i < timelineActive ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        ) : i + 1}
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

            {/* 공지사항 */}
            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "24px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0D1117", marginBottom: "16px", letterSpacing: "-0.01em" }}>공지사항</h3>
              {NOTICES.map((n, i) => (
                <div key={i} style={{ display: "flex", gap: "16px", padding: "12px 0", borderBottom: i < NOTICES.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                  <span style={{ fontSize: "11px", color: "#94A3B8", whiteSpace: "nowrap", marginTop: "2px" }}>{n.date}</span>
                  <span style={{ fontSize: "14px", color: "#374151" }}>{n.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 우측 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* 담당 변호사 */}
            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "20px" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#94A3B8", letterSpacing: "0.02em", marginBottom: "16px" }}>담당 변호사</div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#F5F6F8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" /></svg>
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D1117" }}>{district.attorney}</div>
                  <div style={{ fontSize: "12px", color: "#64748B" }}>법무법인 더 에이치 황해</div>
                </div>
              </div>
              <a href={`tel:${district.phone}`} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px", border: "1.5px solid #E2E8F0", borderRadius: "5px", fontSize: "13px", color: "#0D1117", textDecoration: "none", fontWeight: 500, marginBottom: "8px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.19-1.19a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.18v2.74z"/></svg>
                {district.phone}
              </a>
              <a href={`mailto:${district.email}`} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px", border: "1.5px solid #E2E8F0", borderRadius: "5px", fontSize: "13px", color: "#0D1117", textDecoration: "none", fontWeight: 500 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                문의하기
              </a>
            </div>

            {/* 집단등기 신청 */}
            <div style={{ background: "#1B2A3A", borderRadius: "8px", padding: "20px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff", marginBottom: "8px", letterSpacing: "-0.01em" }}>집단등기 신청</div>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "16px", lineHeight: 1.6 }}>이 단지 신청이라면 아래 버튼으로 진행해 주세요.</p>
              <Link href="/register/" style={{ display: "block", padding: "10px 0", textAlign: "center", background: "#fff", color: "#1B2A3A", borderRadius: "5px", fontSize: "13px", fontWeight: 700, textDecoration: "none", letterSpacing: "-0.01em" }}>
                신청하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
