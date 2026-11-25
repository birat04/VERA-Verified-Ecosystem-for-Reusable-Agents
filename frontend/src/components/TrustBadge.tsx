import type { TrustLevel } from "@/lib/types";
import { trustLevelColor, trustLevelLabel } from "@/lib/mock-data";

const dotColor: Record<TrustLevel, string> = {
  verified: "bg-emerald-400",
  trusted: "bg-sky-400",
  caution: "bg-amber-400",
  unverified: "bg-zinc-400",
};

export function TrustBadge({
  level,
  score,
  size = "sm",
}: {
  level: TrustLevel;
  score?: number;
  size?: "sm" | "md";
}) {
  const pad = size === "md" ? "px-3 py-1 text-xs" : "px-2 py-0.5 text-[11px]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${pad} ${trustLevelColor(level)}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor[level]}`} />
      {trustLevelLabel(level)}
      {typeof score === "number" && (
        <span className="ml-1 opacity-70">· {score}</span>
      )}
    </span>
  );
}
