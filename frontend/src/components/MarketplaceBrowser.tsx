"use client";

import { useMemo, useState } from "react";
import type { Skill } from "@/lib/types";
import { categories } from "@/lib/mock-data";
import { SkillCard } from "./SkillCard";

type Sort = "trust" | "installs" | "rating" | "recent";

export function MarketplaceBrowser({ skills }: { skills: Skill[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState<Sort>("trust");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = skills.filter((s) => {
      if (cat !== "all" && s.category !== cat) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    });

    const sorted = [...list];
    switch (sort) {
      case "trust":
        sorted.sort((a, b) => b.trustScore - a.trustScore);
        break;
      case "installs":
        sorted.sort((a, b) => b.installs - a.installs);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "recent":
        sorted.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
        break;
    }
    return sorted;
  }, [skills, query, cat, sort]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by task or capability — e.g. ‘review pull requests’"
            className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-muted focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent/60"
        >
          <option value="trust">Sort: Trust score</option>
          <option value="installs">Sort: Most installed</option>
          <option value="rating">Sort: Highest rated</option>
          <option value="recent">Sort: Recently updated</option>
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`btn-press inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition ${
              cat === c.id
                ? "border-accent/60 bg-accent/10 text-foreground"
                : "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground"
            }`}
          >
            <span>{c.icon}</span>
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted">
        <span>
          {filtered.length} {filtered.length === 1 ? "skill" : "skills"}
          {query && <> matching “{query}”</>}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <SkillCard key={s.id} skill={s} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-lg border border-dashed border-border bg-surface/60 p-10 text-center text-sm text-muted">
          No skills match. Try a different query or category.
        </div>
      )}
    </div>
  );
}
