import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1B2A3A", color: "#94A3B8", marginTop: "auto" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px" }}>

          {/* 회사 정보 */}
          <div>
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>법무법인 더 에이치 황해</div>
              <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>입예협 집단등기 전문</div>
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#64748B" }}>
              입주예정자협의회 집단등기 전문 법무법인.<br />
              AI 기술로 더 빠르고 정확한 서비스를 제공합니다.
            </p>
          </div>

          {/* 서비스 */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: 600, color: "#fff", marginBottom: "16px", letterSpacing: "-0.01em" }}>서비스</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                ["취득세 계산기", "/calculator/"],
                ["AI 법률상담", "/ai-consult/"],
                ["담당단지 현황", "/districts/"],
                ["집단등기 신청", "/register/"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} style={{ fontSize: "13px", color: "#64748B", textDecoration: "none" }}
                    className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: 600, color: "#fff", marginBottom: "16px", letterSpacing: "-0.01em" }}>연락처</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li style={{ fontSize: "13px", color: "#64748B" }}>인천 미추홀구 학익로 60</li>
              <li>
                <a href="tel:032-251-1000" style={{ fontSize: "13px", color: "#64748B", textDecoration: "none" }}
                  className="hover:text-white transition-colors">
                  032-251-1000
                </a>
              </li>
              <li style={{ fontSize: "13px", color: "#64748B" }}>사업자 121-81-78634</li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "40px", paddingTop: "24px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px" }}>
          <p style={{ fontSize: "12px", color: "#475569" }}>© 2025 법무법인 더 에이치 황해. All rights reserved.</p>
          <p style={{ fontSize: "12px", color: "#475569" }}>인천 미추홀구 학익로 60 · 032-251-1000</p>
        </div>
      </div>
    </footer>
  );
}
