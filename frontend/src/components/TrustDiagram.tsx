"use client";

const LANES = [
  { id: "security", label: "Security", desc: "Permissions, isolated runs, signing." },
  { id: "behavior", label: "Behavior", desc: "Consistency, injection resistance." },
  { id: "performance", label: "Performance", desc: "Latency, memory, scaling." },
  { id: "compatibility", label: "Compatibility", desc: "Agents, runtimes, dialects." },
  { id: "provenance", label: "Provenance", desc: "Source, publisher, SBOM." },
];

export function TrustDiagram() {
  return (
    <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:items-center">
      {/* diagram */}
      <div className="relative mx-auto h-[360px] w-[320px]">
        <svg viewBox="0 0 320 360" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#4fd1a0" stopOpacity="0.1" />
              <stop offset="0.5" stopColor="#4fd1a0" stopOpacity="0.6" />
              <stop offset="1" stopColor="#4fd1a0" stopOpacity="0.1" />
            </linearGradient>
            <radialGradient id="hub" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#4fd1a0" stopOpacity="0.35" />
              <stop offset="1" stopColor="#4fd1a0" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* hub halo */}
          <circle cx="60" cy="180" r="60" fill="url(#hub)" />

          {/* lanes */}
          {LANES.map((_, i) => {
            const y = 36 + i * 72;
            return (
              <g key={i}>
                <path
                  d={`M 80 180 C 160 180, 180 ${y}, 260 ${y}`}
                  stroke="url(#line)"
                  strokeWidth="1.5"
                  fill="none"
                />
                {/* animated pulse along path */}
                <circle
                  r="2.5"
                  fill="#4fd1a0"
                  style={{
                    offsetPath: `path("M 80 180 C 160 180, 180 ${y}, 260 ${y}")`,
                    animation: `pulse-flow 2.8s linear ${i * 0.42}s infinite`,
                  }}
                />
              </g>
            );
          })}

          {/* endpoint dots */}
          {LANES.map((_, i) => {
            const y = 36 + i * 72;
            return (
              <circle
                key={i}
                cx="260"
                cy={y}
                r="4"
                fill="#0a0b0d"
                stroke="#4fd1a0"
                strokeWidth="1.5"
              />
            );
          })}
        </svg>

        {/* hub (the skill) */}
        <div className="absolute left-[18px] top-1/2 -translate-y-1/2">
          <div className="relative grid h-[84px] w-[84px] place-items-center rounded-2xl border border-border bg-surface shadow-xl shadow-black/40">
            <div className="text-xl">⚡</div>
            <span className="absolute -top-1.5 -right-1.5 h-2.5 w-2.5 rounded-full bg-accent pulse-dot" />
          </div>
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-muted">
            the skill
          </p>
        </div>

        {/* lane labels */}
        {LANES.map((l, i) => {
          const y = 36 + i * 72;
          return (
            <div
              key={l.id}
              className="absolute left-[270px] -translate-y-1/2"
              style={{ top: y }}
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-foreground">
                {l.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* descriptive list */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {LANES.map((l) => (
          <div
            key={l.id}
            className="lift group rounded-xl border border-border bg-surface/80 p-4 hover:border-border-strong"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <div>
                <h3 className="text-sm font-medium">{l.label}</h3>
                <p className="mt-0.5 text-sm text-muted">{l.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
