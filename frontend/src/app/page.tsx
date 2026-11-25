import Link from "next/link";
import { skills } from "@/lib/mock-data";
import { HeroVisual } from "@/components/HeroVisual";
import { TrustDiagram } from "@/components/TrustDiagram";

export default function Home() {
  const totalInstalls = skills.reduce((a, s) => a + s.installs, 0);
  const verifiedCount = skills.filter((s) => s.trustLevel === "verified").length;

  return (
    <>
      {/* ───── Section 1: hero ───── */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-grid absolute inset-0" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-6 py-16 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-10 lg:py-28">
          <div data-enter className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-[11px] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
              Evidence-based trust for every skill
            </span>

            <h1 className="mt-6 text-[44px] leading-[1.02] tracking-tight sm:text-[64px]">
              <span className="font-semibold">The store for</span>
              <br />
              <span className="font-semibold">AI agent skills.</span>
              <br />
              <span className="display-italic text-foreground/90"> Trust you can</span>{" "}
              <span className="display-italic text-accent"> inspect.</span>
            </h1>

            <p className="mt-6 max-w-lg text-[15px] leading-7 text-muted">
              {skills.length} skills published. {Intl.NumberFormat("en").format(totalInstalls)} installs.
              Every one re-evaluated on every version — with evidence covering security, behavior,
              performance, compatibility and provenance.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
              <Link
                href="/marketplace"
                className="btn-press inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-medium text-[color:var(--accent-ink)] shadow-[0_8px_30px_-8px_rgba(79,209,160,0.5)]"
              >
                Browse the marketplace
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/create"
                className="btn-press inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 font-medium hover:border-border-strong"
              >
                Publish your own
              </Link>
              <span className="ml-1 hidden items-center gap-2 font-mono text-[11px] text-muted sm:flex">
                <span className="text-accent">$</span>
                <span className="underline-draw">vera add code-reviewer-pro</span>
              </span>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6 text-sm">
              <Stat label="Published" value={skills.length} />
              <Stat label="Verified" value={verifiedCount} />
              <Stat label="Avg. trust" value={Math.round(skills.reduce((a, s) => a + s.trustScore, 0) / skills.length)} />
            </dl>
          </div>

          <div className="relative">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ───── Section 2: trust as evidence ───── */}
      <section className="relative border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
          <div className="mb-14 max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
              §01 — the model
            </p>
            <h2 className="mt-3 text-[32px] leading-[1.1] tracking-tight sm:text-[40px]">
              <span className="font-semibold">Trust as evidence,</span>{" "}
              <span className="display-italic text-muted">not stars.</span>
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-muted">
              Every skill ships with an evidence profile across five independent signals. The sandbox
              observes what the skill actually does, benchmarks measure whether it helps, and the whole
              thing is re-run on every version.
            </p>
          </div>

          <TrustDiagram />
        </div>
      </section>

      {/* ───── Section 3: publish flow ───── */}
      <section className="relative border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
          <div className="mb-14 max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
              §02 — publishing
            </p>
            <h2 className="mt-3 text-[32px] leading-[1.1] tracking-tight sm:text-[40px]">
              <span className="font-semibold">Create.</span>{" "}
              <span className="font-semibold">Evaluate.</span>{" "}
              <span className="display-italic text-muted">Publish.</span>
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-muted">
              Write instructions, declare tools and permissions, let the evaluator score the skill
              against task benchmarks. Publish only after the evidence is in.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Step
              step="01"
              title="Author"
              body="Name, description, instructions, required tools and permissions — in a plain form."
              mono={`name: "Code Reviewer Pro"\ntools: [git, linter]\npermissions:\n  - read:files\n  - read:git-history`}
            />
            <Step
              step="02"
              title="Evaluate"
              body="Static analysis + behavioural runs. Every call, file access and command is logged."
              mono={`▸ running benchmarks…\n✓ 0 outbound calls\n✓ read-only filesystem\n✓ 47/50 injections resisted`}
            />
            <Step
              step="03"
              title="Publish"
              body="Trust profile attached automatically. New versions re-run the full evaluation."
              mono={`trust: 82 / 100\nlift:  +57%\nlive:  vera add my-skill`}
              highlight
            />
          </div>
        </div>
      </section>

      {/* ───── Section 4: close ───── */}
      <section className="relative">
        <div className="bg-dots absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
              §03 — ship
            </p>
            <h2 className="mt-4 text-[40px] leading-[1.05] tracking-tight sm:text-[56px]">
              <span className="font-semibold">Install what&rsquo;s verified.</span>
              <br />
              <span className="display-italic text-muted">Build what you trust.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-muted">
              VERA keeps up with the ecosystem so your agent can rely on the skills you give it —
              not just the ones that happen to look popular today.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
              <Link
                href="/marketplace"
                className="btn-press inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-medium text-[color:var(--accent-ink)]"
              >
                Browse the marketplace
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/create"
                className="btn-press inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 font-medium hover:border-border-strong"
              >
                Publish a skill
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-1 text-xl font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

function Step({
  step,
  title,
  body,
  mono,
  highlight,
}: {
  step: string;
  title: string;
  body: string;
  mono: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`lift relative overflow-hidden rounded-xl border p-6 ${
        highlight ? "border-accent/40 bg-accent/[0.04]" : "border-border bg-surface"
      }`}
    >
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{step}</span>
        {highlight && (
          <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
            live
          </span>
        )}
      </div>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
      <pre className="mt-4 overflow-hidden rounded-lg border border-border bg-background/60 p-3 font-mono text-[11px] leading-5 text-foreground/80">
{mono}
      </pre>
    </div>
  );
}
