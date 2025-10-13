"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const chatRef = useRef(null);
  const fileInputRef = useRef(null);

  // Chat messages
  const [messages, setMessages] = useState([
    {
      who: "ai",
      text:
        "🌍 Welcome — upload an EO image, ask a question about it, and I’ll simulate an analysis.",
    },
  ]);

  const [input, setInput] = useState("");
  const [currentPreview, setCurrentPreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingDots, setThinkingDots] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  // Auto-scroll
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking, thinkingDots]);

  // Poll backend status
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/status");
        const data = await res.json();
        setIsConnected(true);
        setModelLoaded(data.model_loaded);
      } catch {
        setIsConnected(false);
        setModelLoaded(false);
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 8000);
    return () => clearInterval(interval);
  }, []);

  // Convert file → base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  // Handle image upload
  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await toBase64(file);
    setCurrentPreview({ dataUrl, name: file.name });
    e.target.value = "";
  };

  // Start "Thinking..." animation
  const startThinking = () =>
    new Promise((resolve) => {
      setIsThinking(true);
      let idx = 0;
      const interval = setInterval(() => {
        idx = (idx + 1) % 4;
        setThinkingDots(".".repeat(idx));
      }, 400);
      setTimeout(() => {
        clearInterval(interval);
        setIsThinking(false);
        setThinkingDots("");
        resolve();
      }, 3000);
    });

  // Send message
  const sendMessage = async () => {
    if (isSending) return;
    if (!currentPreview) {
      alert("Please upload an image first.");
      return;
    }
    if (!input.trim()) {
      alert("Please enter a question.");
      return;
    }

    setIsSending(true);

    // If model not loaded → immediate error
    if (!modelLoaded) {
      setMessages((prev) => [
        ...prev,
        { who: "user", text: input, image: currentPreview.dataUrl },
        { who: "ai", text: "❌ Model not loaded. Please load the model first." },
      ]);
      setInput("");
      setCurrentPreview(null);
      setIsSending(false);
      return;
    }

    // Send user message
    setMessages((prev) => [
      ...prev,
      { who: "user", text: input, image: currentPreview.dataUrl },
    ]);

    setInput("");
    setCurrentPreview(null);

    // Show AI thinking
    setMessages((prev) => [...prev, { who: "ai", text: "🤔 Thinking" }]);
    await startThinking();

    try {
      const res = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: input,
          filename: currentPreview?.name || "",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { who: "ai", text: data.analysis },
        ]);
      } else {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { who: "ai", text: `❌ ${data.error || "Unknown error"}` },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { who: "ai", text: "❌ Failed to connect to backend." },
      ]);
    }

    setIsSending(false);
  };

  // Load/unload model
  const toggleModel = async () => {
    const action = modelLoaded ? "unload" : "load";
    try {
      const res = await fetch(`http://127.0.0.1:5000/${action}`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        setModelLoaded(action === "load");
        console.log(data.message);
      }
    } catch (err) {
      console.error(`Failed to ${action} model`, err);
    }
  };

  return (
    <main className="flex flex-col h-screen bg-[#0A0F1A] text-slate-100 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 flex justify-between items-center h-12 border-b border-white/10 bg-[#0E1B2D]/80 backdrop-blur-lg shadow-sm px-4 sm:px-8">
        <h1 className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
          EO Analysis Assistant (Offline Mode)
        </h1>

        <div className="flex items-center gap-3">
          {/* Status */}
          <div
            className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full border ${
              isConnected
                ? "text-green-400 border-green-500/50 bg-green-900/20"
                : "text-red-400 border-red-500/50 bg-red-900/20"
            }`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: isConnected ? "#22c55e" : "#f87171",
              }}
            ></span>
            {isConnected ? "Backend: Connected" : "Backend: Offline"}
          </div>

          {/* Load / Unload */}
          <button
            onClick={toggleModel}
            className={`text-xs font-semibold px-3 py-1 rounded-md border transition-all duration-300 ${
              modelLoaded
                ? "bg-red-500/20 hover:bg-red-500/40 text-red-300 border-red-400/40"
                : "bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 border-blue-400/40"
            }`}
          >
            {modelLoaded ? "Unload Model" : "Load Model"}
          </button>
        </div>
      </header>

      {/* Chat */}
      <section
        ref={chatRef}
        className="flex-1 overflow-y-auto px-6 sm:px-12 pt-10 pb-40 space-y-6 chat-scrollbar"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.who === "user" ? "justify-end" : "justify-start"
            } animate-fadeIn`}
          >
            <div
              className={`max-w-2xl rounded-2xl text-sm leading-relaxed shadow-md transition-all duration-300 ${
                m.who === "user"
                  ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-br-md px-6 py-4"
                  : "bg-[#111C2B] border border-white/10 text-slate-100 rounded-bl-md px-6 py-4"
              }`}
            >
              <p className="whitespace-pre-wrap text-[15px] tracking-wide">
                {m.text}
                {m.text === "🤔 Thinking" && <span>{thinkingDots}</span>}
              </p>
              {m.image && (
                <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#0E1627] shadow-lg hover:shadow-xl transition">
                  <img
                    src={m.image}
                    alt="Uploaded"
                    className="w-full max-w-md object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Floating Input */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] z-50">
        <div className="flex flex-col gap-3 bg-[#101E31]/80 border border-white/10 rounded-full px-6 py-4 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_4px_40px_rgba(0,0,0,0.6)]">
          {currentPreview && (
            <div className="w-full flex items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-3 flex-1 bg-[#0E1627] border border-white/10 rounded-xl p-2 shadow-inner">
                <div className="w-14 h-14 flex-shrink-0 overflow-hidden rounded-md border border-white/10">
                  <img
                    src={currentPreview.dataUrl}
                    alt={currentPreview.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <p className="text-xs text-slate-200 truncate font-medium">
                    {currentPreview.name}
                  </p>
                  <p className="text-[10px] text-slate-400 italic">Ready for analysis</p>
                </div>
              </div>

    <button
      onClick={() => setCurrentPreview(null)}
      className="text-[11px] px-3 py-2 rounded-md bg-red-600/20 hover:bg-red-600/40 text-red-300 font-medium whitespace-nowrap"
    >
      Remove
    </button>
  </div>
)}


          <div className="flex items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 bg-[#1E2B40] hover:bg-[#24354D] rounded-full transition border border-white/10 shadow-md hover:shadow-lg"
            >
              📎
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageSelect}
              className="hidden"
            />

            <input
              type="text"
              placeholder="Ask about the image..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-transparent text-sm sm:text-base text-slate-100 placeholder:text-slate-400 focus:outline-none"
            />

            <button
              onClick={sendMessage}
              disabled={isSending}
              className="p-3 bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-full shadow-lg transition active:scale-95"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
