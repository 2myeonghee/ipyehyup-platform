import Link from "next/link";

type Status = "진행중" | "완료" | "예정";

interface District {
  id: string;
  name: string;
  location: string;
  units: number;
  status: Status;
  progress: number;
  date: string;
  attorney: string;
  phone: string;
  email: string;
}

const districts: District[] = [
  { id: "1", name: "호반써밋동탄", location: "경기 화성", units: 1842, status: "진행중", progress: 65, date: "2026-04", attorney: "이현준 변호사", phone: "032-251-1001", email: "hyunjun.lee@hhlawfirm.kr" },
  { id: "2", name: "힐스테이트 인천시청역", location: "인천 남동", units: 956, status: "진행중", progress: 30, date: "2026-05", attorney: "박성민 변호사", phone: "032-251-1002", email: "sungmin.park@hhlawfirm.kr" },
  { id: "3", name: "e편한세상 인천어천", location: "인천 서구", units: 728, status: "예정", progress: 0, date: "2026-06", attorney: "미정", phone: "032-251-1000", email: "info@hhlawfirm.kr" },
  { id: "4", name: "더샵 인천부평역 센트럴", location: "인천 부평", units: 1134, status: "완료", progress: 100, date: "2025-11", attorney: "이현준 변호사", phone: "032-251-1001", email: "hyunjun.lee@hhlawfirm.kr" },
  { id: "5", name: "검단신도시 우미린", location: "인천 서구", units: 814, status: "완료", progress: 100, date: "2025-09", attorney: "박성민 변호사", phone: "032-251-1002", email: "sungmin.park@hhlawfirm.kr" },
  { id: "6", name: "힐스테이트 송도 The H", location: "인천 연수", units: 620, status: "완료", progress: 100, date: "2025-07", attorney: "이현준 변호사", phone: "032-251-1001", email: "hyunjun.lee@hhlawfirm.kr" },
  { id: "7", name: "e편한세상 부천 센트럴파크", location: "경기 부천", units: 1056, status: "진행중", progress: 45, date: "2026-04", attorney: "박성민 변호사", phone: "032-251-1002", email: "sungmin.park@hhlawfirm.kr" },
  { id: "8", name: "힐스테이트 동탄 포레스트", location: "경기 화성", units: 792, status: "예정", progress: 0, date: "2026-07", attorney: "미정", phone: "032-251-1000", email: "info@hhlawfirm.kr" },
  { id: "9", name: "용인 역북지구 자이", location: "경기 용인", units: 1200, status: "완료", progress: 100, date: "2025-10", attorney: "이현준 변호사", phone: "032-251-1001", email: "hyunjun.lee@hhlawfirm.kr" },
  { id: "10", name: "광명 자이 더샵", location: "경기 광명", units: 3344, status: "진행중", progress: 20, date: "2026-06", attorney: "박성민 변호사", phone: "032-251-1002", email: "sungmin.park@hhlawfirm.kr" },
  { id: "11", name: "청라 호반써밋", location: "인천 서구", units: 1432, status: "완료", progress: 100, date: "2025-08", attorney: "이현준 변호사", phone: "032-251-1001", email: "hyunjun.lee@hhlawfirm.kr" },
  { id: "12", name: "송도 더샵 그린스퀘어", location: "인천 연수", units: 888, status: "예정", progress: 0, date: "2026-08", attorney: "미정", phone: "032-251-1000", email: "info@hhlawfirm.kr" },
];

export function generateStaticParams() {
  return districts.map((d) => ({ id: d.id }));
}

const statusColorMap: Record<Status, string> = {
  "진행중": "bg-blue-100 text-blue-700",
  "완료": "bg-green-100 text-green-700",
  "예정": "bg-gray-100 text-gray-600",
};

const timelineSteps = [
  { label: "계약 체결", key: "contract" },
  { label: "서류 수집", key: "documents" },
  { label: "등기 신청", key: "application" },
  { label: "완료", key: "done" },
];

