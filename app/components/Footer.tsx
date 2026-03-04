import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#2C3E50" }} className="text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 회사 정보 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                style={{ backgroundColor: "#C9A84C", color: "#2C3E50" }}>
                에이치
              </div>
              <div>
                <div className="font-bold text-white text-sm">법무법인 더 에이치 황해</div>
                <div className="text-xs text-gray-400">입예협 집단등기 전문</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              입주예정자협의회 집단등기 전문 법무법인.<br />
              AI 기술로 더 빠르고 정확한 등기 서비스를 제공합니다.
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm">서비스</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/calculator/" className="hover:text-white transition-colors">취득세 계산기</Link></li>
              <li><Link href="/ai-consult/" className="hover:text-white transition-colors">AI 법률상담</Link></li>
              <li><Link href="/districts/" className="hover:text-white transition-colors">담당단지 현황</Link></li>
              <li><Link href="/register/" className="hover:text-white transition-colors">집단등기 신청</Link></li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm">연락처</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-gray-500 mt-0.5">📍</span>
                <span>인천 미추홀구 학익로 60</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500">📞</span>
                <a href="tel:032-251-1000" className="hover:text-white transition-colors">032-251-1000</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500">🏢</span>
                <span>사업자등록번호: 121-81-78634</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© 2025 법무법인 더 에이치 황해. All rights reserved.</p>
          <p>주소: 인천 미추홀구 학익로 60 | 전화: 032-251-1000 | 사업자: 121-81-78634</p>
        </div>
      </div>
    </footer>
  );
}
