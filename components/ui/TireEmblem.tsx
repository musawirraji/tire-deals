export function TireEmblem({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      aria-hidden
    >
      <defs>
        <radialGradient id="em-body" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#c6ff5e" />
          <stop offset="45%" stopColor="#8ed81f" />
          <stop offset="100%" stopColor="#2f5a09" />
        </radialGradient>
        <radialGradient id="em-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8ed81f" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8ed81f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#em-glow)" />
      <circle cx="100" cy="100" r="72" fill="url(#em-body)" />
      <circle cx="100" cy="100" r="72" fill="none" stroke="#0c0e0b" strokeOpacity="0.25" strokeWidth="2" />
      <g stroke="#0c0e0b" strokeOpacity="0.35" strokeWidth="4">
        <circle cx="100" cy="100" r="60" fill="none" strokeDasharray="6 10" />
      </g>
      <circle cx="100" cy="100" r="40" fill="none" stroke="#0c0e0b" strokeOpacity="0.4" strokeWidth="3" />
      <g stroke="#0c0e0b" strokeOpacity="0.5" strokeWidth="6" strokeLinecap="round">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * 18}
              y1={100 + Math.sin(a) * 18}
              x2={100 + Math.cos(a) * 38}
              y2={100 + Math.sin(a) * 38}
            />
          );
        })}
      </g>
      <circle cx="100" cy="100" r="16" fill="#0c0e0b" fillOpacity="0.55" />
      <ellipse cx="76" cy="70" rx="34" ry="20" fill="#ffffff" opacity="0.18" />
    </svg>
  );
}
