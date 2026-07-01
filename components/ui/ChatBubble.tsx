"use client";

import { useState } from "react";
import { MessageCircle, Search, X } from "lucide-react";

const QUICK = [
  "Returns & Refunds",
  "Installation",
  "Shipping & Order Status",
  "Promotions",
];

export function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[min(20rem,calc(100vw-2.5rem))] overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl">
          <div className="bg-accent px-5 py-4 text-bg">
            <p className="text-lg font-extrabold">Need help?</p>
            <p className="text-sm font-medium opacity-80">Let&rsquo;s get rolling!</p>
          </div>
          <div className="p-4">
            <label className="flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3.5 py-2.5">
              <Search size={16} className="text-muted" />
              <input
                placeholder="Search for help…"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
              />
            </label>
            <div className="mt-3 flex flex-col gap-1.5">
              {QUICK.map((q) => (
                <button
                  key={q}
                  className="rounded-xl px-3 py-2.5 text-left text-sm text-ink transition-colors hover:bg-surface-2"
                >
                  {q}
                </button>
              ))}
            </div>
            <p className="mt-3 border-t border-line pt-3 text-[11px] leading-snug text-muted">
              By using chat, you agree to our Privacy Policy. Powered by{" "}
              <span className="text-ink">Gladly</span>.
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className="flex items-center gap-2 rounded-full bg-accent px-4 py-3.5 text-sm font-bold text-bg shadow-glow transition-transform hover:scale-105"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
        <span className="hidden sm:inline">
          {open ? "Close" : "Ask AI Assistant"}
        </span>
      </button>
    </div>
  );
}
