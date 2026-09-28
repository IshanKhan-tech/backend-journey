import React, { useState } from "react";
import axios from "axios";
import { ArrowUp, Sparkles, RotateCcw, Copy, Check } from "lucide-react";

const dummyResponses = {
  mistral: {
    model: "Mistral",
    response:
      "Binary search is the most efficient approach here because the array is already sorted. We compare the target with the middle element and eliminate half of the remaining search space on every iteration.",
    complexity: "O(log n)",
  },

  cohere: {
    model: "Cohere",
    response:
      "Since the array is sorted, we can use binary search instead of checking every element. Start from the middle, compare it with the target, and continue searching only in the relevant half.",
    complexity: "O(log n)",
  },

  judge: {
    solution_1_score: 8.8,
    solution_2_score: 8.1,
    solution_1_reasoning:
      "The response correctly identifies binary search and explains why the sorted property allows half of the search space to be removed at every step.",
    solution_2_reasoning:
      "The approach is correct and concise, although the explanation contains fewer implementation details than the first solution.",
  },
};

function ModelResponse({ model, response, complexity }) {
  const [copied, setCopied] = useState(false);

  const copyResponse = async () => {
    await navigator.clipboard.writeText(response);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
            <Sparkles size={13} className="text-zinc-400" />
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-200">{model}</p>
            <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-600">
              AI response
            </p>
          </div>
        </div>

        <button
          onClick={copyResponse}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-white/[0.05] hover:text-zinc-300"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[#111113] px-5 py-5 sm:px-6">
        <p className="text-[14px] leading-7 text-zinc-400">{response}</p>

        <div className="mt-5 flex items-center gap-2">
          <span className="rounded-md border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-zinc-600">
            Complexity
          </span>

          <span className="font-mono text-xs text-zinc-400">{complexity}</span>
        </div>
      </div>
    </div>
  );
}

function JudgeResult() {
  const judge = dummyResponses.judge;

  return (
    <div className="mt-10 pb-24">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
          <Sparkles size={13} className="text-zinc-400" />
        </div>

        <div>
          <p className="text-sm font-medium text-zinc-200">Gemini Judge</p>
          <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-600">
            Evaluation
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101012]">
        {/* scores */}
        <div className="grid grid-cols-2 border-b border-white/[0.06]">
          <div className="border-r border-white/[0.06] p-5 sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-600">
              Mistral
            </p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-3xl font-medium tracking-[-0.04em] text-white">
                {judge.solution_1_score}
              </span>
              <span className="mb-1 text-xs text-zinc-600">/ 10</span>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-600">
              Cohere
            </p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-3xl font-medium tracking-[-0.04em] text-white">
                {judge.solution_2_score}
              </span>
              <span className="mb-1 text-xs text-zinc-600">/ 10</span>
            </div>
          </div>
        </div>

        {/* reasoning */}
        <div className="grid md:grid-cols-2">
          <div className="border-b border-white/[0.06] p-5 md:border-b-0 md:border-r sm:p-6">
            <p className="mb-3 text-[10px] uppercase tracking-[0.16em] text-zinc-600">
              Mistral reasoning
            </p>

            <p className="text-xs leading-6 text-zinc-500">
              {judge.solution_1_reasoning}
            </p>
          </div>

          <div className="p-5 sm:p-6">
            <p className="mb-3 text-[10px] uppercase tracking-[0.16em] text-zinc-600">
              Cohere reasoning
            </p>

            <p className="text-xs leading-6 text-zinc-500">
              {judge.solution_2_reasoning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
  const problem = input.trim();

  if (!problem || loading) return;

  setInput("");
  setLoading(true);

  // User message immediately save karo
  setMessages((prev) => [
    ...prev,
    {
      id: Date.now(),
      type: "user",
      content: problem,
    },
  ]);

  try {
    const response = await axios.post("http://localhost:3000/invoke", {
      problem,
    });

    const data = response.data;

    console.log("API Response:", data);

    // Actual AI response save karo
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        type: "solutions",
        data: data.result,
      },
    ]);
  } catch (error) {
  console.error("API Error:", error.response?.data);
  console.error("Status:", error.response?.status);

  setMessages((prev) => [
    ...prev,
    {
      id: Date.now() + 1,
      type: "error",
      content:
        error.response?.data?.message ||
        "Something went wrong while generating the solutions.",
    },
  ]);
} finally {
    setLoading(false);
  }
};

  const resetChat = () => {
    setMessages([]);
    setInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">
      {/* subtle background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-350px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-violet-500/[0.045] blur-[150px]" />
      </div>

      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/[0.06] bg-[#0b0b0c]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-5xl items-center justify-between px-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
              <Sparkles size={14} />
            </div>

            <div>
              <p className="text-sm font-medium tracking-[-0.02em]">
                Model Arena
              </p>
            </div>
          </div>

          {hasMessages && (
            <button
              onClick={resetChat}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-600 transition hover:bg-white/[0.04] hover:text-zinc-300"
            >
              <RotateCcw size={13} />
              New problem
            </button>
          )}
        </div>
      </header>

      {/* Main conversation */}
      <div className="relative mx-auto max-w-3xl px-5 pb-36 pt-[68px] sm:px-6">
        {!hasMessages ? (
          /* Empty state */
          <div className="flex min-h-[calc(100vh-180px)] flex-col items-center justify-center">
            <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.035]">
              <Sparkles size={19} className="text-zinc-300" />
            </div>

            <h1 className="text-center text-3xl font-medium tracking-[-0.045em] text-zinc-100 sm:text-4xl">
              Compare AI solutions.
            </h1>

            <p className="mt-4 max-w-md text-center text-sm leading-6 text-zinc-600">
              Give the models a problem and let an independent judge evaluate
              their responses.
            </p>
          </div>
        ) : (
          <div className="pt-10">
            {messages.map((message) => {
              if (message.type === "user") {
                return (
                  <div key={message.id} className="mb-12 flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[#202023] px-5 py-3.5 sm:max-w-[75%]">
                      <p className="text-sm leading-6 text-zinc-200">
                        {message.content}
                      </p>
                    </div>
                  </div>
                );
              }

              if (message.type === "solutions") {
                return (
                  <div key={message.id}>
                    <ModelResponse {...dummyResponses.mistral} />

                    <ModelResponse {...dummyResponses.cohere} />

                    <JudgeResult />
                  </div>
                );
              }

              return null;
            })}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0b0b0c] via-[#0b0b0c]/95 to-transparent" />

        <div className="relative mx-auto max-w-3xl px-5 pb-5 sm:px-6">
          <div className="rounded-2xl border border-white/[0.09] bg-[#111113] shadow-2xl shadow-black/30">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              rows={1}
              placeholder={
                loading
                  ? "Generating solutions..."
                  : "Describe a problem to compare..."
              }
              className="max-h-32 min-h-[56px] w-full resize-none bg-transparent px-5 py-4 pr-14 text-sm leading-6 text-zinc-200 outline-none placeholder:text-zinc-600 disabled:opacity-60"
            />

            <div className="flex items-center justify-between px-3 pb-3">
              <span className="hidden pl-2 text-[10px] text-zinc-700 sm:block">
                Enter to send · Shift + Enter for new line
              </span>

              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-white/[0.07] disabled:text-zinc-600"
              >
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-500 border-t-transparent" />
                ) : (
                  <ArrowUp size={16} strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>

          <p className="mt-2 text-center text-[9px] tracking-[0.08em] text-zinc-700">
            Responses are generated independently and evaluated by a judge
            model.
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