function getTimelineProgress(progress: number): number {
  if (progress === 0) return 0;
  if (progress <= 25) return 1;
  if (progress <= 50) return 2;
  if (progress <= 75) return 3;
  return 4;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DistrictDetailPage({ params }: PageProps) {
  const { id } = await params;
  const district = districts.find((d) => d.id === id);

  if (!district) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏗️</div>
          <h1 className="text-2xl font-bold mb-4" style={{ color: "#2C3E50" }}>단지를 찾을 수 없습니다</h1>
          <Link href="/districts/" className="text-blue-500 hover:underline">목록으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const timelineActive = getTimelineProgress(district.progress);
  const progressColor = district.status === "완료" ? "#22c55e" : district.status === "진행중" ? "#3b82f6" : "#d1d5db";

  const sampleNotices = [
    {
      date: "2026-02-15",
      title: "서류 제출 안내",
      content: `${district.name} 집단등기를 위한 서류 제출 기한을 안내드립니다. 각 세대별로 필요 서류를 준비해 주세요.`,
    },
    {
      date: "2026-01-20",
      title: "집단등기 계약 체결 완료",
      content: `${district.name} 입주예정자협의회와 법무법인 더 에이치 황해 간 집단등기 위임 계약이 체결되었습니다.`,
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="max-w-4xl mx-auto">
        {/* 뒤로가기 */}
        <Link href="/districts/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          ← 담당단지 목록
        </Link>

        {/* 단지 정보 헤더 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#2C3E50" }}>{district.name}</h1>
              <p className="text-gray-500 mt-1">{district.location} · {district.units.toLocaleString()}세대</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold self-start sm:self-auto ${statusColorMap[district.status]}`}>
              {district.status}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: "총 세대수", value: `${district.units.toLocaleString()}세대` },
              { label: "입주예정", value: district.date },
              { label: "담당변호사", value: district.attorney },
              { label: "진행률", value: `${district.progress}%` },
            ].map((item) => (
              <div key={item.label} className="text-center p-3 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
                <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                <p className="font-bold text-sm" style={{ color: "#2C3E50" }}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* 진행바 */}
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>전체 진행률</span>
              <span className="font-semibold">{district.progress}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${district.progress}%`, backgroundColor: progressColor }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 왼쪽: 타임라인 + 공지사항 */}
          <div className="md:col-span-2 space-y-6">
            {/* 진행 현황 타임라인 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-base mb-6" style={{ color: "#2C3E50" }}>진행 현황</h2>
              <div className="relative">
                {/* 연결선 */}
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100" />
                <div
                  className="absolute left-4 top-4 w-0.5 transition-all duration-700"
                  style={{
                    height: `${Math.min(100, (timelineActive / timelineSteps.length) * 100)}%`,
                    backgroundColor: progressColor,
                  }}
                />

                <div className="space-y-6">
                  {timelineSteps.map((s, i) => {
                    const isActive = i < timelineActive;
                    const isCurrent = i === timelineActive - 1 && district.status === "진행중";
                    return (
                      <div key={s.key} className="flex items-center gap-4 relative">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 relative z-10 transition-all"
                          style={{
                            backgroundColor: isActive ? progressColor : "#e5e7eb",
                            color: isActive ? "white" : "#9ca3af",
                          }}
                        >
                          {isActive ? "✓" : i + 1}
                        </div>
                        <div>
                          <p className={`font-semibold text-sm ${isActive ? "" : "text-gray-400"}`}
                            style={{ color: isActive ? "#2C3E50" : undefined }}>
                            {s.label}
                            {isCurrent && (
                              <span className="ml-2 text-xs px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>
                                진행 중
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 공지사항 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-base mb-4" style={{ color: "#2C3E50" }}>공지사항</h2>
              <div className="space-y-4">
                {sampleNotices.map((n, i) => (
                  <div key={i} className="border-l-2 pl-4 py-1" style={{ borderColor: "#1B2A3A" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm" style={{ color: "#2C3E50" }}>{n.title}</p>
                      <span className="text-xs text-gray-400">{n.date}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{n.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽: 담당 변호사 카드 + CTA */}
          <div className="space-y-5">
            {/* 담당 변호사 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-base mb-4" style={{ color: "#2C3E50" }}>담당 변호사</h2>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl"
                  style={{ backgroundColor: "rgba(44,62,80,0.1)" }}>
                  ⚖️
                </div>
                <p className="font-bold" style={{ color: "#2C3E50" }}>{district.attorney}</p>
                <p className="text-xs text-gray-400 mb-4">법무법인 더 에이치 황해</p>

                {district.attorney !== "미정" ? (
                  <div className="space-y-2 text-sm">
                    <a href={`tel:${district.phone}`}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors justify-center">
                      <span></span>
                      <span className="text-gray-600">{district.phone}</span>
                    </a>
                    <a href={`mailto:${district.email}`}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors justify-center">
                      <span>✉️</span>
                      <span className="text-gray-600 text-xs break-all">{district.email}</span>
                    </a>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">담당 변호사가 아직 배정되지 않았습니다.</p>
                )}
              </div>
            </div>

            {/* 신청하기 CTA */}
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                이 단지의 집단등기를<br />신청하시겠습니까?
              </p>
              <Link
                href="/register/"
                className="block py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#1B2A3A", color: "#fff" }}
              >
                신청하기 →
              </Link>
              <a
                href="tel:032-251-1000"
                className="mt-2 block py-2.5 rounded-xl text-sm text-gray-600 border border-gray-200 hover:border-gray-400 transition-all"
              >
                전화 문의
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
