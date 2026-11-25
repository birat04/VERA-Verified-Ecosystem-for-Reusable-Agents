import Link from "next/link";
import { notFound } from "next/navigation";
import { getSkill } from "@/lib/mock-data";
import type { Skill } from "@/lib/types";
import { TrustBadge } from "@/components/TrustBadge";
import { StarRating } from "@/components/StarRating";
import { EvidenceRow } from "@/components/EvidenceRow";
import { BenchmarkBar } from "@/components/BenchmarkBar";
import { InstallSnippet } from "@/components/InstallSnippet";

export default async function SkillPage(props: PageProps<"/skill/[id]">) {
  const { id } = await props.params;
  const skill = getSkill(id);
  if (!skill) notFound();

  return (
    <>
      <HeroSection skill={skill} />
      <CapabilitySection skill={skill} />
      <TrustProfileSection skill={skill} />
      <EvaluationSection skill={skill} />
      <CommunitySection skill={skill} />
      <VersionsSection skill={skill} />
      <CloseSection skill={skill} />
    </>
  );
}

/* ─────────── hero ─────────── */

function HeroSection({ skill }: { skill: Skill }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="bg-grid absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-14 sm:py-20">
        <div className="flex items-center gap-3 text-[11px]">
          <Link href="/marketplace" className="text-muted underline-draw hover:text-foreground">
            ← marketplace
          </Link>
          <span className="text-muted">·</span>
          <span className="font-medium uppercase tracking-[0.18em] text-accent">
            skill · {skill.category}
          </span>
        </div>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-16">
          <div data-enter className="min-w-0">
            <h1 className="text-[40px] leading-[1.03] tracking-tight sm:text-[56px]">
              <span className="font-semibold">{skill.name}</span>
            </h1>
            <p className="mt-4 max-w-xl text-[18px] leading-8 text-foreground/80">
              {skill.tagline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
              <span>
                by <span className="text-foreground/90">{skill.author}</span>
                {skill.authorVerified && <span className="ml-1 text-accent">✓</span>}
              </span>
              <span>·</span>
              <span className="font-mono">v{skill.version}</span>
              <span>·</span>
              <span>updated {skill.lastUpdated}</span>
              <span>·</span>
              <span>{Intl.NumberFormat("en", { notation: "compact" }).format(skill.installs)} installs</span>
              <span>·</span>
              <StarRating rating={skill.rating} count={skill.reviewCount} />
            </div>

            <p className="mt-8 max-w-xl text-[15px] leading-7 text-muted">
              {skill.description}
            </p>
          </div>

          <TrustPanel skill={skill} />
        </div>
      </div>
    </section>
  );
}

function TrustPanel({ skill }: { skill: Skill }) {
  return (
    <aside className="rounded-2xl border border-border bg-surface p-6 shadow-xl shadow-black/40 lg:sticky lg:top-20">
      <div className="flex items-center gap-6">
        <BigGauge score={skill.trustScore} />
        <div>
          <TrustBadge level={skill.trustLevel} size="md" />
          <p className="mt-2 text-sm text-foreground/90">
            {trustHeadline(skill)}
          </p>
          <p className="text-xs text-muted">
            Evidence profile below.
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
          Install
        </p>
        <InstallSnippet skillId={skill.id} installed={skill.installed} />
      </div>
    </aside>
  );
}

function trustHeadline(skill: Skill) {
  switch (skill.trustLevel) {
    case "verified":
      return "Top-tier evidence across every signal.";
    case "trusted":
      return "Strong evidence with a small number of warnings.";
    case "caution":
      return "Usable, but review the warnings before installing.";
    case "unverified":
      return "No independent evidence yet. Treat as unknown.";
  }
}

