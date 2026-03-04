import Link from "next/link";

const stats = [
  { label: "담당단지", value: "12개" },
  { label: "완료세대", value: "8,400+" },
  { label: "평균수수료", value: "0.22%" },
  { label: "소요기간", value: "30일" },
];

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B2A3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "AI 법률상담",
    desc: "24시간 AI가 집단등기 절차, 비용, 서류에 대해 즉시 답변. 복잡한 법률 용어도 쉽게 설명합니다.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B2A3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "실시간 진행현황",
    desc: "단지별 등기 진행 현황을 실시간으로 확인. 어느 단계에 있는지 투명하게 공개합니다.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B2A3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "전문 변호사 직접 처리",
    desc: "중개 없이 담당 변호사가 직접 집단등기 전 과정을 처리. 책임감 있는 서비스를 제공합니다.",
  },
];

const steps = [
  { step: "01", title: "상담 신청", desc: "온라인 신청서 작성 또는 전화 상담으로 시작하세요." },
  { step: "02", title: "계약 체결", desc: "입예협과 법무법인 간 집단등기 위임 계약을 체결합니다." },
  { step: "03", title: "등기 진행", desc: "서류 수집부터 등기 신청까지 전문가가 직접 처리합니다." },
  { step: "04", title: "완료", desc: "등기 완료 후 등기필증을 각 세대에 교부합니다." },
];

const previewDistricts = [
  { id: "1", name: "호반써밋동탄", location: "경기 화성", units: 1842, status: "진행중", progress: 65, attorney: "이현준 변호사" },
  { id: "7", name: "e편한세상 부천 센트럴파크", location: "경기 부천", units: 1056, status: "진행중", progress: 45, attorney: "박성민 변호사" },
  { id: "4", name: "더샵 인천부평역 센트럴", location: "인천 부평", units: 1134, status: "완료", progress: 100, attorney: "이현준 변호사" },
];

