import Link from "next/link";
import type { Skill } from "@/lib/types";
import { TrustBadge } from "./TrustBadge";
import { StarRating } from "./StarRating";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Link
      href={`/skill/${skill.id}`}
      className="lift group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface p-5 hover:border-border-strong hover:bg-surface-2"
    >
      {/* top hairline — subtle, no gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-border-strong/60" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background text-lg">
            {skill.icon}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold">{skill.name}</h3>
            <p className="text-xs text-muted">
              by {skill.author}
              {skill.authorVerified && (
                <span className="ml-1 text-accent" title="Verified publisher">✓</span>
              )}
            </p>
          </div>
        </div>
        <TrustBadge level={skill.trustLevel} score={skill.trustScore} />
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted">{skill.tagline}</p>

      <div className="mt-4 flex items-center justify-between text-xs">
        <StarRating rating={skill.rating} count={skill.reviewCount} />
        <span className="text-muted">
          {Intl.NumberFormat("en", { notation: "compact" }).format(skill.installs)} installs
        </span>
      </div>
    </Link>
  );
}
