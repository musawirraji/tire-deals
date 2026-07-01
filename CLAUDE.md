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

## Design tokens (LIGHT theme + dark feature cards + lime-green)
The Figma is a **light page** with **dark rounded feature cards** and a green
accent — NOT an all-dark theme. Two contexts:
| context | token → value | use |
|---------|---------------|-----|
| light page | `bg` `#EDEFE9` · `bg-2` `#F6F7F3` · `ink` `#14160F` · `muted` `#6B726A` · `line` `rgba(20,22,15,.10)` | page, light cards, dark text |
| dark cards | `dark` `#0C0E0B` · `dark-2/3` · `cream` `#F2F4EE` · `dark-muted` `#9AA295` · `dark-line` `rgba(255,255,255,.10)` | hero, guided shopping, expert, footer |
| accent | `accent` `#8ED81F` · `accent-bright` `#A6E635` · `accent-700` `#6FAE16` | lime; **on light use `accent-700` for text** (contrast); pills use `text-dark` |
Green top utility bar (`bg-accent`). Giant green wordmark footer. Radii: cards
18px, hero cards up to 40px, buttons full-pill. `.td-glow` green radial glow.
Home sections: Hero (dark card + radial dial) · TrustBadges · HowItWorks ·
Deals (Unsplash photos, `lib/images.ts`) · PopularTires · GuidedShopping ·
Installers (SVG map) · Promises · TreadTrial · ExpertAssistance · Journey.
Imagery = verified Unsplash IDs in `lib/images.ts` via plain `<img>` (no
next/image config). Dev gotcha: editing `@theme` tokens may need a dev-server
restart (Turbopack can serve stale compiled CSS).

## Conventions
- Mobile-first; build desktop per phase then layer mobile. Verify 360/390/768/1024+.
- URL is the source of truth for search/filter state (shareable, survives refresh).
- Server components by default; `'use client'` only where interactive.
- Conventional Commits, no AI attribution. Commit per phase. `npm run build` is the gate.
