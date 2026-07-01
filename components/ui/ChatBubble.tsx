"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

const QUICK = [
  "Returns & Refunds",
  "Installation",
  "Shipping & Order Status",
  "Promotions",
];

export function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* left — AI assistant */}
      <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-3">
        {open && (
          <div className="w-[min(20rem,calc(100vw-2.5rem))] overflow-hidden rounded-3xl border border-dark-line bg-dark text-cream shadow-2xl">
            <div className="flex items-center justify-between bg-accent px-5 py-4 text-dark">
              <div>
                <p className="text-lg font-extrabold">Need help?</p>
                <p className="text-sm font-medium opacity-80">Let&rsquo;s get rolling!</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-dark/10"
              >
                <X size={17} />
              </button>
            </div>
            <div className="p-4">
              <label className="flex items-center gap-2 rounded-full border border-dark-line bg-dark-2 px-3.5 py-2.5">
                <Search size={16} className="text-dark-muted" />
                <input
                  placeholder="Search for help…"
                  className="w-full bg-transparent text-sm text-cream outline-none placeholder:text-dark-muted"
                />
              </label>
              <div className="mt-3 flex flex-col gap-1">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    className="rounded-xl px-3 py-2.5 text-left text-sm text-cream transition-colors hover:bg-dark-2"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <p className="mt-3 border-t border-dark-line pt-3 text-[11px] leading-snug text-dark-muted">
                By using chat, you agree to our Privacy Policy. Powered by{" "}
                <span className="text-cream">Gladly</span>.
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Ask AI Assistant"
          className="flex items-center gap-2.5 rounded-full bg-dark py-2 pl-2 pr-4 text-left text-cream shadow-soft"
        >
          <span className="td-spin-slow flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 ring-1 ring-accent">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="10" stroke="#8ed81f" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" stroke="#8ed81f" strokeWidth="2" />
              <circle cx="12" cy="12" r="1.5" fill="#8ed81f" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className="block text-[11px] text-dark-muted">Got a question?</span>
            <span className="block text-sm font-bold">Ask AI Assistant</span>
          </span>
        </button>
      </div>

      {/* right — human agent */}
      <div className="fixed bottom-5 right-5 z-40 hidden sm:block">
        <button className="flex items-center gap-2.5 rounded-full bg-dark py-2 pl-2 pr-4 text-left text-cream shadow-soft">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-700 text-sm font-bold text-dark ring-1 ring-accent">
            JC
          </span>
          <span className="leading-tight">
            <span className="block text-[11px] text-dark-muted">Jason Carter</span>
            <span className="block text-sm font-bold">Need help? Chat with us</span>
          </span>
        </button>
      </div>
    </>
  );
}
