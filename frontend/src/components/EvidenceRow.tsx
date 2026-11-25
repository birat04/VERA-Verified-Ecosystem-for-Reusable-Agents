import type { EvidenceItem, EvidenceStatus } from "@/lib/types";

const statusStyles: Record<EvidenceStatus, { dot: string; label: string; text: string }> = {
  pass: { dot: "bg-emerald-400", label: "PASS", text: "text-emerald-300" },
  warn: { dot: "bg-amber-400", label: "WARN", text: "text-amber-300" },
  fail: { dot: "bg-rose-400", label: "FAIL", text: "text-rose-300" },
  info: { dot: "bg-sky-400", label: "INFO", text: "text-sky-300" },
};

export function EvidenceRow({ item }: { item: EvidenceItem }) {
  const s = statusStyles[item.status];
  return (
    <div className="flex gap-3 rounded-lg border border-border bg-surface px-4 py-3">
      <div className="mt-1 flex shrink-0 items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${s.dot}`} />
        <span className={`font-mono text-[10px] font-semibold tracking-wider ${s.text}`}>{s.label}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{item.label}</p>
        {item.detail && <p className="mt-0.5 text-xs text-muted">{item.detail}</p>}
      </div>
    </div>
  );
}
