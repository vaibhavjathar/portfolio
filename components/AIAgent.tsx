"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Show me your AI projects",
  "What's your strongest project?",
  "Are you open to internships?",
  "What tech stack do you use?",
];

const SECTION_PROMPTS: Record<string, string> = {
  projects: "Which project are you most curious about?",
  about: "Want to know what makes Vaibhav tick?",
  experience: "Want to know what makes Vaibhav tick?",
  battlelog: "Any questions about his background?",
  contact: "Thinking of reaching out? I can help.",
  hero: "Ask me anything about Vaibhav 👋",
};

const PROACTIVE_GREETING =
  "Hey! I'm VAI — Vaibhav's AI. Want me to walk you through his best projects or answer any questions?";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function highlightProject(projectId: string) {
  const el = document.getElementById(`project-${projectId}`);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.style.transition = "box-shadow 0.3s ease";
  el.style.boxShadow = "0 0 32px rgba(0,255,65,0.35)";
  setTimeout(() => { el.style.boxShadow = ""; }, 2500);
}

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-[3px]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1 h-1 rounded-full"
          style={{ background: "var(--foreground)", opacity: 0.5 }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}

function parseBold(text: string): React.ReactNode[] {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} style={{ color: "var(--accent)", fontWeight: 600 }}>{part}</strong> : part
  );
}

function MarkdownMessage({ content }: { content: string }) {
  const lines = content.split("\n");
  const output: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length === 0) return;
    output.push(
      <ul key={output.length} className="my-1.5 space-y-1 pl-0">
        {listBuffer.map((item, i) => (
          <li key={i} className="flex gap-2 items-start">
            <span style={{ color: "var(--accent)" }} className="flex-shrink-0 leading-relaxed">▸</span>
            <span className="leading-relaxed">{parseBold(item)}</span>
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }
    const isBullet = /^[\*\-\+]\s/.test(trimmed);
    if (isBullet) {
      listBuffer.push(trimmed.replace(/^[\*\-\+]\s/, ""));
    } else {
      flushList();
      output.push(
        <p key={idx} className="leading-relaxed">{parseBold(trimmed)}</p>
      );
    }
  });

  flushList();
  return <div className="space-y-1 text-xs font-mono">{output}</div>;
}

export default function AIAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");
  const [showBubble, setShowBubble] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track current section
  useEffect(() => {
    const sections = ["projects", "about", "experience", "battlelog", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrentSection(entry.target.id || "hero");
        }
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Notification bubble: show after 8s, re-appear after 60s idle
  const scheduleBubble = useCallback((delay: number) => {
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => {
      setShowBubble(true);
    }, delay);
  }, []);

  useEffect(() => {
    scheduleBubble(8000);
    return () => { if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current); };
  }, [scheduleBubble]);

  // Auto-open at 8s with proactive greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
      setShowBubble(false);
      setMessages([{ role: "assistant", content: PROACTIVE_GREETING }]);
    }, 8000);
    return () => clearTimeout(timer);
  // only run once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (open) {
      setShowBubble(false);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
      inputRef.current?.focus();
    } else {
      scheduleBubble(60000);
    }
  }, [open, scheduleBubble]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          currentSection,
        }),
      });

      if (!res.body) throw new Error("No body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const raw = line.slice(6).trim();
            if (raw === "[DONE]") break;
            try {
              const parsed = JSON.parse(raw);
              if (parsed.type === "tool_call") {
                const { action, args } = parsed;
                if (action === "scroll_to_section") scrollToSection(args.sectionId);
                if (action === "highlight_project") highlightProject(args.projectId);
                if (action === "open_github") window.open(args.url, "_blank");
                continue;
              }
              if (parsed.delta) {
                assistantContent += parsed.delta;
                setMessages((prev) => [
                  ...prev.slice(0, -1),
                  { role: "assistant", content: assistantContent },
                ]);
              }
            } catch {
              // skip malformed chunk
            }
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const bubbleText = SECTION_PROMPTS[currentSection] ?? SECTION_PROMPTS.hero;

  return (
    <>
      {/* Notification bubble */}
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-20 z-50 max-w-[200px] px-3 py-2 rounded-sm font-mono text-xs leading-snug cursor-pointer"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--accent)",
              color: "var(--foreground)",
              boxShadow: "0 0 16px rgba(0,255,65,0.12)",
            }}
            onClick={() => { setOpen(true); setShowBubble(false); }}
          >
            {bubbleText}
            <span
              className="absolute bottom-2 -right-[9px] w-[9px] h-[9px] rotate-45"
              style={{
                background: "var(--surface)",
                borderRight: "1px solid var(--accent)",
                borderTop: "1px solid var(--accent)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button — floating bounce */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: "var(--accent)", color: "#0a0a0a" }}
        animate={{
          y: open ? 0 : [0, -7, 0],
          boxShadow: open
            ? "0 4px 24px rgba(0,255,65,0.3)"
            : [
                "0 0 0 0 rgba(0,255,65,0.4)",
                "0 0 0 14px rgba(0,255,65,0)",
                "0 0 0 0 rgba(0,255,65,0)",
              ],
        }}
        transition={{
          y: { duration: 2.5, repeat: open ? 0 : Infinity, ease: "easeInOut" },
          boxShadow: { duration: 2.5, repeat: open ? 0 : Infinity },
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI assistant"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 rounded-sm border shadow-2xl flex flex-col overflow-hidden"
            style={{
              background: "var(--surface)",
              borderColor: "var(--accent)",
              boxShadow: "0 0 48px rgba(0,255,65,0.12)",
              width: "min(580px, calc(100vw - 48px))",
              height: "min(78vh, 760px)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <motion.div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: loading ? "#f97316" : "var(--accent)" }}
                animate={{ opacity: loading ? [1, 0.4, 1] : 1 }}
                transition={{ duration: 0.8, repeat: loading ? Infinity : 0 }}
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-mono text-xs font-semibold text-[var(--foreground)]">VAI</p>
                  <span className="font-mono text-[9px] text-[var(--accent)]/60 tracking-widest">·VAIBHAV&apos;S AI</span>
                </div>
                <p className="font-mono text-[10px] text-[var(--foreground)]/40">
                  {loading ? "Thinking..." : "Ask me anything about Vaibhav"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0">
              {messages.length === 0 && (
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-xs text-[var(--foreground)]/50 mb-1">Try asking:</p>
                  {STARTERS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-left text-xs font-mono px-3 py-2 rounded-sm border transition-all duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-3 py-2.5 rounded-sm text-xs font-mono leading-relaxed ${msg.role === "user" ? "max-w-[80%]" : "w-full"}`}
                    style={{
                      background: msg.role === "user" ? "var(--accent)" : "var(--background)",
                      color: msg.role === "user" ? "#0a0a0a" : "var(--foreground)",
                      border: msg.role === "assistant" ? "1px solid var(--border)" : "none",
                    }}
                  >
                    {msg.content === "" && loading && i === messages.length - 1 ? (
                      <LoadingDots />
                    ) : msg.role === "assistant" ? (
                      <MarkdownMessage content={msg.content} />
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 px-3 py-3 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Vaibhav..."
                disabled={loading}
                className="flex-1 bg-transparent text-xs font-mono outline-none placeholder:text-[var(--foreground)]/25 text-[var(--foreground)]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-3 py-1.5 rounded-sm font-mono text-xs font-semibold transition-all duration-150 disabled:opacity-40"
                style={{ background: "var(--accent)", color: "#0a0a0a" }}
              >
                →
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
