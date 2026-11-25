import Link from "next/link";
import { skills } from "@/lib/mock-data";
import { MarketplaceBrowser } from "@/components/MarketplaceBrowser";

export default function MarketplacePage() {
  const totalInstalls = skills.reduce((a, s) => a + s.installs, 0);
  const verifiedCount = skills.filter((s) => s.trustLevel === "verified").length;
  const avgTrust = Math.round(skills.reduce((a, s) => a + s.trustScore, 0) / skills.length);

  return (
    <section className="relative">
      <div className="bg-grid absolute inset-0 h-[340px]" />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-14 sm:py-20">
        <div data-enter className="max-w-3xl">
          <div className="flex items-center gap-3 text-[11px]">
            <span className="font-medium uppercase tracking-[0.18em] text-accent">
              §02 — the marketplace
            </span>
            <span className="text-muted">·</span>
            <Link href="/" className="text-muted underline-draw hover:text-foreground">
              back to the landing
            </Link>
          </div>

          <h1 className="mt-4 text-[36px] leading-[1.08] tracking-tight sm:text-[52px]">
            <span className="font-semibold">Search by task.</span>{" "}
            <span className="display-italic text-muted">Rank by evidence.</span>
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-7 text-muted">
            Every skill carries its own trust profile. Filter by category, sort by evidence —
            not just popularity — and read the detail before you install.
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-6 text-sm">
            <Stat label="Published" value={skills.length} />
            <Stat label="Installs" value={Intl.NumberFormat("en", { notation: "compact" }).format(totalInstalls)} />
            <Stat label="Verified" value={verifiedCount} />
            <Stat label="Avg. trust" value={avgTrust} />
          </dl>
        </div>

        <div className="mt-14">
          <MarketplaceBrowser skills={skills} />
        </div>
      </div>
    </section>
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
