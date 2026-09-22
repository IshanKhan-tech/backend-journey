import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { setCurrentChatId } from "../chatSlice";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Home = () => {
  const {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleDeleteChat,
  } = useChat();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { chats, currentChatId, isLoading } = useSelector(
    (state) => state.chat,
  );

  const messages = currentChatId ? chats[currentChatId]?.messages || [] : [];

  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    initializeSocketConnection();
    handleGetChats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() || isLoading) return;

    const currentMessage = message.trim();

    setMessage("");

    await handleSendMessage({
      message: currentMessage,
      chatId: currentChatId,
    });
  };

  const chatList = Object.values(chats).reverse();

  return (
    <div className="h-screen w-full bg-[#f7f5f0] text-[#171717] flex overflow-hidden">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-[280px]
          bg-[#efede7]
          border-r border-[#e4dfd6]
          flex flex-col
          transform transition-transform duration-300 ease-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:z-auto md:w-[270px]
          shrink-0
        `}
      >
        {/* LOGO */}
        <div className="h-[72px] px-6 flex items-center justify-between border-b border-[#e4dfd6] shrink-0">
          <div>
            <h1 className="text-[21px] font-semibold tracking-[-0.045em]">
              Perplexity
            </h1>

            <p className="text-[10px] tracking-[0.12em] uppercase text-[#969189] mt-0.5">
              AI workspace
            </p>
          </div>

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
            onClick={() => {
              dispatch(setCurrentChatId(null));
              setIsSidebarOpen(false);
            }}
            type="button"
            className="
              w-full
              flex items-center justify-center gap-2
              px-4 py-3
              rounded-xl
              bg-[#f15a24]
              text-white
              text-sm
              font-medium
              shadow-[0_6px_18px_rgba(241,90,36,0.16)]
              hover:bg-[#df4d1b]
              active:scale-[0.98]
              transition
            "
          >
            <span className="text-lg leading-none font-light">+</span>
            <span>New Chat</span>
          </button>
        </div>

        {/* CHAT HISTORY */}
        <div className="flex-1 px-3 overflow-y-auto min-h-0">
          <div className="flex items-center justify-between px-3 pt-3 pb-2">
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#8b877f] font-medium">
              Recent
            </p>

            {chatList.length > 0 && (
              <span className="text-[10px] text-[#aaa59c]">
                {chatList.length}
              </span>
            )}
          </div>

          <div className="space-y-1 pb-4">
            {chatList.length > 0 ? (
              chatList.map((chat) => (
                <div
                  key={chat.id}
                  type="button"
                  onClick={() => {
                    handleOpenChat(chat.id, chats);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    group
                    w-full
                    text-left
                    px-3.5 py-3
                    rounded-xl
                    transition-all
                    duration-200
                    ${
                      currentChatId === chat.id
                        ? "bg-[#e2ded6] text-[#171717] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.025)]"
                        : "text-[#4d4944] hover:bg-[#e7e3dc] hover:text-[#171717]"
                    }
                  `}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`
      w-1.5 h-1.5 rounded-full shrink-0 transition
      ${
        currentChatId === chat.id
          ? "bg-[#f15a24]"
          : "bg-[#c5c0b7] group-hover:bg-[#a9a39a]"
      }
    `}
                    />

                    <span className="text-[13px] font-medium truncate leading-5 flex-1">
                      {chat.title || "Untitled Chat"}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChat(chat.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[#8b877f] hover:text-red-500 hover:bg-[#ded9d1] transition"
                      aria-label="Delete chat"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-3 py-8 text-center">
                <p className="text-[12px] text-[#aaa59c] leading-5">
                  Your conversations
                  <br />
                  will appear here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* USER */}
        <div className="p-4 border-t border-[#e4dfd6] shrink-0">
          <div className="flex items-center gap-3 px-1">
            <div className="w-9 h-9 shrink-0 rounded-full bg-[#f15a24] text-white flex items-center justify-center text-sm font-semibold shadow-sm">
              {user?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">
                {user?.username || "User"}
              </p>

              <p className="text-xs text-[#8b877f] truncate mt-0.5">
                {user?.email || ""}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 min-w-0 h-full flex flex-col">
        {/* TOP BAR */}
        <header className="h-[72px] shrink-0 border-b border-[#e4dfd6] flex items-center px-6 bg-[#f7f5f0]/95">
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
          <div className="hidden md:block min-w-0">
            <h2 className="text-sm font-medium text-[#55514b] truncate max-w-[500px]">
              {currentChatId
                ? chats[currentChatId]?.title || "Conversation"
                : "New Chat"}
            </h2>
          </div>
        </header>

        {/* CHAT CONTENT */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="max-w-[820px] mx-auto px-6 py-12">
            {/* EMPTY STATE */}
            {!currentChatId && messages.length === 0 && (
              <div className="min-h-[calc(100vh-250px)] flex items-center justify-center">
                <div className="w-full max-w-[560px] text-center">
                  <div className="mx-auto mb-6 w-12 h-12 rounded-2xl bg-[#f15a24] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(241,90,36,0.18)]">
                    <span className="text-xl">✦</span>
                  </div>

                  <h2 className="text-[30px] sm:text-[36px] font-semibold tracking-[-0.055em] text-[#201e1b]">
                    What can I help you with?
                  </h2>

                  <p className="mt-3 text-[14px] sm:text-[15px] leading-6 text-[#8b877f] max-w-[430px] mx-auto">
                    Ask a question, explore an idea, or start a conversation
                    with your AI assistant.
                  </p>
                </div>
              </div>
            )}

            {/* CHAT MESSAGES */}
            {messages.length > 0 && (
              <div className="space-y-10">
                {messages.map((msg, index) => {
                  if (msg.role === "user") {
                    return (
                      <div key={index} className="flex justify-end">
                        <div className="max-w-[75%] rounded-2xl bg-[#f15a24] text-white px-5 py-3.5 text-[15px] leading-6 shadow-sm">
                          {msg.content}
                        </div>
                      </div>
                    );
                  }

                  if (msg.role === "ai") {
                    return (
                      <div key={index} className="flex justify-start">
                        <div className="max-w-[85%] text-[#292725] text-[15px] leading-7">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({ children }) => (
                                <h1 className="text-2xl font-semibold tracking-tight mt-6 mb-3">
                                  {children}
                                </h1>
                              ),

                              h2: ({ children }) => (
                                <h2 className="text-xl font-semibold tracking-tight mt-6 mb-3">
                                  {children}
                                </h2>
                              ),

                              h3: ({ children }) => (
                                <h3 className="text-lg font-semibold mt-5 mb-2">
                                  {children}
                                </h3>
                              ),

                              p: ({ children }) => (
                                <p className="mb-4 last:mb-0">{children}</p>
                              ),

                              ul: ({ children }) => (
                                <ul className="list-disc pl-6 mb-4 space-y-1">
                                  {children}
                                </ul>
                              ),

                              ol: ({ children }) => (
                                <ol className="list-decimal pl-6 mb-4 space-y-1">
                                  {children}
                                </ol>
                              ),

                              li: ({ children }) => (
                                <li className="pl-1">{children}</li>
                              ),

                              strong: ({ children }) => (
                                <strong className="font-semibold text-[#171717]">
                                  {children}
                                </strong>
                              ),

                              code: ({ children }) => (
                                <code className="px-1.5 py-0.5 rounded-md bg-[#eae6df] text-[13px]">
                                  {children}
                                </code>
                              ),

                              blockquote: ({ children }) => (
                                <blockquote className="border-l-2 border-[#f15a24] pl-4 my-4 text-[#66615a]">
                                  {children}
                                </blockquote>
                              ),
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            )}
          </div>
        </div>

        {/* INPUT */}
        <div className="shrink-0 px-4 sm:px-6 pb-4 sm:pb-6 bg-[#f7f5f0]">
          <form onSubmit={handleSubmit} className="max-w-[820px] mx-auto">
            <div className="relative border border-none bg-[#eed9d9] rounded-2xl shadow-[0_5px_25px_rgba(0,0,0,0.045)] focus-within:border-[#f15a24] focus-within:shadow-[0_5px_28px_rgba(241,90,36,0.08)] transition-all">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything..."
                rows={1}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
                className="w-full resize-none bg-transparent outline-none px-5 pt-4 pb-14 text-[15px] leading-6 placeholder:text-[#aaa59c] disabled:opacity-60"
              />

              <div className="absolute bottom-3 right-3">
                <button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className="w-9 h-9 rounded-xl bg-[#f15a24] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#df4d1b] active:scale-95 transition"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    "↑"
                  )}
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
