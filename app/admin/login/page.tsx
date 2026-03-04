"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    if (email === "admin@lawfirmthe-h.com" && password === "admin1234") {
      localStorage.setItem("admin_token", "authenticated");
      router.replace("/admin");
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F5F6F8", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "10px", padding: "40px", width: "100%", maxWidth: "380px" }}>
        {/* 로고 */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#0D1117", letterSpacing: "-0.02em" }}>더에이치 황해</div>
          <div style={{ fontSize: "13px", color: "#64748B", marginTop: "2px" }}>관리자 로그인</div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label className="form-label">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="admin@lawfirmthe-h.com"
              autoFocus
              required
            />
          </div>
          <div>
            <label className="form-label">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="비밀번호 입력"
              required
            />
          </div>

          {error && (
            <p style={{ fontSize: "13px", color: "#DC2626", margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ marginTop: "8px", justifyContent: "center", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
