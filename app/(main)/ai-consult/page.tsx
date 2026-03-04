"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "집단등기 절차가 어떻게 되나요?",
  "수수료는 얼마나 드나요?",
  "서류는 무엇이 필요한가요?",
  "진행 기간은?",
  "잔금 대출 동시 진행 가능한가요?",
];

function LoadingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: "#2C3E50",
            animation: `bounce 1.2s infinite`,
            animationDelay: `${i * 0.2}s`,
            display: "inline-block",
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

export default function AiConsultPage() {
  const [apiKey, setApiKey] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [apiKeyError, setApiKeyError] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "안녕하세요! 법무법인 더 에이치 황해 AI 상담사입니다. 입주예정자협의회 집단등기에 관해 궁금한 점을 자유롭게 질문해주세요.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("anthropic_api_key");
    if (stored) {
      setApiKey(stored);
    } else {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSaveKey = () => {
    const trimmed = apiKeyInput.trim();
    if (!trimmed.startsWith("sk-ant-")) {
      setApiKeyError("API Key는 'sk-ant-'로 시작해야 합니다.");
      return;
    }
    localStorage.setItem("anthropic_api_key", trimmed);
    setApiKey(trimmed);
    setShowModal(false);
    setApiKeyError("");
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const SYSTEM_PROMPT = `당신은 법무법인 더 에이치 황해의 입주예정자협의회 집단등기 전문 AI 상담사입니다.
집단등기 절차, 비용, 서류, 일정에 대해 친절하고 정확하게 안내합니다.
법적 판단이 필요한 복잡한 사항은 "전문 변호사 직접 상담을 권장드립니다"로 안내하세요.
반드시 한국어로 답변하세요. 간결하고 명확하게 3-5줄 이내로.`;

    try {
      const Anthropic = (await import("@anthropic-ai/sdk")).default;
      const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

      const response = await client.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
      });

      const content = response.content[0].type === "text" ? response.content[0].text : "";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content },
      ]);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "알 수 없는 오류";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `죄송합니다. 오류가 발생했습니다: ${errorMessage}. API Key를 확인해주세요.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F9FA" }}>
      {/* API Key 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
            <div className="text-4xl mb-4 text-center">🔑</div>
            <h2 className="text-xl font-bold mb-2 text-center" style={{ color: "#2C3E50" }}>
              Anthropic API Key 입력
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              AI 상담을 이용하려면 Anthropic API Key가 필요합니다.<br />
              Key는 브라우저에만 저장되며 서버에 전달하지 않습니다.
            </p>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveKey()}
              placeholder="sk-ant-api03-..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm mb-2 focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": "#2C3E50" } as React.CSSProperties}
              autoFocus
            />
            {apiKeyError && (
              <p className="text-red-500 text-xs mb-3">{apiKeyError}</p>
            )}
            <p className="text-xs text-gray-400 mb-4">
              * <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer"
                className="underline">console.anthropic.com</a>에서 발급 가능
            </p>
            <button
              onClick={handleSaveKey}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#2C3E50", color: "white" }}
            >
              확인하고 상담 시작
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#2C3E50" }}>AI 법률상담</h1>
          <p className="text-gray-500">집단등기 관련 궁금한 점을 AI에게 물어보세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* 빠른 질문 패널 */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-sm mb-4" style={{ color: "#2C3E50" }}>빠른 질문</h3>
              <div className="space-y-2">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    disabled={loading}
                    className="w-full text-left text-xs px-3 py-2.5 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="mt-6 border-t border-gray-100 pt-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
                >
                  🔑 API Key 변경
                </button>
              </div>
            </div>
          </div>

          {/* 채팅창 */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm flex flex-col" style={{ height: "600px" }}>
              {/* 헤더 */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                  style={{ backgroundColor: "#2C3E50" }}>
                  🤖
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "#2C3E50" }}>집단등기 AI 상담사</div>
                  <div className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                    온라인
                  </div>
                </div>
              </div>

              {/* 메시지 목록 */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: "#2C3E50" }}>
                        🤖
                      </div>
                    )}
                    <div
                      className="max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                      style={
                        msg.role === "user"
                          ? { backgroundColor: "#2C3E50", color: "white", borderBottomRightRadius: 4 }
                          : { backgroundColor: "#F8F9FA", color: "#1a1a1a", borderBottomLeftRadius: 4 }
                      }
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "#2C3E50" }}>
                      🤖
                    </div>
                    <div className="px-4 py-3 rounded-2xl" style={{ backgroundColor: "#F8F9FA", borderBottomLeftRadius: 4 }}>
                      <LoadingDots />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* 입력창 */}
              <div className="px-6 py-4 border-t border-gray-100">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading || !apiKey}
                    placeholder={apiKey ? "메시지를 입력하세요..." : "API Key를 먼저 입력해주세요"}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 disabled:bg-gray-50"
                    style={{ "--tw-ring-color": "#2C3E50" } as React.CSSProperties}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim() || !apiKey}
                    className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-40"
                    style={{ backgroundColor: "#2C3E50", color: "white" }}
                  >
                    전송
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
