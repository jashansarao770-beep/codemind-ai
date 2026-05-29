import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are CodeMind — an elite AI coding assistant expert in ALL programming languages. You can write code, fix bugs, explain code, and suggest best practices. Always use markdown code blocks. Respond in the same language the user writes in.`;

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput("");
    const history = [...messages, { role: "user", content: msg }];
    setMessages(history);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM_PROMPT, messages: history }),
      });
      const data = await res.json();
      const reply = data.content?.map(c => c.text || "").join("") || "Error aa gaya.";
      setMessages([...history, { role: "assistant", content: reply }]);
    } catch { setMessages([...history, { role: "assistant", content: "Network error!" }]); }
    setLoading(false);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#0a0a0a", color: "#fff", fontFamily: "system-ui" }}>
      <div style={{ padding: "16px", background: "#111", borderBottom: "1px solid #222", fontWeight: 800, fontSize: 20 }}>
        ⚡ Code<span style={{ color: "#6366f1" }}>Mind</span> AI
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {messages.length === 0 && <div style={{ textAlign: "center", marginTop: 60, color: "#555" }}>Kuch bhi pocho — code likhwao, debug karo! 🚀</div>}
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
            <div style={{ maxWidth: "80%", background: m.role === "user" ? "#6366f1" : "#1a1a1a", border: m.role === "assistant" ? "1px solid #333" : "none", borderRadius: 12, padding: "10px 14px", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ color: "#6366f1", padding: 8 }}>⚡ Soch raha hoon...</div>}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: 12, background: "#111", borderTop: "1px solid #222", display: "flex", gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Code likhwao ya kuch bhi pocho..."
          style={{ flex: 1, background: "#1a1a1a", border: "1px solid #333", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14 }} />
        <button onClick={send} disabled={loading} style={{ background: "#6366f1", border: "none", borderRadius: 10, padding: "10px 18px", color: "#fff", cursor: "pointer", fontSize: 16 }}>↑</button>
      </div>
    </div>
  );
}
