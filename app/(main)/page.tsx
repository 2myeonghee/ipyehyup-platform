"use client";

import Link from "next/link";

const districts = [
  { id: "1", name: "호반써밋동탄", location: "경기 화성", units: 1842, status: "진행중", progress: 65, attorney: "이현준 변호사" },
  { id: "7", name: "e편한세상 부천 센트럴파크", location: "경기 부천", units: 1056, status: "진행중", progress: 45, attorney: "박성민 변호사" },
  { id: "4", name: "더샵 인천부평역 센트럴", location: "인천 부평", units: 1134, status: "완료", progress: 100, attorney: "이현준 변호사" },
];

const stats = [
  { value: "12개", label: "담당단지" },
  { value: "8,400+", label: "완료세대" },
  { value: "0.22%", label: "평균수수료" },
  { value: "30일", label: "평균소요기간" },
];

const features = [
  {
    title: "AI 법률상담",
    desc: "24시간 AI가 집단등기 절차, 비용, 서류를 즉시 안내합니다. 복잡한 법률 용어도 쉽게 설명합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B2A3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    title: "실시간 진행현황",
    desc: "단지별 등기 진행 현황을 투명하게 공개합니다. 어느 단계인지 언제든 확인 가능합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B2A3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "전문 변호사 직접 처리",
    desc: "중개 없이 담당 변호사가 집단등기 전 과정을 직접 처리합니다. 책임감 있는 서비스입니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B2A3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const steps = [
  { num: "01", title: "상담 신청", desc: "온라인 신청서 또는 전화로 시작하세요." },
  { num: "02", title: "계약 체결", desc: "입예협과 법무법인 간 위임 계약을 체결합니다." },
  { num: "03", title: "등기 진행", desc: "서류 수집부터 등기 신청까지 전문가가 처리합니다." },
  { num: "04", title: "완료", desc: "등기 완료 후 등기필증을 각 세대에 교부합니다." },
];



export default function HomePage() {
  return (
    <div>
      {/* 히어로 */}
      <section style={{ background: "#1B2A3A", padding: "80px 24px 72px", color: "#fff" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <div style={{ maxWidth: "600px" }}>
            <p style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.5)", marginBottom: "20px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              법무법인 더 에이치 황해 · 입예협 집단등기 전문
            </p>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.03em", marginBottom: "20px" }}>
              입주예정자협의회<br />
              집단등기, 디지털로<br />
              완성합니다
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "36px", letterSpacing: "-0.01em" }}>
              AI 법률상담부터 실시간 진행현황, 취득세 계산까지.<br />
              전국 최다 집단등기 실적, 법무법인 더 에이치 황해가 함께합니다.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <Link href="/register/" className="btn-primary">집단등기 신청하기</Link>
              <Link href="/ai-consult/" style={{ padding: "11px 24px", borderRadius: "5px", fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(255,255,255,0.25)", textDecoration: "none", letterSpacing: "-0.01em" }}>
                AI 상담 시작하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 지표 */}
      <section style={{ borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }} className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} style={{ padding: "32px 24px", borderRight: i < 3 ? "1px solid #E2E8F0" : "none", textAlign: "center" }} className="stat-item">
                <div style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#0D1117", letterSpacing: "-0.03em", marginBottom: "4px" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "13px", color: "#64748B", fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 특징 */}
      <section style={{ padding: "72px 24px", background: "#fff" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0D1117", letterSpacing: "-0.02em", marginBottom: "8px" }}>왜 더 에이치 황해인가요?</h2>
            <p style={{ fontSize: "14px", color: "#64748B" }}>집단등기 전 과정을 디지털로 혁신합니다</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {features.map((f, i) => (
              <div key={i} style={{ padding: "28px", border: "1px solid #E2E8F0", borderRadius: "8px", background: "#fff" }}>
                <div style={{ width: "40px", height: "40px", background: "#F5F6F8", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#0D1117", marginBottom: "8px", letterSpacing: "-0.01em" }}>{f.title}</h3>
                <p style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 진행 절차 */}
      <section style={{ padding: "72px 24px", background: "#F5F6F8" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0D1117", letterSpacing: "-0.02em", marginBottom: "8px" }}>집단등기 진행 절차</h2>
            <p style={{ fontSize: "14px", color: "#64748B" }}>4단계로 완료되는 간편한 프로세스</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {steps.map((s) => (
              <div key={s.num} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "24px" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.04em", marginBottom: "12px" }}>{s.num}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#0D1117", marginBottom: "8px", letterSpacing: "-0.01em" }}>{s.title}</h3>
                <p style={{ fontSize: "13px", color: "#64748B", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 담당단지 */}
      <section style={{ padding: "72px 24px", background: "#fff" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "8px" }}>
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0D1117", letterSpacing: "-0.02em", marginBottom: "4px" }}>담당단지 현황</h2>
              <p style={{ fontSize: "14px", color: "#64748B" }}>현재 진행 중인 집단등기 단지</p>
            </div>
            <Link href="/districts/" style={{ fontSize: "13px", fontWeight: 500, color: "#1B2A3A", textDecoration: "none" }}>
              전체 보기 →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
            {districts.map((d) => (
              <Link key={d.id} href={`/districts/${d.id}/`} style={{ textDecoration: "none", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "20px 24px", background: "#fff", display: "block" }}
                className="hover:border-[#1B2A3A] transition-colors">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "#0D1117", letterSpacing: "-0.01em", marginBottom: "2px" }}>{d.name}</div>
                    <div style={{ fontSize: "12px", color: "#94A3B8" }}>{d.location} · {d.units.toLocaleString()}세대</div>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "4px", border: `1px solid ${d.status === "완료" ? "#BBF7D0" : "#BFDBFE"}`, color: d.status === "완료" ? "#15803D" : "#1D4ED8" }}>
                    {d.status}
                  </span>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#94A3B8", marginBottom: "6px" }}>
                    <span>진행률</span><span>{d.progress}%</span>
                  </div>
                  <div style={{ height: "3px", background: "#E2E8F0", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${d.progress}%`, background: "#1B2A3A", borderRadius: "2px" }} />
                  </div>
                </div>
                <div style={{ marginTop: "12px", fontSize: "12px", color: "#64748B" }}>담당: {d.attorney}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 배너 */}
      <section style={{ padding: "72px 24px", background: "#F5F6F8", borderTop: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#0D1117", letterSpacing: "-0.02em", marginBottom: "12px" }}>
            집단등기, 지금 바로 시작하세요
          </h2>
          <p style={{ fontSize: "15px", color: "#64748B", marginBottom: "32px" }}>
            영업일 2일 내 전담 변호사가 직접 연락드립니다
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register/" className="btn-primary">신청서 작성하기</Link>
            <a href="tel:032-251-1000" className="btn-outline">032-251-1000</a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stat-item { border-right: none !important; border-bottom: 1px solid #E2E8F0; }
          .stat-item:nth-child(odd) { border-right: 1px solid #E2E8F0 !important; }
        }
      `}</style>
    </div>
  );
}
