"use client";

import { useState } from "react";
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
}

const districts: District[] = [
  { id: "1", name: "호반써밋동탄", location: "경기 화성", units: 1842, status: "진행중", progress: 65, date: "2026-04", attorney: "이현준 변호사" },
  { id: "2", name: "힐스테이트 인천시청역", location: "인천 남동", units: 956, status: "진행중", progress: 30, date: "2026-05", attorney: "박성민 변호사" },
  { id: "3", name: "e편한세상 인천어천", location: "인천 서구", units: 728, status: "예정", progress: 0, date: "2026-06", attorney: "미정" },
  { id: "4", name: "더샵 인천부평역 센트럴", location: "인천 부평", units: 1134, status: "완료", progress: 100, date: "2025-11", attorney: "이현준 변호사" },
  { id: "5", name: "검단신도시 우미린", location: "인천 서구", units: 814, status: "완료", progress: 100, date: "2025-09", attorney: "박성민 변호사" },
  { id: "6", name: "힐스테이트 송도 The H", location: "인천 연수", units: 620, status: "완료", progress: 100, date: "2025-07", attorney: "이현준 변호사" },
  { id: "7", name: "e편한세상 부천 센트럴파크", location: "경기 부천", units: 1056, status: "진행중", progress: 45, date: "2026-04", attorney: "박성민 변호사" },
  { id: "8", name: "힐스테이트 동탄 포레스트", location: "경기 화성", units: 792, status: "예정", progress: 0, date: "2026-07", attorney: "미정" },
  { id: "9", name: "용인 역북지구 자이", location: "경기 용인", units: 1200, status: "완료", progress: 100, date: "2025-10", attorney: "이현준 변호사" },
  { id: "10", name: "광명 자이 더샵", location: "경기 광명", units: 3344, status: "진행중", progress: 20, date: "2026-06", attorney: "박성민 변호사" },
  { id: "11", name: "청라 호반써밋", location: "인천 서구", units: 1432, status: "완료", progress: 100, date: "2025-08", attorney: "이현준 변호사" },
  { id: "12", name: "송도 더샵 그린스퀘어", location: "인천 연수", units: 888, status: "예정", progress: 0, date: "2026-08", attorney: "미정" },
];

const statusColorMap: Record<Status, string> = {
  "진행중": "bg-blue-100 text-blue-700",
  "완료": "bg-green-100 text-green-700",
  "예정": "bg-gray-100 text-gray-600",
};

const progressColorMap: Record<Status, string> = {
  "진행중": "#3b82f6",
  "완료": "#22c55e",
  "예정": "#d1d5db",
};

function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColorMap[status]}`}>
      {status}
    </span>
  );
}

export default function DistrictsPage() {
  const [regionFilter, setRegionFilter] = useState<"전체" | "서울" | "경기" | "인천">("전체");
  const [statusFilter, setStatusFilter] = useState<"전체" | Status>("전체");

  const filtered = districts.filter((d) => {
    const regionMatch = regionFilter === "전체" || d.location.startsWith(regionFilter);
    const statusMatch = statusFilter === "전체" || d.status === statusFilter;
    return regionMatch && statusMatch;
  });

  const filterBtnCls = (active: boolean) =>
    `px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
      active
        ? "text-white"
        : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
    }`;

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#2C3E50" }}>담당단지 현황</h1>
          <p className="text-gray-500">법무법인 더 에이치 황해가 담당하는 집단등기 단지 목록</p>
        </div>

        {/* 필터 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-600">지역:</span>
            {(["전체", "서울", "경기", "인천"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRegionFilter(r)}
                className={filterBtnCls(regionFilter === r)}
                style={regionFilter === r ? { backgroundColor: "#2C3E50" } : {}}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="w-px h-6 bg-gray-200 hidden sm:block" />
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-600">상태:</span>
            {(["전체", "진행중", "완료", "예정"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={filterBtnCls(statusFilter === s)}
                style={statusFilter === s ? { backgroundColor: "#2C3E50" } : {}}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="ml-auto text-sm text-gray-400">{filtered.length}개 단지</div>
        </div>

        {/* 그리드 */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🏗️</div>
            <p>해당하는 단지가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((d) => (
              <Link
                key={d.id}
                href={`/districts/${d.id}/`}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0 mr-2">
                    <h3 className="font-bold text-base truncate" style={{ color: "#2C3E50" }}>{d.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{d.location}</p>
                  </div>
                  <StatusBadge status={d.status} />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-400">총 세대수</p>
                    <p className="font-semibold" style={{ color: "#2C3E50" }}>{d.units.toLocaleString()}세대</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">입주예정</p>
                    <p className="font-semibold" style={{ color: "#2C3E50" }}>{d.date}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                    <span>진행률</span>
                    <span className="font-semibold">{d.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${d.progress}%`,
                        backgroundColor: progressColorMap[d.status],
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-gray-500">
                    <span>⚖️</span>
                    <span>{d.attorney}</span>
                  </div>
                  <span className="text-gray-300 text-base">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm inline-block max-w-md w-full">
            <p className="text-gray-600 mb-4 text-sm">담당 단지에 없는 경우에도 신청 가능합니다</p>
            <Link
              href="/register/"
              className="inline-block px-8 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#1B2A3A", color: "#fff" }}
            >
              집단등기 신청하기 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
