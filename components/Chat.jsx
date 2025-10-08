"use client";

import { useEffect, useRef, useState } from "react";

const initialMessages = [
  { id: 1, who: "bot", text: "Hello 👋 — I’m ChatGPT. How can I assist you today?" },
  { id: 2, who: "user", text: "Show me a sample image." },
  { id: 3, who: "bot", text: "Sure! Here’s a sample 🌍", image: "/images/sample.jpeg" },
];

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg = { id: Date.now(), who: "user", text: input };
    setMessages((p) => [...p, msg]);
    setInput("");

    setTimeout(() => {
      setMessages((p) => [
        ...p,
        { id: Date.now() + 1, who: "bot", text: "This is a simulated AI reply ✨" },
      ]);
    }, 800);
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const msg = { id: Date.now(), who: "user", image: url, text: file.name };
    setMessages((p) => [...p, msg]);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0C1523]">
      {/* Header */}
      <header className="sticky top-0 z-20 flex justify-center border-b border-white/10 bg-[#0E1B2D]/80 backdrop-blur-md py-3">
        <p className="text-xs text-slate-400">ChatGPT Clone • Dark Blue Theme</p>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 py-6 space-y-5 chat-scrollbar">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.who === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
          >
            <div className="flex items-start gap-3 max-w-2xl">
              {/* Avatar */}
              {m.who === "bot" && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent text-[#0C1523] font-bold text-sm">
                  AI
                </div>
              )}

              {/* Bubble */}
              <div
                className={`rounded-2xl px-4 py-3 text-sm shadow-md ${
                  m.who === "user"
                    ? "bg-gradient-to-br from-blue-600 to-accent text-white rounded-br-sm"
                    : "bg-white/10 text-slate-100 border border-white/10 rounded-bl-sm"
                }`}
              >
                {m.image && (
                  <img
                    src={m.image}
                    alt="upload"
                    className="rounded-lg mb-2 max-h-72 object-cover"
                  />
                )}
                <p>{m.text}</p>
              </div>

              {/* Avatar */}
              {m.who === "user" && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 text-white font-semibold text-sm">
                  U
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </main>

     {/* Floating input box */}
<div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] md:w-[70%] lg:w-[60%] z-50">
  <div className="flex items-center gap-3 bg-[#101E31]/80 border border-white/10 rounded-3xl px-5 py-3 backdrop-blur-xl shadow-2xl">
    {/* Upload */}
    <button
      onClick={() => fileInputRef.current?.click()}
      className="p-2 hover:bg-white/10 rounded-full transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-slate-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M21.44 11.05l-9.9 9.9a5.5 5.5 0 01-7.78-7.78l9.9-9.9a4 4 0 015.66 5.66L9.2 19.8a2.5 2.5 0 11-3.54-3.54l9.9-9.9"
        />
      </svg>
    </button>
    <input type="file" ref={fileInputRef} onChange={handleFile} className="hidden" />

    {/* Text Input */}
    <input
      type="text"
      placeholder="Message ChatGPT..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
    />

    {/* Send */}
    <button
      onClick={sendMessage}
      className="p-2 bg-gradient-to-br from-accent to-blue-600 hover:from-accent/90 hover:to-blue-500 rounded-full shadow-md transition active:scale-95"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 10l9-6 9 6-9 6-9-6zm9 6v4m0 0l-3-2m3 2l3-2"
        />
      </svg>
    </button>
  </div>
</div>

    </div>
  );
}
