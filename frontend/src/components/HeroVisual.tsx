"use client";

import { useEffect, useState } from "react";

const EVIDENCE = [
  { cat: "security", label: "No secrets exfiltrated across 10,000 isolated runs", status: "pass" },
  { cat: "behavior", label: "Resists 47/50 adversarial injection attempts", status: "pass" },
  { cat: "performance", label: "P95 latency 2.3s on 500-line diff", status: "pass" },
  { cat: "compatibility", label: "Verified on Claude, GPT, Gemini", status: "pass" },
  { cat: "provenance", label: "Signed by verified publisher (vera-labs)", status: "pass" },
] as const;

export function HeroVisual() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const target = 94;
    const start = performance.now();
    const duration = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      // ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setScore(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative">
      {/* window chrome */}
      <div className="absolute -top-8 left-0 right-0 flex items-center justify-between text-[11px] text-muted">
        <span className="font-mono">vera.dev/skill/code-reviewer-pro</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
          live
        </span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/60">
        {/* top accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

        <div className="flex items-start gap-4 border-b border-border p-5">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-border bg-background text-lg">
            ⚡
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-semibold">Code Reviewer Pro</h3>
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                verified
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted">by vera-labs · v2.4.1 · updated 2d ago</p>
          </div>
          <Gauge score={score} />
        </div>

        <div className="space-y-2 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Trust evidence</p>
          {EVIDENCE.map((e, i) => (
            <EvidenceRow key={e.cat} item={e} index={i} />
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-background/40 px-5 py-3 font-mono text-[11px]">
          <span className="text-muted">
            <span className="text-accent">$</span> vera add code-reviewer-pro
          </span>
          <span className="rounded-md bg-accent/10 px-2 py-0.5 text-accent">install</span>
        </div>
      </div>

      {/* floating label */}
      <div className="pointer-events-none absolute -bottom-3 -right-3 rotate-[1deg] rounded-md border border-border bg-background px-3 py-1.5 text-[10px] text-muted shadow-lg">
        re-evaluated on every version
      </div>
    </div>
  );
}

function Gauge({ score }: { score: number }) {
  return (
    <div className="relative grid h-14 w-14 shrink-0 place-items-center">
      <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
        <circle cx="18" cy="18" r="16" fill="none" stroke="#26272c" strokeWidth="2.5" />
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="#4fd1a0"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="gauge-fill"
          strokeDasharray={`${score} 100`}
          pathLength={100}
        />
      </svg>
      <div className="absolute flex flex-col items-center leading-none">
        <span className="count-up text-[13px] font-semibold tabular-nums">{score}</span>
        <span className="text-[8px] text-muted">/100</span>
      </div>
    </div>
  );
}

function EvidenceRow({
  item,
  index,
}: {
  item: { cat: string; label: string; status: string };
  index: number;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-lg border border-border bg-background/60 px-3 py-2"
      style={{
        animation: `row-cycle 9s ease-in-out ${index * 1.4}s infinite`,
      }}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-muted">
        {item.cat}
      </span>
      <span className="truncate text-xs">{item.label}</span>
      <span className="ml-auto font-mono text-[9px] text-accent">pass</span>
    </div>
  );
}
