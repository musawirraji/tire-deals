# TireDeals — Fitment Search Demo

A build-first demo that proves the hardest, most-doubted part of a SimpleTire-style
brief: **vehicle fitment search and faceted results**, branded to match a client's
TireDeals redesign.

This is a **proposal/capability demo**, not the production site. It was recreated
from design screenshots (no Figma file access) to show what a real build looks
like. Mock data, approximate visual match, self-contained — runs and deploys in
minutes with no keys.

## What it demonstrates

- **Radial search dial** — Vehicle / Size / Type / Brand, with cascading
  Year → Make → Model → Trim selects.
- **Results page** — real faceted filtering (price, type, brand, speed rating,
  load index, rating), sort, and a fitment context header ("Tires that fit your
  2019 Toyota Camry SE"). All filter state lives in the URL (shareable, survives
  refresh).
- **Product page** — specs / reviews / description / brand tabs and a fitment
  confirmation ("Confirmed fit for your 2019 Toyota Camry SE").

## The senior move: a swappable data layer

The app talks to a `TireProvider` interface (`lib/tire-provider/`), never to a
concrete source. The demo ships a mock backed by local JSON. In production the
real AutoSync feed implements the same interface — **swapping the mock for the
live feed is an implementation detail, not a rewrite.**

## Stack

Next.js 16 (App Router, RSC) · TypeScript · Tailwind CSS v4 · lucide-react.
No database, no auth, no payment, no API keys required to run.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Notes

Imagery is royalty-free (Unsplash) for the demo only — not client assets. This
demonstrates capability with mock data and an approximate visual match; a
pixel-exact, production build follows after file access in a paid engagement.
