import type { Benchmark } from "@/lib/types";

export function BenchmarkBar({ bench }: { bench: Benchmark }) {
  const delta = bench.score - bench.baseline;
  const positive = delta >= 0;
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{bench.name}</span>
        <span className={positive ? "text-emerald-300" : "text-rose-300"}>
          {positive ? "+" : ""}
          {delta} pts
        </span>
      </div>

      <div className="mt-3 space-y-2">
        <Row label="With skill" value={bench.score} color="bg-gradient-to-r from-violet-500 to-fuchsia-500" />
        <Row label="Baseline" value={bench.baseline} color="bg-zinc-700" />
      </div>
    </div>
  );
}

function Row({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-muted">
        <span>{label}</span>
        <span className="font-mono text-foreground">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-900">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
