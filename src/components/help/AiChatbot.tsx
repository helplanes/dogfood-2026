"use client";

import React, { useState, useRef, useEffect } from "react";

const PRESET_QUERIES = [
  "Check GPU credit refill rate",
  "Explain Z-score normalization",
  "Escrow multi-sig requirements",
  "How to appeal dispute",
];

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp?: string;
}

export default function AiChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "user",
      text: "How does double-blind identity obfuscation work during review?",
    },
    {
      id: "2",
      sender: "bot",
      text: "All PR commits and author metadata are cryptographically masked with random hexadecimal seeds (e.g. PRJ-042). Jurors evaluate raw code in hermetic microVMs without viewing team identities until deliberation lock ends.",
    },
    {
      id: "3",
      sender: "user",
      text: "What happens if my container exits with a non-zero code during pre-flight sanity checks?",
    },
    {
      id: "4",
      sender: "bot",
      text: "A 2-hour grace period window opens on your builder console to patch Dockerfile/dogfood.yml configurations before juror assignments are locked. Pre-flight error telemetry will highlight failed exit codes.",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "Our protocol daemon confirms: this action is fully deterministic and logged under cryptographic attestation.";
      if (query.toLowerCase().includes("gpu")) {
        botResponse = "GPU credits are seeded at $150 per verified team member. Auto-replenishment occurs at H24 upon verifying 70% active utilization without idle memory allocation.";
      } else if (query.toLowerCase().includes("z-score") || query.toLowerCase().includes("normalization")) {
        botResponse = "The normalization engine calculates z = (x - μ) / σ per reviewer cohort, re-centering harsh scoring curves to prevent individual juror grade skew.";
      } else if (query.toLowerCase().includes("escrow") || query.toLowerCase().includes("multi-sig")) {
        botResponse = "Escrow is held in native USDC smart contracts requiring 5 of 7 Protocol Lead signatures before automatic dispersion at Hour 66.";
      } else if (query.toLowerCase().includes("appeal") || query.toLowerCase().includes("dispute")) {
        botResponse = "Appeals open strictly between H60 and H64. Initiating an appeal queues your build for a dual-juror consensus replay inside our recorded VM sandbox.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: botResponse,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div className="p-6 sm:p-8 rounded-3xl bg-[#11141c] border border-stone-800 shadow-md space-y-6">
        
        {/* Assistant Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#fe330a]/10 border border-[#fe330a]/30 flex items-center justify-center text-lg text-[#fe330a]">
              &#9881;
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-white">AI Protocol Assistant</h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans">
                Ask instant questions about the DOGFOOD 2026 handbook, double-blind judging rubrics, microVM sandboxes, and escrow release.
              </p>
            </div>
          </div>

          <div className="text-[11px] font-mono text-stone-500 flex items-center gap-1">
            <span>Handbook Index: v2.6 // Verified</span>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">SUGGESTED INQUIRIES:</span>
          <div className="flex flex-wrap gap-2">
            {PRESET_QUERIES.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1 rounded-full bg-[#0c0e13] hover:bg-[#fe330a]/10 border border-stone-800 hover:border-[#fe330a]/50 text-xs font-mono text-stone-400 hover:text-[#fe330a] transition-all flex items-center gap-1.5 text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Stream Window */}
        <div className="h-72 overflow-y-auto space-y-4 p-4 rounded-2xl bg-[#0c0e13] border border-stone-800/80">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
            >
              <span className="text-[10px] font-mono text-stone-500 mb-1 px-1">
                {m.sender === "user" ? "Verified Participant" : "DOGFOOD Protocol Copilot"}
              </span>
              <div
                className={`max-w-xl p-3.5 rounded-2xl text-xs leading-relaxed font-sans ${
                  m.sender === "user"
                    ? "bg-[#fe330a] text-white rounded-br-none shadow-sm"
                    : "bg-[#181c26] text-stone-300 border border-stone-800 rounded-bl-none shadow-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-mono text-stone-500 mb-1 px-1">DOGFOOD Protocol Copilot</span>
              <div className="p-3 rounded-2xl bg-[#181c26] border border-stone-800 rounded-bl-none text-xs text-stone-400 font-mono flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#fe330a] animate-bounce" />
                Querying protocol handbook index...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 pt-1"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask a question about the DOGFOOD 2026 protocol or build specs..."
            className="flex-1 px-4 py-3 rounded-xl bg-[#0c0e13] border border-stone-800 text-xs font-sans text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-[#fe330a] transition-colors"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-[#fe330a]/20 shrink-0"
          >
            Send &rarr;
          </button>
        </form>

        <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 pt-1">
          <span>Powered by DOGFOOD 2026 Vector Index</span>
          <span>Sub-second response time</span>
        </div>

      </div>
    </section>
  );
}
