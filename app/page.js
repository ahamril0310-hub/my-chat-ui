"use client";

export default function Home() {
  return (
    <main className="flex flex-col h-screen bg-[#0C1523] text-slate-100 font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-20 flex justify-center items-center h-11 border-b border-white/10 bg-[#0E1B2D]/80 backdrop-blur-md shadow-sm">
        <p className="text-sm text-slate-300">GPT-OSS Chat</p>
      </header>

      {/* CHAT AREA */}
      {/* CHAT AREA */}
<section className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 py-6 pb-36 space-y-6 chat-scrollbar">
  {/* Bot message */}
  <div className="flex justify-start animate-fadeIn">
    <div className="flex items-start gap-3 max-w-3xl">
      <div className="w-8 h-8 rounded-full bg-[#2DA6FF] flex items-center justify-center font-bold text-[#0C1523] text-xs shadow-sm">
        AI
      </div>
      <div className="bg-[#1A2637] border border-white/10 text-slate-100 rounded-2xl px-4 py-3 shadow-sm leading-relaxed">
        <p>Good morning! 🌤️ I’ve just processed the latest Sentinel-2 satellite imagery over South India for your EO analysis project. What would you like to examine first?</p>
      </div>
    </div>
  </div>

  {/* User message */}
  <div className="flex justify-end animate-fadeIn">
    <div className="flex items-start gap-3 max-w-3xl flex-row-reverse">
      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xs shadow-sm">
        U
      </div>
      <div className="bg-gradient-to-br from-blue-600 to-accent text-white rounded-2xl px-4 py-3 shadow-sm leading-relaxed">
        <p>Let’s start with vegetation coverage. Can you show NDVI changes from last month?</p>
      </div>
    </div>
  </div>

  {/* Bot NDVI Response */}
  <div className="flex justify-start animate-fadeIn">
    <div className="flex items-start gap-3 max-w-3xl">
      <div className="w-8 h-8 rounded-full bg-[#2DA6FF] flex items-center justify-center font-bold text-[#0C1523] text-xs shadow-sm">
        AI
      </div>
      <div className="bg-[#1A2637] border border-white/10 text-slate-100 rounded-2xl px-4 py-3 shadow-sm leading-relaxed">
        <p>Here’s the NDVI composite for March–April 🌿 The green regions indicate dense vegetation, while brownish areas represent lower biomass.</p>
        <img
          src="/images/sample.jpeg"
          alt="NDVI Map"
          className="rounded-lg mt-3 shadow-md max-h-72 object-cover"
        />
      </div>
    </div>
  </div>

  {/* User follow-up */}
  <div className="flex justify-end animate-fadeIn">
    <div className="flex items-start gap-3 max-w-3xl flex-row-reverse">
      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xs shadow-sm">
        U
      </div>
      <div className="bg-gradient-to-br from-blue-600 to-accent text-white rounded-2xl px-4 py-3 shadow-sm leading-relaxed">
        <p>Can you overlay the water bodies and urban areas for comparison?</p>
      </div>
    </div>
  </div>

  {/* Bot overlay image */}
  <div className="flex justify-start animate-fadeIn">
    <div className="flex items-start gap-3 max-w-3xl">
      <div className="w-8 h-8 rounded-full bg-[#2DA6FF] flex items-center justify-center font-bold text-[#0C1523] text-xs shadow-sm">
        AI
      </div>
      <div className="bg-[#1A2637] border border-white/10 text-slate-100 rounded-2xl px-4 py-3 shadow-sm leading-relaxed">
        <p>Sure! Here’s an overlay combining <b>NDWI (water bodies)</b> and <b>NDBI (urban zones)</b> with NDVI.</p>
        <img
          src="/images/sample.jpeg"
          alt="EO Overlay"
          className="rounded-lg mt-3 shadow-md max-h-72 object-cover"
        />
        <p className="mt-3 text-slate-300 text-sm">Blue: water | Green: vegetation | Red: built-up areas</p>
      </div>
    </div>
  </div>

  {/* User query */}
  <div className="flex justify-end animate-fadeIn">
    <div className="flex items-start gap-3 max-w-3xl flex-row-reverse">
      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xs shadow-sm">
        U
      </div>
      <div className="bg-gradient-to-br from-blue-600 to-accent text-white rounded-2xl px-4 py-3 shadow-sm leading-relaxed">
        <p>Interesting. Are there any drought-affected zones visible?</p>
      </div>
    </div>
  </div>

  {/* AI drought summary */}
  <div className="flex justify-start animate-fadeIn">
    <div className="flex items-start gap-3 max-w-3xl">
      <div className="w-8 h-8 rounded-full bg-[#2DA6FF] flex items-center justify-center font-bold text-[#0C1523] text-xs shadow-sm">
        AI
      </div>
      <div className="bg-[#1A2637] border border-white/10 text-slate-100 rounded-2xl px-4 py-3 shadow-sm leading-relaxed">
        <p>Yes. Based on <b>VHI (Vegetation Health Index)</b>, moderate drought stress is observed in Tamil Nadu’s interior regions 🌾. Here’s a spatial distribution map:</p>
        <img
          src="/images/sample.jpeg"
          alt="Drought Map"
          className="rounded-lg mt-3 shadow-md max-h-72 object-cover"
        />
      </div>
    </div>
  </div>

  {/* User final message */}
  <div className="flex justify-end animate-fadeIn">
    <div className="flex items-start gap-3 max-w-3xl flex-row-reverse">
      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xs shadow-sm">
        U
      </div>
      <div className="bg-gradient-to-br from-blue-600 to-accent text-white rounded-2xl px-4 py-3 shadow-sm leading-relaxed">
        <p>Perfect. Export this as a summary report with annotated layers for my presentation.</p>
      </div>
    </div>
  </div>

  {/* Bot closing */}
  <div className="flex justify-start animate-fadeIn">
    <div className="flex items-start gap-3 max-w-3xl">
      <div className="w-8 h-8 rounded-full bg-[#2DA6FF] flex items-center justify-center font-bold text-[#0C1523] text-xs shadow-sm">
        AI
      </div>
      <div className="bg-[#1A2637] border border-white/10 text-slate-100 rounded-2xl px-4 py-3 shadow-sm leading-relaxed">
        <p>✅ Report generation in progress.  
        You’ll receive a PDF with NDVI, NDWI, NDBI, and VHI overlays in the next few minutes.  
        Great job analyzing EO data today! 🌍</p>
      </div>
    </div>
  </div>
</section>

      {/* FLOATING INPUT BOX */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-[#0C1523] via-[#0C1523]/80 to-transparent backdrop-blur-md border-t border-white/10 py-4 px-4 sm:px-10 flex justify-center">
        <div className="relative w-full sm:w-[80%] md:w-[60%] lg:w-[50%]">
          <div className="flex items-center gap-3 bg-[#101E31]/90 border border-white/10 rounded-3xl px-5 py-3 backdrop-blur-lg shadow-lg">
            {/* Upload */}
            <button className="p-2 hover:bg-white/10 rounded-full transition">
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

            {/* Text placeholder */}
            <div className="flex-1 bg-transparent text-sm text-slate-400 select-none">
              Message GPT-OSS...
            </div>

            {/* Send */}
            <button className="p-2 bg-gradient-to-br from-accent to-blue-600 hover:from-accent/90 hover:to-blue-500 rounded-full shadow-md transition active:scale-95">
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
    </main>
  );
}
