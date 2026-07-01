import { Mail, Phone } from "lucide-react";

const SOCIALS: { label: string; path: string }[] = [
  { label: "Facebook", path: "M13 22v-8h2.6l.4-3H13V9.2c0-.9.3-1.5 1.6-1.5H16V5.1C15.5 5 14.6 5 13.7 5 11.7 5 10.3 6.2 10.3 8.6V11H8v3h2.3v8H13z" },
  { label: "Instagram", path: "M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zM17 5.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 4.6c2.4 0 2.7 0 3.6.05 1 .05 1.5.2 1.9.35.5.2.8.4 1.2.8.4.4.6.7.8 1.2.15.4.3.9.35 1.9.05.9.05 1.2.05 3.6s0 2.7-.05 3.6c-.05 1-.2 1.5-.35 1.9-.2.5-.4.8-.8 1.2-.4.4-.7.6-1.2.8-.4.15-.9.3-1.9.35-.9.05-1.2.05-3.6.05s-2.7 0-3.6-.05c-1-.05-1.5-.2-1.9-.35-.5-.2-.8-.4-1.2-.8-.4-.4-.6-.7-.8-1.2-.15-.4-.3-.9-.35-1.9C4.6 14.7 4.6 14.4 4.6 12s0-2.7.05-3.6c.05-1 .2-1.5.35-1.9.2-.5.4-.8.8-1.2.4-.4.7-.6 1.2-.8.4-.15.9-.3 1.9-.35.9-.05 1.2-.05 3.6-.05z" },
  { label: "X", path: "M17.5 5h2.4l-5.2 6 6.2 8h-4.9l-3.8-5-4.4 5H5.4l5.6-6.4L4.7 5h5l3.5 4.6L17.5 5zm-.8 12.5h1.3L8.9 6.4H7.5l9.2 11.1z" },
  { label: "YouTube", path: "M21.6 8.2s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.9-.85C16.2 5.2 12 5.2 12 5.2s-4.2 0-6.9.2c-.4.05-1.2.05-1.9.85-.6.6-.8 2-.8 2S2.2 9.8 2.2 11.5v1c0 1.7.2 3.3.2 3.3s.2 1.4.8 2c.7.8 1.7.75 2.1.85 1.6.15 6.7.2 6.7.2s4.2 0 6.9-.2c.4-.05 1.2-.05 1.9-.85.6-.6.8-2 .8-2s.2-1.6.2-3.3v-1c0-1.7-.2-3.3-.2-3.3zM10 14.6V9.4l4.3 2.6-4.3 2.6z" },
];

const COMPANY = ["About us", "Tires 101", "Installers", "Blog", "Careers"];
const SEARCH = [
  "Shop Tires",
  "Search by Vehicle",
  "Search by Size",
  "Search by Type",
  "Search Results",
  "Deals",
];
const SUPPORT = [
  "My Account",
  "Track Your Order",
  "Return Policy",
  "Tire Coverage",
  "Tire Financing",
  "FAQ",
  "Contact",
];
const SIZES = [
  "14 inch tires",
  "15 inch tires",
  "16 inch tires",
  "17 inch tires",
  "18 inch tires",
  "19 inch tires",
  "20 inch tires",
  "22 inch tires",
];
const VEHICLES = [
  "Honda Accord",
  "Hyundai Elantra",
  "Toyota Camry",
  "Chevrolet Malibu",
  "Nissan Sentra",
  "Honda Civic",
  "Mercedes-Benz C300",
  "Tesla Model 3",
];
const BRANDS = [
  "Yokohama",
  "Pirelli",
  "Continental",
  "Firestone",
  "Falken",
  "Hankook",
  "Nitto",
  "Michelin",
];

function Col({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="mb-3.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-dark-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l}>
            <span className="cursor-pointer text-sm text-cream/85 transition-colors hover:text-accent">
              {l}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden bg-dark text-cream">
      {/* giant wordmark */}
      <div className="relative">
        <div
          aria-hidden
          className="select-none bg-gradient-to-b from-accent/90 to-accent-700/30 bg-clip-text px-4 pt-8 text-center text-[clamp(4rem,22vw,17rem)] font-extrabold leading-[0.8] tracking-tighter text-transparent"
        >
          TireDeals
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-dark to-transparent" />
      </div>

      {/* network glow bottom-left */}
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 opacity-40"
      >
        <defs>
          <radialGradient id="net" cx="30%" cy="70%" r="70%">
            <stop offset="0%" stopColor="#8ed81f" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8ed81f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="120" cy="300" r="180" fill="url(#net)" />
        <g stroke="#8ed81f" strokeOpacity="0.5" strokeWidth="0.6" fill="#8ed81f">
          {Array.from({ length: 40 }).map((_, i) => {
            const a = (i / 40) * Math.PI * 2;
            const r = 60 + (i % 5) * 22;
            const x = 120 + Math.cos(a) * r;
            const y = 300 + Math.sin(a) * r * 0.7;
            return <circle key={i} cx={x} cy={y} r={1.4} />;
          })}
          {Array.from({ length: 18 }).map((_, i) => {
            const a = (i / 18) * Math.PI * 2;
            return (
              <line
                key={`l${i}`}
                x1={120}
                y1={300}
                x2={120 + Math.cos(a) * 150}
                y2={300 + Math.sin(a) * 105}
              />
            );
          })}
        </g>
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 pb-10 md:px-6">
        <div className="grid gap-10 border-t border-dark-line pt-12 md:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <p className="text-xl font-extrabold">We&rsquo;re Happy to Help</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-dark-muted">
              Need help choosing the right products for your vehicle? Our team of
              highly trained experts has the knowledge and passion to help. Pick
              up the phone and give us a ring.
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href="tel:+14155550199" className="flex items-center gap-2 text-cream/85 hover:text-accent">
                <Phone size={15} className="text-accent" /> +1 (415) 555-0199
              </a>
              <a href="mailto:support@tiredeals.demo" className="flex items-center gap-2 text-cream/85 hover:text-accent">
                <Mail size={15} className="text-accent" /> support@tiredeals.demo
              </a>
            </div>
            <div className="mt-5 flex gap-2.5">
              {SOCIALS.map((s) => (
                <span
                  key={s.label}
                  aria-label={s.label}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-dark-line text-cream/80 transition-colors hover:border-accent hover:text-accent"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </span>
              ))}
            </div>
          </div>
          <Col title="Company" links={COMPANY} />
          <Col title="Search" links={SEARCH} />
          <Col title="Support" links={SUPPORT} />
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          <Col title="Tire size" links={SIZES} />
          <Col title="Vehicles" links={VEHICLES} />
          <Col title="Tire brands" links={BRANDS} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-dark-line pt-6 text-xs text-dark-muted md:flex-row">
          <span>© 2024 TireDeals. Demo build — mock data, approximate visual match.</span>
          <span className="flex gap-5">
            <span className="cursor-pointer hover:text-cream">Terms of Service</span>
            <span className="cursor-pointer hover:text-cream">Privacy Policy</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