function StatusBadge({ status }: { status: string }) {
  const styleMap: Record<string, React.CSSProperties> = {
    "진행중": { border: "1px solid #1d4ed8", color: "#1d4ed8", background: "transparent" },
    "완료": { border: "1px solid #166534", color: "#166534", background: "transparent" },
    "예정": { border: "1px solid #6b7280", color: "#6b7280", background: "transparent" },
  };
  return (
    <span
      style={{
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "600",
        ...( styleMap[status] ?? { border: "1px solid #6b7280", color: "#6b7280", background: "transparent" }),
      }}
    >
      {status}
    </span>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* 히어로 섹션 */}
      <section
        className="relative text-white py-28 px-4 text-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B2A3A 0%, #243649 60%, #2d4460 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #C4973A 0%, transparent 50%)" }}
        />
        <div className="relative max-w-4xl mx-auto">
          <div
            className="inline-block px-4 py-1.5 text-xs font-semibold mb-8 tracking-wide"
            style={{
              backgroundColor: "rgba(196,151,58,0.15)",
              color: "#C4973A",
              border: "1px solid rgba(196,151,58,0.35)",
              borderRadius: "2px",
            }}
          >
            법무법인 더 에이치 황해 · 입예협 집단등기 전문
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl leading-tight mb-6"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 900 }}
          >
            입주예정자협의회 집단등기,<br />
            <span style={{ color: "#C4973A" }}>디지털로 완성합니다</span>
          </h1>
          <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.75)" }}>
            AI 법률상담부터 실시간 진행현황, 취득세 계산까지.<br />
            전국 최다 집단등기 실적, 법무법인 더 에이치 황해가 함께합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register/"
              className="px-8 py-3.5 font-bold text-base transition-all hover:opacity-90"
              style={{ backgroundColor: "#C4973A", color: "#1B2A3A", borderRadius: "4px" }}
            >
              집단등기 신청하기 &rarr;
            </Link>
            <Link
              href="/ai-consult/"
              className="px-8 py-3.5 font-bold text-base border-2 transition-all"
              style={{ borderColor: "rgba(255,255,255,0.35)", color: "#ffffff", borderRadius: "4px" }}
            >
              AI 상담 시작하기
            </Link>
          </div>
        </div>
      </section>

      {/* 수치 섹션 */}
      <section className="py-12 px-4" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white p-6"
              style={{
                border: "1px solid #E2E5EA",
                borderBottom: "3px solid #C4973A",
              }}
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: "#1B2A3A", fontFamily: "var(--font-serif)" }}
              >
                {s.value}
              </div>
              <div className="text-sm" style={{ color: "#6b7280" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 특징 카드 */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-2xl sm:text-3xl mb-3"
            style={{ color: "#1B2A3A", fontFamily: "var(--font-serif)", fontWeight: 700 }}
          >
            왜 더 에이치 황해인가요?
          </h2>
          <p style={{ color: "#6b7280" }}>집단등기 전 과정을 디지털로 혁신합니다</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white p-8 hover:shadow-md transition-shadow"
              style={{ border: "1px solid #E2E5EA" }}
            >
              <div className="mb-5">{f.icon}</div>
              <h3 className="font-bold text-lg mb-3" style={{ color: "#1B2A3A" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 프로세스 */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl mb-3"
              style={{ color: "#1B2A3A", fontFamily: "var(--font-serif)", fontWeight: 700 }}
            >
              집단등기 진행 절차
            </h2>
            <p style={{ color: "#6b7280" }}>4단계로 완료되는 간편한 프로세스</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                <div className="bg-white p-6 h-full" style={{ border: "1px solid #E2E5EA" }}>
                  <div
                    className="text-sm font-bold mb-3 tracking-widest"
                    style={{ color: "#C4973A" }}
                  >
                    {s.step}
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: "#1B2A3A" }}>{s.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10 text-xl"
                    style={{ color: "#d1d5db" }}
                  >
                    &rarr;
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 담당단지 프리뷰 */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: "#1B2A3A", fontFamily: "var(--font-serif)" }}
            >
              담당단지 현황
            </h2>
            <p className="text-sm mt-1" style={{ color: "#6b7280" }}>현재 진행 중인 집단등기 단지</p>
          </div>
          <Link href="/districts/" className="text-sm font-medium hover:underline" style={{ color: "#1B2A3A" }}>
            전체보기 &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {previewDistricts.map((d) => (
            <Link
              key={d.id}
              href={`/districts/${d.id}/`}
              className="bg-white p-6 hover:shadow-md transition-all hover:-translate-y-0.5"
              style={{ border: "1px solid #E2E5EA" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-base" style={{ color: "#1B2A3A" }}>{d.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{d.location} · {d.units.toLocaleString()}세대</p>
                </div>
                <StatusBadge status={d.status} />
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1" style={{ color: "#9ca3af" }}>
                  <span>진행률</span>
                  <span>{d.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#E2E5EA" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${d.progress}%`,
                      backgroundColor: d.status === "완료" ? "#166534" : "#1B2A3A",
                    }}
                  />
                </div>
              </div>
              <p className="text-xs" style={{ color: "#6b7280" }}>담당: {d.attorney}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA 배너 */}
      <section className="py-16 px-4">
        <div
          className="max-w-4xl mx-auto p-12 text-center text-white"
          style={{ background: "linear-gradient(135deg, #1B2A3A, #2d4460)" }}
        >
          <h2
            className="text-2xl sm:text-3xl mb-3"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
          >
            집단등기, 지금 바로 시작하세요
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.7)" }}>
            영업일 2일 내 전담 변호사가 직접 연락드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register/"
              className="px-8 py-3.5 font-bold text-base transition-all hover:opacity-90"
              style={{ backgroundColor: "#C4973A", color: "#1B2A3A", borderRadius: "4px" }}
            >
              신청서 작성하기
            </Link>
            <a
              href="tel:032-251-1000"
              className="px-8 py-3.5 font-bold text-base transition-all"
              style={{
                border: "1px solid rgba(255,255,255,0.4)",
                color: "#ffffff",
                borderRadius: "4px",
              }}
            >
              032-251-1000
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
