"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories } from "@/lib/mock-data";

type Phase = "edit" | "testing" | "report" | "published";

export default function CreatePage() {
  const [phase, setPhase] = useState<Phase>("edit");
  const [name, setName] = useState("My Skill");
  const [tagline, setTagline] = useState("What this skill does in one line.");
  const [description, setDescription] = useState(
    "Give agents a clear description of the capability. Include when it should be used and when not."
  );
  const [instructions, setInstructions] = useState(
    "You are a focused assistant that <role>. Prefer concise answers. Refuse unsafe requests."
  );
  const [category, setCategory] = useState("development");
  const [tools, setTools] = useState("web-search, file-read");
  const [permissions, setPermissions] = useState("read:files, network:http");
  const [example, setExample] = useState(
    "Research the latest trends in <topic> and summarize with citations."
  );

  if (phase === "testing") return <TestingScreen name={name} onComplete={() => setPhase("report")} />;
  if (phase === "report") return <ReportScreen name={name} onPublish={() => setPhase("published")} onBack={() => setPhase("edit")} />;
  if (phase === "published") return <PublishedScreen name={name} />;

  return (
    <>
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-grid absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-14 sm:py-20">
          <div data-enter className="max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
              §00 — publish a skill
            </p>
            <h1 className="mt-4 text-[40px] leading-[1.04] tracking-tight sm:text-[56px]">
              <span className="font-semibold">Author it.</span>{" "}
              <span className="display-italic text-muted">Prove it.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-muted">
              Describe the capability, declare the tools and permissions, and run the evaluation.
              Only after the evidence is in does it ship to the marketplace.
            </p>

            <div className="mt-8 flex flex-wrap gap-6 border-t border-border pt-6 text-sm">
              <StepPill n="1" label="Author" />
              <StepArrow />
              <StepPill n="2" label="Evaluate" />
              <StepArrow />
              <StepPill n="3" label="Review evidence" />
              <StepArrow />
              <StepPill n="4" label="Publish" current />
            </div>
          </div>
        </div>
      </section>

      {/* ───── §01 — identity ───── */}
      <section className="relative border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16 sm:py-20">
          <div>
            <SectionEyebrow number="01" label="identity" />
            <SectionHead sans="What people" italic="see first." />
            <p className="mt-4 max-w-lg text-[15px] leading-7 text-muted">
              Shown on the marketplace card and the detail page. Plain, specific words.
            </p>

            <div className="mt-10 space-y-6">
              <Field label="Name" hint="One to four words.">
                <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
              </Field>
              <Field label="Tagline" hint="One sentence, no marketing fluff.">
                <input value={tagline} onChange={(e) => setTagline(e.target.value)} className={inputCls} />
              </Field>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Category">
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
                    {categories.filter((c) => c.id !== "all").map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.icon} {c.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Version" hint="Starts at 0.1.0.">
                  <input defaultValue="0.1.0" className={`${inputCls} font-mono`} />
                </Field>
              </div>
              <Field label="Description" hint="Include when it should be used, and when not.">
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${inputCls} h-28 resize-y`} />
              </Field>
            </div>
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Live marketplace preview
            </p>
            <div className="rounded-xl border border-border bg-surface p-5 shadow-xl shadow-black/40">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background text-lg">
                    ✨
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold">{name}</h3>
                    <p className="text-xs text-muted">by you · draft</p>
                  </div>
                </div>
                <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] text-muted">
                  unverified
                </span>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-muted">{tagline}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>· · · · · (no reviews yet)</span>
                <span>0 installs</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ───── §02 — behaviour ───── */}
      <section className="relative border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16 sm:py-20">
          <div>
            <SectionEyebrow number="02" label="behaviour" />
            <SectionHead sans="How the agent" italic="should think." />
            <p className="mt-4 max-w-lg text-[15px] leading-7 text-muted">
              The instructions the agent follows when this skill is active, plus an example prompt
              the evaluator will use to score it.
            </p>

            <div className="mt-10 space-y-6">
              <Field label="Instructions" hint="A plain-English system prompt.">
                <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} className={`${inputCls} h-36 resize-y font-mono text-xs leading-6`} />
              </Field>
              <Field label="Example prompt" hint="One task the skill should handle well.">
                <textarea value={example} onChange={(e) => setExample(e.target.value)} className={`${inputCls} h-20 resize-y`} />
              </Field>
            </div>
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
              What the evaluation will do
            </p>
            <ol className="space-y-3 rounded-xl border border-border bg-surface p-5 text-sm">
              <StepLine n="1" label="Boot an isolated environment with only the declared permissions." />
              <StepLine n="2" label="Run static analysis against the instructions." />
              <StepLine n="3" label="Execute the example prompt and record every file, network and shell call." />
              <StepLine n="4" label="Score against a task benchmark, with and without the skill." />
              <StepLine n="5" label="Compile an evidence profile across five independent signals." />
            </ol>
          </aside>
        </div>
      </section>

      {/* ───── §03 — safety ───── */}
      <section className="relative border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16 sm:py-20">
          <div>
            <SectionEyebrow number="03" label="safety" />
            <SectionHead sans="The minimum" italic="it needs." />
            <p className="mt-4 max-w-lg text-[15px] leading-7 text-muted">
              Declare only the tools and permissions the skill really uses. The evaluator will
              block anything else and report what it tried.
            </p>

            <div className="mt-10 space-y-6">
              <Field label="Required tools" hint="Comma-separated.">
                <input value={tools} onChange={(e) => setTools(e.target.value)} className={`${inputCls} font-mono text-xs`} />
              </Field>
              <Field label="Permissions" hint="Scope the smallest set that works.">
                <input value={permissions} onChange={(e) => setPermissions(e.target.value)} className={`${inputCls} font-mono text-xs`} />
              </Field>
            </div>
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Declared scope
            </p>
            <div className="space-y-3 rounded-xl border border-border bg-surface p-5">
              <ScopeLine label="Tools" value={tools} />
              <ScopeLine label="Permissions" value={permissions} />
              <p className="border-t border-border pt-3 text-xs text-muted">
                Anything the skill tries outside this list will show up as{" "}
                <span className="rounded bg-amber-500/15 px-1 py-0.5 font-mono text-[11px] text-amber-300">Anomaly</span>{" "}
                in the runtime trace.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ───── commit ───── */}
      <section className="relative">
        <div className="bg-dots absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-20">
          <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                §04 — commit
              </p>
              <h2 className="mt-4 text-[36px] leading-[1.08] tracking-tight sm:text-[44px]">
                <span className="font-semibold">Ready to</span>{" "}
                <span className="display-italic text-muted">evaluate?</span>
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-muted">
                Nothing is published yet. The evaluation runs in isolation and returns an evidence
                profile you&rsquo;ll review before anything ships.
              </p>
            </div>

            <div className="flex flex-col items-end gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/marketplace"
                className="btn-press inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:border-border-strong"
              >
                Cancel
              </Link>
              <button
                onClick={() => setPhase("testing")}
                className="btn-press inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-[color:var(--accent-ink)] shadow-[0_8px_30px_-8px_rgba(79,209,160,0.5)]"
              >
                Run evaluation
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────── form helpers ─────────── */

const inputCls =
  "w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none transition placeholder:text-muted focus:border-accent/60 focus:ring-2 focus:ring-accent/20";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</span>
        {hint && <span className="text-[11px] text-muted">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

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

function StepPill({ n, label, current }: { n: string; label: string; current?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`grid h-6 w-6 place-items-center rounded-full border font-mono text-[11px] ${
          current ? "border-accent bg-accent/10 text-accent" : "border-border bg-surface text-muted"
        }`}
      >
        {n}
      </span>
      <span className={`text-sm ${current ? "text-foreground" : "text-muted"}`}>{label}</span>
    </div>
  );
}
function StepArrow() {
  return <span className="text-muted/60">→</span>;
}

function StepLine({ n, label }: { n: string; label: string }) {
  return (
    <li className="flex gap-3">
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-border bg-background font-mono text-[10px] text-muted">
        {n}
      </span>
      <span className="text-sm text-foreground/90">{label}</span>
    </li>
  );
}

function ScopeLine({ label, value }: { label: string; value: string }) {
  const items = value.split(",").map((s) => s.trim()).filter(Boolean);
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.length === 0 ? (
          <span className="text-xs text-muted">none declared</span>
        ) : (
          items.map((it) => (
            <span key={it} className="rounded-md border border-border bg-background px-2 py-1 font-mono text-xs">
              {it}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

/* ─────────── evaluation (step-wise) ─────────── */

type EvalStep = { label: string; duration: number };

const EVAL_STEPS: EvalStep[] = [
  { label: "Preparing isolated environment", duration: 1800 },
  { label: "Loading skill instructions and permissions", duration: 1400 },
  { label: "Running static analysis on the skill", duration: 2000 },
  { label: "Executing example prompt under isolation", duration: 2600 },
  { label: "Recording filesystem, network and shell calls", duration: 2200 },
  { label: "Scoring agent with vs. without the skill", duration: 2400 },
  { label: "Compiling evidence profile across five signals", duration: 1800 },
];
const EVAL_TOTAL_MS = EVAL_STEPS.reduce((a, s) => a + s.duration, 0);

function TestingScreen({ name, onComplete }: { name: string; onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= EVAL_STEPS.length) {
      const t = setTimeout(onComplete, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setCurrentStep((c) => c + 1);
    }, EVAL_STEPS[currentStep].duration);
    return () => clearTimeout(t);
  }, [currentStep, onComplete]);

  const done = currentStep >= EVAL_STEPS.length;
  const displayStep = Math.min(currentStep + 1, EVAL_STEPS.length);
  const elapsed = EVAL_STEPS.slice(0, currentStep).reduce((a, s) => a + s.duration, 0);
  const progressPct = Math.min(100, Math.round((elapsed / EVAL_TOTAL_MS) * 100));

  return (
    <section className="relative mx-auto flex min-h-[80vh] w-full max-w-3xl flex-col justify-center px-6 py-16">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
        evaluation · in progress
      </p>
      <h2 className="mt-3 text-[32px] leading-[1.1] tracking-tight sm:text-[40px]">
        <span className="font-semibold">Evaluating</span>{" "}
        <span className="display-italic text-muted">&ldquo;{name}&rdquo;</span>
      </h2>
      <p className="mt-4 text-sm text-muted">
        {done
          ? "Finishing up — compiling the evidence profile."
          : EVAL_STEPS[currentStep].label + "…"}
      </p>

      {/* progress meter */}
      <div className="mt-8 flex items-baseline justify-between text-[11px] uppercase tracking-wider text-muted">
        <span>
          Step <span className="font-mono text-foreground">{displayStep}</span> of {EVAL_STEPS.length}
        </span>
        <span className="font-mono text-foreground">{progressPct}%</span>
      </div>
      <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-surface">
        <div
          className="h-full bg-gradient-to-r from-accent/50 to-accent transition-[width] duration-[600ms] ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* step list */}
      <ul className="mt-10 space-y-3.5">
        {EVAL_STEPS.map((s, i) => {
          const state: "complete" | "active" | "pending" =
            i < currentStep ? "complete" : i === currentStep ? "active" : "pending";
          return <StepRow key={i} label={s.label} state={state} index={i} />;
        })}
      </ul>
    </section>
  );
}

function StepRow({ label, state, index }: { label: string; state: "complete" | "active" | "pending"; index: number }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border font-mono text-[10px] ${
          state === "complete"
            ? "border-accent bg-accent/10 text-accent"
            : state === "active"
            ? "border-accent bg-accent/10 text-accent"
            : "border-border bg-surface text-muted"
        }`}
      >
        {state === "complete" ? (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : state === "active" ? (
          <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
        ) : (
          <span>{String(index + 1).padStart(2, "0")}</span>
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm ${
            state === "pending" ? "text-muted" : "text-foreground"
          }`}
        >
          {label}
        </p>
        {state === "active" && (
          <div className="relative mt-2 h-[2px] overflow-hidden rounded-full bg-surface-2">
            <div className="animate-scan absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent to-transparent" />
          </div>
        )}
      </div>
    </li>
  );
}

/* ─────────── report ─────────── */

function ReportScreen({ name, onPublish, onBack }: { name: string; onPublish: () => void; onBack: () => void }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-grid absolute inset-0" />
        <div className="relative mx-auto w-full max-w-5xl px-6 py-14 sm:py-20">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
            §05 — evidence returned
          </p>
          <h2 className="mt-3 text-[36px] leading-[1.08] tracking-tight sm:text-[48px]">
            <span className="font-semibold">&ldquo;{name}&rdquo; passed</span>{" "}
            <span className="display-italic text-muted">the evaluation.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
            Here&rsquo;s the evidence profile. Review it, then publish — or go back and tune the skill first.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-4">
            <ReportStat label="Trust score" value="82" unit="/ 100" accent />
            <ReportStat label="Task success" value="74%" />
            <ReportStat label="Baseline" value="47%" muted />
            <ReportStat label="Relative lift" value="+57%" accent />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-wider text-muted">
            Evidence summary
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <ReportLine status="pass" label="No outbound network calls outside allowlist" />
            <ReportLine status="pass" label="Read-only filesystem access confirmed" />
            <ReportLine status="pass" label="No prompt-injection vulnerabilities in test corpus" />
            <ReportLine status="warn" label="Latency spikes on inputs > 200kB" />
            <ReportLine status="pass" label="Instructions do not request elevated permissions" />
            <ReportLine status="info" label="Not yet tested with Gemini runtime" />
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="bg-dots absolute inset-0" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-6 px-6 py-16 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-[24px] font-semibold tracking-tight sm:text-[28px]">
              Ready to <span className="display-italic text-muted">ship it?</span>
            </h3>
            <p className="mt-2 text-sm text-muted">
              Publishing attaches this profile to the skill. Future versions re-run the same evaluation.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="btn-press rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:border-border-strong"
            >
              Edit and re-test
            </button>
            <button
              onClick={onPublish}
              className="btn-press inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-[color:var(--accent-ink)] shadow-[0_8px_30px_-8px_rgba(79,209,160,0.5)]"
            >
              Publish to marketplace
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function ReportStat({ label, value, unit, accent, muted }: { label: string; value: string; unit?: string; accent?: boolean; muted?: boolean }) {
  const tone = accent ? "text-accent" : muted ? "text-muted" : "text-foreground";
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="text-[11px] uppercase tracking-wider text-muted">{label}</div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className={`text-3xl font-semibold tabular-nums ${tone}`}>{value}</span>
        {unit && <span className="text-xs text-muted">{unit}</span>}
      </div>
    </div>
  );
}

function ReportLine({ status, label }: { status: "pass" | "warn" | "info"; label: string }) {
  const map = {
    pass: { dot: "bg-emerald-400", text: "text-emerald-300" },
    warn: { dot: "bg-amber-400", text: "text-amber-300" },
    info: { dot: "bg-sky-400", text: "text-sky-300" },
  };
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${map[status].dot}`} />
      <span className={`font-mono text-[10px] font-semibold uppercase tracking-wider ${map[status].text}`}>
        {status}
      </span>
      <span className="text-sm">{label}</span>
    </div>
  );
}

function PublishedScreen({ name }: { name: string }) {
  return (
    <section className="relative mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-start justify-center px-6 py-16">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
        §06 — live
      </p>
      <h2 className="mt-3 text-[40px] leading-[1.04] tracking-tight sm:text-[56px]">
        <span className="font-semibold">&ldquo;{name}&rdquo; is</span>{" "}
        <span className="display-italic text-accent">live.</span>
      </h2>
      <p className="mt-5 max-w-xl text-[15px] leading-7 text-muted">
        Published to the marketplace. Developers can install it with{" "}
        <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">vera add your-skill</code>.
        Every future version will be re-evaluated automatically.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/marketplace"
          className="btn-press inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:border-border-strong"
        >
          Back to the marketplace
        </Link>
        <Link
          href="/dashboard"
          className="btn-press inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-[color:var(--accent-ink)]"
        >
          View my skills
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
