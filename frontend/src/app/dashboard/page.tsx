import Link from "next/link";
import { skills } from "@/lib/mock-data";
import { TrustBadge } from "@/components/TrustBadge";

export default function DashboardPage() {
  const installed = skills.filter((s) => s.installed);

  const alerts = installed
    .map((s) => {
      const last = s.versions[0];
      if (!last) return null;
      return { skill: s, version: last };
    })
    .filter((x): x is { skill: typeof installed[number]; version: typeof installed[number]["versions"][number] } => !!x);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8">
      <h1 className="text-2xl font-semibold">My skills</h1>
      <p className="text-sm text-muted">Skills you&apos;ve installed and their trust history.</p>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Trust changes since last check</h2>
        <div className="space-y-2">
          {alerts.map(({ skill, version }) => {
            const tone =
              version.trustChange === "improved"
                ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300"
                : version.trustChange === "degraded"
                ? "border-rose-500/30 bg-rose-500/5 text-rose-300"
                : "border-border bg-surface text-muted";
            const prefix = version.trustChange === "improved" ? "↑" : version.trustChange === "degraded" ? "↓" : "·";
            return (
              <Link
                key={skill.id}
                href={`/skill/${skill.id}`}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm transition hover:brightness-110 ${tone}`}
              >
                <div className="flex items-center gap-3">
                  <span>{prefix}</span>
                  <span className="font-medium text-foreground">{skill.name}</span>
                  <span className="font-mono text-xs text-muted">v{version.version}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs">{version.changes[0]}</span>
                  {typeof version.trustDelta === "number" && version.trustDelta !== 0 && (
                    <span className="font-mono text-xs">
                      {version.trustDelta > 0 ? "+" : ""}{version.trustDelta} trust
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Installed ({installed.length})</h2>
        <div className="divide-y divide-border overflow-hidden rounded-xl border border-border">
          {installed.map((s) => (
            <Link
              key={s.id}
              href={`/skill/${s.id}`}
              className="flex items-center justify-between gap-4 bg-surface px-5 py-4 transition hover:bg-surface-2"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${s.accent} text-lg`}>
                  {s.icon}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{s.name}</div>
                  <div className="truncate text-xs text-muted">
                    by {s.author} · v{s.version} · updated {s.lastUpdated}
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <TrustBadge level={s.trustLevel} score={s.trustScore} />
                <span className="text-xs text-muted">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {installed.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-surface/60 p-10 text-center">
          <p className="text-sm text-muted">No skills installed yet. Head to the marketplace.</p>
          <Link href="/" className="mt-3 inline-block rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white">
            Browse marketplace
          </Link>
        </div>
      )}
    </div>
  );
}
