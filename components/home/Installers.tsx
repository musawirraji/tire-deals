import { ArrowUpRight, MapPin, Navigation } from "lucide-react";

function MapPin2({ x, y, big = false }: { x: number; y: number; big?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="2" rx={big ? 7 : 5} ry="2.5" fill="#000" opacity="0.12" />
      <path
        d={`M0 ${big ? -22 : -16} C ${big ? 9 : 7} ${big ? -22 : -16} ${big ? 11 : 8} ${big ? -10 : -7} 0 0 C ${big ? -11 : -8} ${big ? -10 : -7} ${big ? -9 : -7} ${big ? -22 : -16} 0 ${big ? -22 : -16} Z`}
        fill="#8ed81f"
        stroke="#0c0e0b"
        strokeWidth="1"
      />
      <circle cx="0" cy={big ? -14 : -10} r={big ? 3.5 : 2.5} fill="#0c0e0b" />
    </g>
  );
}

export function Installers() {
  return (
    <section className="px-3 py-8 md:px-5">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-hero border border-line bg-[#e7eae4]">
        {/* stylized map */}
        <svg
          viewBox="0 0 1000 460"
          className="h-[360px] w-full md:h-[440px]"
          preserveAspectRatio="xMidYMid slice"
          aria-label="Map of nearby installers"
        >
          <rect width="1000" height="460" fill="#e7eae4" />
          {/* water */}
          <path d="M640 0 C 700 90 640 180 720 250 C 780 300 720 400 800 460 L1000 460 L1000 0 Z" fill="#d5e3e6" />
          {/* roads */}
          <g stroke="#c7ccc2" strokeWidth="6" fill="none" strokeLinecap="round">
            <path d="M0 120 L400 140 L620 90 L1000 130" />
            <path d="M0 260 L300 250 L520 300 L1000 280" />
            <path d="M120 0 L160 220 L120 460" />
            <path d="M420 0 L460 200 L420 460" />
            <path d="M700 0 L680 180 L760 460" />
          </g>
          <g stroke="#d9ddd4" strokeWidth="3" fill="none">
            <path d="M0 60 L1000 80" />
            <path d="M0 190 L1000 210" />
            <path d="M0 360 L640 380" />
            <path d="M260 0 L300 460" />
            <path d="M560 0 L600 460" />
          </g>
          {/* green route thread */}
          <path
            d="M180 400 C 300 320 220 240 360 210 C 500 180 460 100 620 120"
            fill="none"
            stroke="#8ed81f"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="2 12"
          />
          <MapPin2 x={360} y={210} big />
          <MapPin2 x={520} y={150} />
          <MapPin2 x={250} y={300} />
          <MapPin2 x={620} y={120} />
          <MapPin2 x={430} y={330} />
        </svg>

        {/* overlay card */}
        <div className="absolute left-4 top-4 w-[min(22rem,calc(100%-2rem))] rounded-card bg-dark p-6 text-cream shadow-soft md:left-8 md:top-8">
          <span className="mb-3 flex h-2.5 w-2.5 rounded-full bg-accent" />
          <h2 className="text-2xl font-extrabold leading-tight">
            Find trusted tire installers near you
          </h2>
          <p className="mt-2 text-sm text-dark-muted">
            We&rsquo;ll show you a complete list of certified auto shops,
            mechanics, and mobile installers in your area.
          </p>
          <label className="mt-4 flex items-center gap-2 rounded-full border border-dark-line bg-dark-2 px-4 py-3">
            <MapPin size={16} className="text-accent" />
            <input
              placeholder="Address"
              className="w-full bg-transparent text-sm text-cream outline-none placeholder:text-dark-muted"
            />
            <ArrowUpRight size={16} className="text-dark-muted" />
          </label>
          <button className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent px-4 py-2.5 text-sm font-bold text-accent transition-colors hover:bg-accent hover:text-dark">
            <Navigation size={15} /> Near me
          </button>
        </div>
      </div>
    </section>
  );
}