function BigGauge({ score }: { score: number }) {
  return (
    <div className="relative grid h-[128px] w-[128px] shrink-0 place-items-center">
      <svg viewBox="0 0 36 36" className="h-[128px] w-[128px] -rotate-90">
        <circle cx="18" cy="18" r="16" fill="none" stroke="#26272c" strokeWidth="2" />
        <circle
          cx="18" cy="18" r="16" fill="none" stroke="#4fd1a0" strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${score} 100`}
          pathLength={100}
          className="gauge-fill"
        />
      </svg>
      <div className="absolute flex flex-col items-center leading-none">
        <span className="text-[28px] font-semibold tabular-nums">{score}</span>
        <span className="mt-1 text-[10px] text-muted">/ 100 trust</span>
      </div>
    </div>
  );
}

/* ─────────── §01 — capability ─────────── */

function CapabilitySection({ skill }: { skill: Skill }) {
  return (
    <section className="relative border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
        <SectionEyebrow number="01" label="the capability" />
        <SectionHead
          sans="What it does,"
          italic="in practice."
        />
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
          The real prompts this skill is designed to handle. Below, the tools it uses,
          the permissions it requests, and the agents it&rsquo;s known to work with.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Example prompts
            </p>
            <div className="space-y-3">
              {skill.examples.map((ex, i) => (
                <div key={i} className="lift rounded-xl border border-border bg-surface p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {ex.title}
                  </p>
                  <p className="mt-2 font-mono text-sm text-foreground/90">
                    &ldquo;{ex.body}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Meta label="Supported agents" items={skill.supportedAgents} />
            <Meta label="Tools" items={skill.tools} />
            <Meta label="Permissions" items={skill.permissions} mono />
          </div>
        </div>
      </div>
    </section>
  );
}

function Meta({ label, items, mono }: { label: string; items: string[]; mono?: boolean }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((t) => (
          <span
            key={t}
            className={`rounded-md border border-border bg-surface px-2 py-1 text-xs ${mono ? "font-mono" : ""}`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────── §02 — trust profile ─────────── */

const TRUST_SECTIONS: { key: keyof Skill["evidence"]; label: string; blurb: string }[] = [
  { key: "security", label: "Security", blurb: "Permissions, sandbox observations, signing." },
  { key: "behavior", label: "Behavior", blurb: "Consistency, injection resistance, failure modes." },
  { key: "performance", label: "Performance", blurb: "Latency, memory, scaling under load." },
  { key: "compatibility", label: "Compatibility", blurb: "Supported agents, runtimes, dialects." },
  { key: "provenance", label: "Provenance", blurb: "Source, publisher, reproducibility, SBOM." },
];

function TrustProfileSection({ skill }: { skill: Skill }) {
  const all = Object.values(skill.evidence).flat();
  const counts = {
    pass: all.filter((e) => e.status === "pass").length,
    warn: all.filter((e) => e.status === "warn").length,
    fail: all.filter((e) => e.status === "fail").length,
    info: all.filter((e) => e.status === "info").length,
  };

  return (
    <section className="relative border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
        <SectionEyebrow number="02" label="trust profile" />
        <SectionHead
          sans="Five signals,"
          italic="independent."
        />
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
          Every piece of evidence below was produced by the VERA evaluator, static analysis
          or the publisher&rsquo;s signed provenance chain. Each category contributes to
          the overall trust score on its own.
        </p>

        <div className="mt-8 flex flex-wrap gap-2 text-xs">
          <Pill color="emerald" label={`${counts.pass} pass`} />
          {counts.warn > 0 && <Pill color="amber" label={`${counts.warn} warn`} />}
          {counts.fail > 0 && <Pill color="rose" label={`${counts.fail} fail`} />}
          {counts.info > 0 && <Pill color="sky" label={`${counts.info} info`} />}
        </div>

        <div className="mt-12 space-y-12">
          {TRUST_SECTIONS.map((s, i) => (
            <div key={s.key}>
              <div className="flex items-baseline gap-3 border-b border-border pb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  0{i + 1}
                </span>
                <h3 className="text-xl font-semibold">{s.label}</h3>
                <span className="text-xs text-muted">· {s.blurb}</span>
              </div>
              <div className="mt-4 space-y-2">
                {skill.evidence[s.key].map((e, j) => (
                  <EvidenceRow key={j} item={e} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pill({ color, label }: { color: "emerald" | "amber" | "rose" | "sky"; label: string }) {
  const map = {
    emerald: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    amber: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    rose: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    sky: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  };
  return <span className={`rounded-full border px-2.5 py-0.5 ${map[color]}`}>{label}</span>;
}

/* ─────────── §03 — evaluation ─────────── */

function EvaluationSection({ skill }: { skill: Skill }) {
  const withPct = Math.round(skill.evaluation.taskSuccessRate * 100);
  const withoutPct = Math.round(skill.evaluation.withoutSkillRate * 100);
  return (
    <section className="relative border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
        <SectionEyebrow number="03" label="effectiveness" />
        <SectionHead
          sans="Does it actually"
          italic="help?"
        />
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
          Measured against the same agent operating without the skill, on {skill.evaluation.benchmarks.length}{" "}
          task benchmark{skill.evaluation.benchmarks.length === 1 ? "" : "s"}.
        </p>

        <div className="mt-10 grid gap-6 rounded-2xl border border-border bg-surface p-8 sm:grid-cols-3">
          <EvalStat label="With skill" value={`${withPct}%`} emphasis />
          <EvalStat label="Without skill" value={`${withoutPct}%`} />
          <EvalStat label="Relative lift" value={`+${skill.evaluation.improvement}%`} accent />
        </div>

        <div className="mt-14">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
            Benchmarks
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {skill.evaluation.benchmarks.map((b) => (
              <BenchmarkBar key={b.name} bench={b} />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
            Runtime trace
          </p>
          <p className="mb-5 max-w-xl text-sm text-muted">
            What the skill actually did when executed under isolation.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <TraceBlock title="Filesystem" items={skill.sandbox.filesystemWrites} empty="no writes" />
            <TraceBlock title="Network" items={skill.sandbox.networkCalls} empty="no outbound calls" />
            <TraceBlock title="Commands" items={skill.sandbox.commandsRun} empty="no subprocesses" />
            <TraceBlock title="Anomalies" items={skill.sandbox.unexpectedBehavior} empty="nothing unexpected" warn />
          </div>
        </div>
      </div>
    </section>
  );
}

function EvalStat({ label, value, emphasis, accent }: { label: string; value: string; emphasis?: boolean; accent?: boolean }) {
  const tone = accent ? "text-accent" : emphasis ? "text-foreground" : "text-muted";
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-muted">{label}</div>
      <div className={`mt-1 text-4xl font-semibold tabular-nums ${tone}`}>{value}</div>
    </div>
  );
}

function TraceBlock({ title, items, empty, warn }: { title: string; items: string[]; empty: string; warn?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{title}</p>
      {items.length === 0 ? (
        <p className="mt-2 text-xs text-accent">{empty}</p>
      ) : (
        <ul className={`mt-2 space-y-1 font-mono text-[11px] leading-5 ${warn ? "text-amber-300" : "text-foreground/80"}`}>
          {items.map((i) => (
            <li key={i}>· {i}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─────────── §04 — community ─────────── */

function CommunitySection({ skill }: { skill: Skill }) {
  return (
    <section className="relative border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
        <SectionEyebrow number="04" label="community" />
        <SectionHead
          sans="What people"
          italic="actually said."
        />
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
          Reviews reflect user experience. Reported separately from technical trust — never blended into the score.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-semibold tabular-nums">{skill.rating.toFixed(1)}</span>
              <span className="pb-2 text-muted">/ 5</span>
            </div>
            <div className="mt-3">
              <StarRating rating={skill.rating} />
            </div>
            <p className="mt-2 text-xs text-muted">
              {skill.reviewCount.toLocaleString()} total reviews
            </p>
          </div>

          <div className="space-y-3">
            {skill.reviews.map((r, i) => (
              <div key={i} className="lift rounded-xl border border-border bg-surface p-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">@{r.author}</span>
                  <StarRating rating={r.rating} />
                </div>
                <p className="mt-1 text-[11px] text-muted">{r.date}</p>
                <p className="mt-3 text-sm leading-6">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── §05 — versions ─────────── */

function VersionsSection({ skill }: { skill: Skill }) {
  return (
    <section className="relative border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
        <SectionEyebrow number="05" label="continuous trust" />
        <SectionHead
          sans="Every version"
          italic="re-evaluated."
        />
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
          Approving one version doesn&rsquo;t automatically trust the next. VERA re-runs sandbox analysis and benchmarks on every release.
        </p>

        <ol className="mt-10 relative space-y-5 border-l border-border pl-6">
          {skill.versions.map((v) => (
            <li key={v.version} className="relative">
              <span className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full border border-border bg-background" />
              <div className="lift rounded-xl border border-border bg-surface p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold">v{v.version}</span>
                    <span className="text-xs text-muted">{v.date}</span>
                  </div>
                  <VersionDelta change={v.trustChange} delta={v.trustDelta} />
                </div>
                <ul className="mt-3 list-disc space-y-0.5 pl-5 text-sm text-foreground/90">
                  {v.changes.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function VersionDelta({ change, delta }: { change: "improved" | "unchanged" | "degraded"; delta?: number }) {
  const tone = {
    improved: "text-accent",
    unchanged: "text-muted",
    degraded: "text-rose-300",
  }[change];
  const label = {
    improved: "trust improved",
    unchanged: "trust unchanged",
    degraded: "trust degraded",
  }[change];
  return (
    <span className={`text-xs font-medium ${tone}`}>
      {label}
      {typeof delta === "number" && delta !== 0 && (
        <span className="ml-2 font-mono">{delta > 0 ? "+" : ""}{delta}</span>
      )}
    </span>
  );
}

/* ─────────── close ─────────── */

function CloseSection({ skill }: { skill: Skill }) {
  return (
    <section className="relative">
      <div className="bg-dots absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
              §06 — install
            </p>
            <h2 className="mt-4 text-[36px] leading-[1.08] tracking-tight sm:text-[48px]">
              <span className="font-semibold">Install {skill.name}.</span>
              <br />
              <span className="display-italic text-muted">Re-evaluated on every version.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-muted">
              VERA keeps your trust profile current. When {skill.name} updates, the full evaluation runs again — and any regression shows up on your dashboard.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <InstallSnippet skillId={skill.id} installed={skill.installed} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── shared helpers ─────────── */

function SectionEyebrow({ number, label }: { number: string; label: string }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
      §{number} — {label}
    </p>
  );
}

function SectionHead({ sans, italic }: { sans: string; italic: string }) {
  return (
    <h2 className="mt-3 text-[32px] leading-[1.1] tracking-tight sm:text-[40px]">
      <span className="font-semibold">{sans}</span>{" "}
      <span className="display-italic text-muted">{italic}</span>
    </h2>
  );
}
