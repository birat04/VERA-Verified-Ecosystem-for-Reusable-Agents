"use client";

import { useState } from "react";

export function InstallSnippet({ skillId, installed }: { skillId: string; installed?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [isInstalled, setIsInstalled] = useState(!!installed);
  const cmd = `vera add ${skillId}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between rounded-lg border border-border bg-black/40 p-3 font-mono text-sm">
        <span>
          <span className="text-violet-400">$</span> {cmd}
        </span>
        <button
          onClick={copy}
          className="rounded-md border border-border bg-surface px-2 py-1 text-xs text-muted transition hover:text-foreground"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>

      <button
        disabled={isInstalled}
        onClick={() => setIsInstalled(true)}
        className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium transition ${
          isInstalled
            ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
            : "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 hover:brightness-110"
        }`}
      >
        {isInstalled ? "✓ Installed" : "Install skill"}
      </button>

      <p className="text-xs text-muted">
        Compatible with your current agent. No elevated permissions requested.
      </p>
    </div>
  );
}
