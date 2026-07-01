"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  MapPin,
  Menu,
  Phone,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const LINKS = [
  { label: "About us", href: "/" },
  { label: "Shop Tires", href: "/results", dropdown: true },
  { label: "Deals", href: "/", dropdown: true },
  { label: "Help", href: "/", dropdown: true },
  { label: "Blog", href: "/" },
];

export function MainNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 md:px-6">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-black/5 hover:text-ink"
              >
                {l.label}
                {l.dropdown && <ChevronDown size={14} className="opacity-50" />}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 text-sm font-medium text-ink md:flex">
            <MapPin size={16} className="text-accent-700" />
            75270
          </span>
          <button
            aria-label="Cart"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-line text-ink/70 transition-colors hover:border-ink hover:text-ink md:flex"
          >
            <ShoppingCart size={18} />
          </button>
          <button
            aria-label="Account"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-line text-ink/70 transition-colors hover:border-ink hover:text-ink md:flex"
          >
            <User size={18} />
          </button>
          <a
            href="tel:8664400177"
            className="hidden items-center gap-2 rounded-full border border-ink px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-cream md:flex"
          >
            <Phone size={15} />
            866-440-0177
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-bg px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-black/5"
                >
                  {l.label}
                  {l.dropdown && <ChevronDown size={16} className="opacity-50" />}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
            <a
              href="tel:8664400177"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-bold text-dark"
            >
              <Phone size={15} />
              866-440-0177
            </a>
            <span className="flex items-center gap-1.5 rounded-full border border-line px-3 py-3 text-sm text-ink">
              <MapPin size={15} className="text-accent-700" />
              75270
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
