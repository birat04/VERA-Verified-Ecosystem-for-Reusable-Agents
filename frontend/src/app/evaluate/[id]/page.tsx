import Link from "next/link";
import { notFound } from "next/navigation";
import { getSkill } from "@/lib/mock-data";
import { TrustBadge } from "@/components/TrustBadge";
import { EvidenceRow } from "@/components/EvidenceRow";
import { BenchmarkBar } from "@/components/BenchmarkBar";

export default async function EvaluatePage(props: PageProps<"/evaluate/[id]">) {
  const { id } = await props.params;
  const skill = getSkill(id);
  if (!skill) notFound();

  const withPct = Math.round(skill.evaluation.taskSuccessRate * 100);
  const withoutPct = Math.round(skill.evaluation.withoutSkillRate * 100);
  const allEvidence = [
    ...skill.evidence.security,
    ...skill.evidence.behavior,
    ...skill.evidence.performance,
    ...skill.evidence.compatibility,
    ...skill.evidence.provenance,
  ];
  const counts = {
    pass: allEvidence.filter((e) => e.status === "pass").length,
    warn: allEvidence.filter((e) => e.status === "warn").length,
    fail: allEvidence.filter((e) => e.status === "fail").length,
    info: allEvidence.filter((e) => e.status === "info").length,
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8">
      <Link href={`/skill/${skill.id}`} className="text-xs text-muted hover:text-foreground">
        ← Back to {skill.name}
      </Link>

      <header className="mt-4 rounded-xl border border-border bg-surface p-6">
        <div className="flex items-center gap-4">
          <div className={`grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br ${skill.accent} text-2xl`}>
            {skill.icon}
          </div>
          <div>
            <h1 className="text-xl font-semibold">Evaluation report</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
              <span>{skill.name}</span>
              <span>·</span>
              <span className="font-mono">v{skill.version}</span>
              <span>·</span>
              <TrustBadge level={skill.trustLevel} score={skill.trustScore} />
            </div>
          </div>
        </div>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-4">
        <Metric label="Overall trust" value={`${skill.trustScore}/100`} tone="accent" />
        <Metric label="Task success" value={`${withPct}%`} tone="pos" />
        <Metric label="Without skill" value={`${withoutPct}%`} />
        <Metric label="Relative lift" value={`+${skill.evaluation.improvement}%`} tone="pos" />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold">Evidence summary</h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Pill color="emerald" label={`${counts.pass} pass`} />
          <Pill color="amber" label={`${counts.warn} warn`} />
          {counts.fail > 0 && <Pill color="rose" label={`${counts.fail} fail`} />}
          <Pill color="sky" label={`${counts.info} info`} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold">Task benchmarks</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {skill.evaluation.benchmarks.map((b) => (
            <BenchmarkBar key={b.name} bench={b} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold">Runtime trace</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <TraceBlock title="Filesystem" items={skill.sandbox.filesystemWrites} emptyLabel="No writes outside temp buffer" />
          <TraceBlock title="Network" items={skill.sandbox.networkCalls} emptyLabel="No outbound calls" />
          <TraceBlock title="Commands" items={skill.sandbox.commandsRun} emptyLabel="No subprocesses spawned" />
          <TraceBlock title="Anomalies" items={skill.sandbox.unexpectedBehavior} emptyLabel="Nothing unexpected" warn />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold">Full evidence log</h2>
        <div className="space-y-2">
          {allEvidence.map((e, i) => (
            <EvidenceRow key={i} item={e} />
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-border bg-surface p-5 text-xs text-muted">
        <h3 className="mb-1 text-sm font-semibold text-foreground">Continuous verification</h3>
        <p>
          This report is produced automatically on every version. When the skill updates, VERA re-runs the full evaluation
          and surfaces any regression on the <Link href="/dashboard" className="text-accent hover:underline">dashboard</Link>.
        </p>
      </section>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: "pos" | "accent" }) {
  const toneCls =
    tone === "pos" ? "text-emerald-300" : tone === "accent" ? "bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent" : "";
  return (
    <div className="rounded-lg border border-border bg-surface px-4 py-3">
      <div className="text-xs text-muted">{label}</div>
      <div className={`mt-0.5 text-xl font-semibold ${toneCls}`}>{value}</div>
    </div>
  );
}

function Pill({ color, label }: { color: "emerald" | "amber" | "rose" | "sky"; label: string }) {
  const map = {
    emerald: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    amber: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    rose: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    sky: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  };
  return <span className={`rounded-full border px-2 py-0.5 ${map[color]}`}>{label}</span>;
}

function TraceBlock({ title, items, emptyLabel, warn }: { title: string; items: string[]; emptyLabel: string; warn?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</div>
      {items.length === 0 ? (
        <p className="mt-2 text-xs text-emerald-300">{emptyLabel}</p>
      ) : (
        <ul className={`mt-2 space-y-1 font-mono text-xs ${warn ? "text-amber-300" : "text-foreground/80"}`}>
          {items.map((i) => (
            <li key={i}>· {i}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
