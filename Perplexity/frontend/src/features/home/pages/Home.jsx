import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";

const Home = () => {
  const { initializeSocketConnection } = useChat();
  const { user } = useSelector((state) => state.auth);

  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    initializeSocketConnection;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    console.log(message);
    setMessage("");
  };

  return (
    <div className="h-screen w-full bg-[#f7f5f0] text-[#171717] flex overflow-hidden">

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-[280px]
          bg-[#efede7]
          border-r border-[#e7e2d9]
          flex flex-col
          transform transition-transform duration-300 ease-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:z-auto md:w-[260px]
          shrink-0
        `}
      >
        {/* LOGO */}
        <div className="h-[72px] px-6 flex items-center justify-between border-b border-[#e7e2d9] shrink-0">
          <h1 className="text-[22px] font-semibold tracking-[-0.04em]">
            Perplexity
          </h1>

          {/* MOBILE CLOSE */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-xl text-[#55514b] hover:bg-[#e5e1d9] transition"
          >
            ×
          </button>
        </div>

        {/* NEW CHAT */}
        <div className="p-4 shrink-0">
          <button
            type="button"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#f15a24] text-white text-sm font-medium hover:bg-[#df4d1b] transition"
          >
            <span className="text-lg leading-none">+</span>
            New Chat
          </button>
        </div>

        {/* CHAT HISTORY */}
        <div className="flex-1 px-3 overflow-y-auto min-h-0">
          <p className="px-3 pt-3 pb-2 text-[11px] uppercase tracking-[0.12em] text-[#8b877f]">
            Recent
          </p>

          <div className="space-y-1">
            <button
              type="button"
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#44413d] hover:bg-[#e5e1d9] transition truncate"
            >
              Explain React hooks
            </button>

            <button
              type="button"
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#44413d] hover:bg-[#e5e1d9] transition truncate"
            >
              How does JWT work?
            </button>

            <button
              type="button"
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#44413d] hover:bg-[#e5e1d9] transition truncate"
            >
              MongoDB authentication
            </button>

            <button
              type="button"
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#44413d] hover:bg-[#e5e1d9] transition truncate"
            >
              JavaScript closures
            </button>
          </div>
        </div>

        {/* USER */}
        <div className="p-4 border-t border-[#e7e2d9] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 rounded-full bg-[#f15a24] text-white flex items-center justify-center text-sm font-semibold">
              {user?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.username || "User"}
              </p>

              <p className="text-xs text-[#8b877f] truncate">
                {user?.email || ""}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 min-w-0 h-full flex flex-col">

        {/* TOP BAR */}
        <header className="h-[72px] shrink-0 border-b border-[#e7e2d9] flex items-center px-6">

          {/* MOBILE MENU */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden w-9 h-9 -ml-2 mr-3 rounded-lg flex items-center justify-center text-[#44413d] hover:bg-[#e9e5dd] transition"
            aria-label="Open sidebar"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>

          {/* MOBILE TITLE */}
          <h1 className="md:hidden text-[20px] font-semibold tracking-[-0.04em]">
            Perplexity
          </h1>

          {/* DESKTOP TITLE */}
          <h2 className="hidden md:block text-sm font-medium text-[#55514b]">
            New Chat
          </h2>
        </header>

        {/* CHAT CONTENT */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="max-w-[820px] mx-auto px-6 py-12">

            <div className="min-h-[55vh] flex flex-col items-center justify-center text-center">

              <div className="w-12 h-12 rounded-2xl bg-[#f15a24] text-white flex items-center justify-center mb-6">
                <span className="text-xl font-semibold">
                  P
                </span>
              </div>

              <h1 className="text-3xl font-semibold tracking-[-0.04em]">
                What can I help you with?
              </h1>

              <p className="mt-3 text-sm text-[#858078]">
                Ask anything and start a new conversation.
              </p>

            </div>

          </div>
        </div>

        {/* INPUT */}
        <div className="shrink-0 px-6 pb-6">
          <form
            onSubmit={handleSubmit}
            className="max-w-[820px] mx-auto"
          >
            <div className="relative border border-[#dcd7ce] bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] focus-within:border-[#f15a24] transition">

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything..."
                rows={1}
                className="w-full resize-none bg-transparent outline-none px-5 pt-4 pb-14 text-[15px] placeholder:text-[#aaa59c]"
              />

              <div className="absolute bottom-3 right-3">
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="w-9 h-9 rounded-xl bg-[#f15a24] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#df4d1b] transition"
                  aria-label="Send message"
                >
                  ↑
                </button>
              </div>

            </div>

            <p className="text-center text-[11px] text-[#aaa59c] mt-3">
              Perplexity can make mistakes. Check important information.
            </p>
          </form>
        </div>

      </main>
    </div>
  );
};

export default Home;