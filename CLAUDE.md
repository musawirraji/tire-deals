# TireDeals — Fitment Demo

A build-first demo proving the hardest part of a SimpleTire-style brief: **vehicle
fitment search + faceted results**, branded to the client's TireDeals redesign.
Proposal weapon, not the production site. Mock data, approximate visual match.

> NOTE: This project intentionally diverges from the global SCSS/feature-sliced
> conventions. It uses **Tailwind** (to mirror the client's repos) and a flat
> Next.js App Router structure. The senior move here is the provider interface,
> not the folder taxonomy.

## Scope
IN: home hero + radial search dial, results page w/ faceted filters + fitment
context, basic product detail w/ tabs.
OUT: checkout, payments, auth, inventory, CMS, accounts. If a phase tempts scope
creep, stop and flag it.

## Stack
- Next.js 16 (App Router, RSC) — `params`/`searchParams` are **async Promises**, await them.
- TypeScript strict, Tailwind v4 (CSS `@theme` in `app/globals.css`, no config file).
- `lucide-react` for icons. Inline SVG tire (`/public/tire.svg`) — no external assets.
- Deploy on Vercel. No DB, no API keys to run.

## Data layer (the proposal talking point)
`lib/tire-provider/` defines `TireProvider` (interface) + `mockProvider` (local
JSON in `data/`). App imports `tireProvider` from the barrel — never the mock
directly. AutoSync feed implements the same interface in production: swapping it
is an implementation detail, not a rewrite. 84 tires / 8 brands / 11 vehicle
fitments; every vehicle returns fitting stock.

## Design tokens (dark + lime-green)
| token | value | use |
|-------|-------|-----|
| `bg` | `#0B0C0B` | page background |
| `surface` / `surface-2` | `#161816` / `#1F221F` | cards, panels |
| `line` | `rgba(255,255,255,.10)` | thin borders |
| `ink` / `muted` | `#F0F0F0` / `#9AA29A` | text |
| `accent` / `accent-700` | `#B6F23B` / `#86B81F` | lime brand accent |
Radii: cards 16px, large containers up to 80px, buttons full-pill. Green radial
glow behind hero (`.td-glow`). Accent pills have dark text. Bold grotesk
headings (Inter stand-in). Use Tailwind classes like `bg-bg`, `text-accent`, etc.

## Conventions
- Mobile-first; build desktop per phase then layer mobile. Verify 360/390/768/1024+.
- URL is the source of truth for search/filter state (shareable, survives refresh).
- Server components by default; `'use client'` only where interactive.
- Conventional Commits, no AI attribution. Commit per phase. `npm run build` is the gate.
