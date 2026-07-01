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
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 md:px-6">
        <Logo />

        {/* desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="flex items-center gap-1 rounded-full px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                {l.label}
                {l.dropdown && <ChevronDown size={14} className="opacity-60" />}
              </Link>
            </li>
          ))}
        </ul>

        {/* right cluster */}
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-2 text-sm text-muted md:flex">
            <MapPin size={15} className="text-accent" />
            75270
          </span>
          <button
            aria-label="Cart"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink md:flex"
          >
            <ShoppingCart size={18} />
          </button>
          <button
            aria-label="Account"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink md:flex"
          >
            <User size={18} />
          </button>
          <a
            href="tel:8664400177"
            className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-bg transition-transform hover:scale-[1.03] md:flex"
          >
            <Phone size={15} />
            866-440-0177
          </a>

          {/* mobile menu toggle */}
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

      {/* mobile panel */}
      {open && (
        <div className="border-t border-line bg-bg px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-base text-ink hover:bg-surface"
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
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-bold text-bg"
            >
              <Phone size={15} />
              866-440-0177
            </a>
            <span className="flex items-center gap-1.5 rounded-full border border-line px-3 py-3 text-sm text-muted">
              <MapPin size={15} className="text-accent" />
              75270
            </span>
          </div>
          <p className="mt-3 text-center text-xs text-muted">
            Check back with us! We&rsquo;re all currently busy.
          </p>
        </div>
      )}
    </header>
  );
}
