import type { Category, Skill } from "./types";

export const categories: Category[] = [
  { id: "all", name: "All", icon: "✨" },
  { id: "development", name: "Development", icon: "⚡" },
  { id: "research", name: "Research", icon: "🔎" },
  { id: "documents", name: "Documents", icon: "📄" },
  { id: "github", name: "GitHub", icon: "🐙" },
  { id: "data", name: "Data", icon: "📊" },
  { id: "security", name: "Security", icon: "🛡️" },
  { id: "productivity", name: "Productivity", icon: "📨" },
];

export const skills: Skill[] = [
  {
    id: "code-reviewer-pro",
    name: "Code Reviewer Pro",
    tagline: "PR reviews that catch what humans miss",
    description:
      "Reviews pull requests for correctness, style, security and performance concerns. Leaves inline comments mapped to specific lines, with suggested patches. Trained on reviews from 400+ open-source projects.",
    author: "vera-labs",
    authorVerified: true,
    category: "development",
    version: "2.4.1",
    icon: "⚡",
    accent: "from-violet-500 to-fuchsia-500",
    installs: 48230,
    rating: 4.8,
    reviewCount: 1284,
    trustLevel: "verified",
    trustScore: 94,
    supportedAgents: ["Claude", "GPT", "Gemini"],
    permissions: ["read:files", "read:git-history", "write:comments"],
    tools: ["git", "ast-parser", "linter"],
    lastUpdated: "2026-11-18",
    evidence: {
      security: [
        { label: "No secrets exfiltrated across 10,000 isolated runs", status: "pass", detail: "No outbound network calls to non-allowlisted hosts observed across 10,000 isolated runs." },
        { label: "Read-only filesystem access", status: "pass", detail: "Skill never writes outside the review-comment buffer." },
        { label: "Signed by verified publisher", status: "pass", detail: "Publisher key matches vera-labs provenance chain." },
        { label: "No shell execution requested", status: "pass", detail: "Static analysis shows no subprocess spawning paths." },
      ],
      behavior: [
        { label: "Consistent output format across runs", status: "pass", detail: "Variance across 1,000 identical inputs: 2.1% token-level." },
        { label: "No prompt-injection susceptibility in test corpus", status: "pass", detail: "Resisted 47/50 adversarial injection attempts in the VERA-INJ-v2 benchmark." },
        { label: "Occasional false positives on generated code", status: "warn", detail: "Flagged auto-generated migrations as style violations in 3% of runs." },
      ],
      performance: [
        { label: "P95 latency 2.3s on 500-line diff", status: "pass", detail: "Measured on standard runner (4 vCPU, 8GB RAM)." },
        { label: "Memory ceiling 340MB", status: "pass", detail: "Well within the 1GB runtime budget." },
      ],
      compatibility: [
        { label: "Works with Claude, GPT, Gemini", status: "pass", detail: "Tested against 3 agent runtimes with matching output quality." },
        { label: "Node ≥20 required", status: "info", detail: "Uses optional-chaining-null-coalesce assignment." },
      ],
      provenance: [
        { label: "Source: github.com/vera-labs/code-reviewer", status: "pass", detail: "Reproducible build from commit 7f3a9c1." },
        { label: "Published by vera-labs (verified org)", status: "pass", detail: "Publisher org verified 2024-03-02." },
        { label: "SBOM available", status: "pass", detail: "17 transitive dependencies, all with known licenses." },
      ],
    },
    evaluation: {
      taskSuccessRate: 0.87,
      withoutSkillRate: 0.54,
      improvement: 61,
      benchmarks: [
        { name: "SWE-Review-Bench", score: 82, baseline: 51 },
        { name: "Bug-Catch-100", score: 78, baseline: 42 },
        { name: "Style-Consistency", score: 91, baseline: 68 },
      ],
    },
    sandbox: {
      filesystemWrites: ["/tmp/review-buffer.json"],
      networkCalls: ["api.github.com (allowlisted)"],
      commandsRun: ["git diff", "git log --oneline"],
      unexpectedBehavior: [],
    },
    versions: [
      { version: "2.4.1", date: "2026-11-18", changes: ["Fixed false positives on generated code"], trustChange: "improved", trustDelta: 2 },
      { version: "2.4.0", date: "2026-10-30", changes: ["Added Rust support", "New prompt-injection defenses"], trustChange: "improved", trustDelta: 4 },
      { version: "2.3.2", date: "2026-09-12", changes: ["Minor bug fixes"], trustChange: "unchanged" },
      { version: "2.3.0", date: "2026-08-01", changes: ["Breaking: comment format changed"], trustChange: "degraded", trustDelta: -3 },
    ],
    reviews: [
      { author: "priya.k", rating: 5, date: "2026-11-20", comment: "Caught a race condition we've been chasing for weeks. Worth every token." },
      { author: "mike-dev", rating: 4, date: "2026-11-05", comment: "Great for backend PRs. Still gets confused by complex React state." },
      { author: "ananya", rating: 5, date: "2026-10-22", comment: "The inline suggested patches are the killer feature." },
    ],
    examples: [
      { title: "Review a PR", body: "Review the latest commit on branch 'feat/auth-refactor' and leave inline comments." },
      { title: "Security-focused review", body: "Check this diff for OWASP top-10 issues only. Skip style." },
    ],
    installed: true,
  },
  {
    id: "research-scout",
    name: "Research Scout",
    tagline: "Multi-source research with citations",
    description:
      "Searches across academic papers, documentation, blogs and discussion forums, deduplicates findings, and returns a cited report. Marks claims as supported, contested, or single-source.",
    author: "anthropic-community",
    authorVerified: true,
    category: "research",
    version: "1.8.0",
    icon: "🔎",
    accent: "from-sky-500 to-cyan-500",
    installs: 31005,
    rating: 4.6,
    reviewCount: 872,
    trustLevel: "trusted",
    trustScore: 88,
    supportedAgents: ["Claude", "GPT"],
    permissions: ["network:http", "write:reports"],
    tools: ["web-search", "arxiv-api", "markdown-render"],
    lastUpdated: "2026-11-11",
    evidence: {
      security: [
        { label: "Network allowlist: 14 domains", status: "pass", detail: "Only reaches configured research endpoints." },
        { label: "No credential storage", status: "pass", detail: "API keys passed per-request, never persisted." },
      ],
      behavior: [
        { label: "Citations verified on 94% of runs", status: "pass", detail: "Automated citation-check matched claims to sources in 942/1000 runs." },
        { label: "Occasionally hallucinates arXiv IDs", status: "warn", detail: "Fabricated 1 of 120 arXiv references in long reports." },
      ],
      performance: [
        { label: "P95 latency 11s on 20-source query", status: "pass", detail: "Parallelized retrieval; latency dominated by external APIs." },
      ],
      compatibility: [
        { label: "Not tested on Gemini", status: "info", detail: "Publisher marks Gemini as 'likely works, unverified'." },
      ],
      provenance: [
        { label: "Open source (MIT)", status: "pass", detail: "github.com/anthropic-community/research-scout" },
        { label: "Maintainer activity: 42 commits/month", status: "pass", detail: "Active maintenance cadence." },
      ],
    },
    evaluation: {
      taskSuccessRate: 0.79,
      withoutSkillRate: 0.41,
      improvement: 93,
      benchmarks: [
        { name: "CitationAccuracy-Bench", score: 94, baseline: 62 },
        { name: "MultiDoc-QA", score: 71, baseline: 48 },
      ],
    },
    sandbox: {
      filesystemWrites: ["/tmp/research/*.md"],
      networkCalls: ["arxiv.org", "scholar.google.com", "en.wikipedia.org"],
      commandsRun: [],
      unexpectedBehavior: [],
    },
    versions: [
      { version: "1.8.0", date: "2026-11-11", changes: ["Added arXiv full-text retrieval"], trustChange: "unchanged" },
      { version: "1.7.3", date: "2026-10-04", changes: ["Citation verifier upgraded"], trustChange: "improved", trustDelta: 3 },
      { version: "1.7.0", date: "2026-08-20", changes: ["New report template"], trustChange: "unchanged" },
    ],
    reviews: [
      { author: "dr-sato", rating: 5, date: "2026-11-15", comment: "The 'contested' vs 'supported' tagging is a game-changer for lit reviews." },
      { author: "undergrad99", rating: 4, date: "2026-11-02", comment: "Slow on big topics but the citations hold up." },
    ],
    examples: [
      { title: "Literature review", body: "Write a 2-page review on contrastive learning in vision models, 2023–now." },
      { title: "Compare sources", body: "Find three recent perspectives on Rust's async story." },
    ],
    installed: true,
  },
  {
    id: "pdf-insight",
    name: "PDF Insight",
    tagline: "Extracts structure, tables and cross-references",
    description:
      "Parses complex PDFs including scanned contracts and research papers. Preserves table structure, resolves intra-doc references, extracts figures with captions.",
    author: "parsely-ai",
    authorVerified: true,
    category: "documents",
    version: "3.1.2",
    icon: "📄",
    accent: "from-emerald-500 to-teal-500",
    installs: 22411,
    rating: 4.5,
    reviewCount: 540,
    trustLevel: "trusted",
    trustScore: 84,
    supportedAgents: ["Claude", "GPT", "Gemini"],
    permissions: ["read:files", "write:extracts"],
    tools: ["pdf-parser", "ocr", "table-detect"],
    lastUpdated: "2026-11-02",
    evidence: {
      security: [
        { label: "Fully offline execution", status: "pass", detail: "No network calls in the OCR pipeline." },
        { label: "Dependency: outdated libssl flagged", status: "warn", detail: "libssl pinned to 3.0.9 — one CVE (medium) open; patch expected v3.1.3." },
      ],
      behavior: [
        { label: "Table extraction 91% F1 on CamTab-Bench", status: "pass", detail: "Best-in-class on multi-page tables with merged cells." },
      ],
      performance: [
        { label: "Memory 1.2GB on 500-page PDF", status: "warn", detail: "May exceed 1GB runtime cap on very large documents." },
      ],
      compatibility: [
        { label: "All agents supported", status: "pass", detail: "Verified on Claude, GPT and Gemini runtimes." },
      ],
      provenance: [
        { label: "Closed source, binary distribution", status: "info", detail: "No source audit possible; relies on runtime and behavior evidence." },
        { label: "Publisher parsely-ai verified", status: "pass", detail: "Corporate publisher since 2024-07." },
      ],
    },
    evaluation: {
      taskSuccessRate: 0.83,
      withoutSkillRate: 0.37,
      improvement: 124,
      benchmarks: [
        { name: "CamTab-Bench", score: 91, baseline: 54 },
        { name: "LongDoc-QA", score: 76, baseline: 39 },
      ],
    },
    sandbox: {
      filesystemWrites: ["/tmp/pdf-extracts/*.json"],
      networkCalls: [],
      commandsRun: [],
      unexpectedBehavior: [],
    },
    versions: [
      { version: "3.1.2", date: "2026-11-02", changes: ["Faster OCR on rotated pages"], trustChange: "unchanged" },
      { version: "3.1.0", date: "2026-09-15", changes: ["New table detection model"], trustChange: "improved", trustDelta: 5 },
    ],
    reviews: [
      { author: "legal-ops", rating: 5, date: "2026-11-10", comment: "Cross-references in contracts just work. Saved us hours per deal." },
      { author: "phd-reader", rating: 4, date: "2026-10-30", comment: "Figure extraction is still a bit noisy." },
    ],
    examples: [
      { title: "Summarize a contract", body: "Pull all obligations and dates from the attached MSA." },
      { title: "Extract tables", body: "Extract every table in this paper as CSV." },
    ],
  },
  {
    id: "github-triage",
    name: "GitHub Triage",
    tagline: "Auto-labels and routes issues to the right team",
    description:
      "Reads new issues, applies labels, estimates severity, deduplicates against open issues, and routes to the owning team based on CODEOWNERS and historical patterns.",
    author: "octoflow",
    authorVerified: false,
    category: "github",
    version: "0.9.4",
    icon: "🐙",
    accent: "from-orange-500 to-pink-500",
    installs: 8422,
    rating: 4.1,
    reviewCount: 203,
    trustLevel: "caution",
    trustScore: 61,
    supportedAgents: ["Claude", "GPT"],
    permissions: ["network:github", "write:labels", "write:assignees"],
    tools: ["github-api", "fuzzy-match"],
    lastUpdated: "2026-10-27",
    evidence: {
      security: [
        { label: "Requests broad GitHub token scope", status: "warn", detail: "Asks for `repo` scope where `public_repo` might suffice." },
        { label: "No rate-limit exhaustion observed", status: "pass", detail: "Respects X-RateLimit headers in isolated runs." },
      ],
      behavior: [
        { label: "Dedup precision 74%", status: "warn", detail: "Below publisher's claim of 90%. False dedups observed on short issue titles." },
        { label: "Team routing accuracy 68%", status: "warn", detail: "Falls back to default team when CODEOWNERS is incomplete." },
      ],
      performance: [
        { label: "P95 latency 1.1s per issue", status: "pass", detail: "Well within interactive budget." },
      ],
      compatibility: [
        { label: "Not tested on Gemini", status: "info", detail: "Publisher does not claim Gemini support." },
      ],
      provenance: [
        { label: "Unverified publisher", status: "warn", detail: "No verified identity; rely on runtime evidence." },
        { label: "Open source (Apache-2.0)", status: "pass", detail: "github.com/octoflow/triage" },
      ],
    },
    evaluation: {
      taskSuccessRate: 0.64,
      withoutSkillRate: 0.38,
      improvement: 68,
      benchmarks: [
        { name: "IssueDedup-Bench", score: 74, baseline: 52 },
        { name: "RouteAccuracy-Bench", score: 68, baseline: 44 },
      ],
    },
    sandbox: {
      filesystemWrites: [],
      networkCalls: ["api.github.com"],
      commandsRun: [],
      unexpectedBehavior: ["Attempted to read .github/workflows (no permission, blocked)"],
    },
    versions: [
      { version: "0.9.4", date: "2026-10-27", changes: ["Dedup heuristics tweaked"], trustChange: "unchanged" },
      { version: "0.9.0", date: "2026-09-02", changes: ["Reduced required token scopes"], trustChange: "improved", trustDelta: 6 },
    ],
    reviews: [
      { author: "eng-mgr", rating: 4, date: "2026-11-01", comment: "Good enough to be a useful first pass. We still review." },
      { author: "oss-maintainer", rating: 3, date: "2026-10-20", comment: "Dedup is wrong often enough that I had to turn it off." },
    ],
    examples: [
      { title: "Triage new issues", body: "Process all issues opened in the last 24 hours." },
      { title: "Dedup only", body: "Find duplicates of issue #4821, don't label." },
    ],
  },
  {
    id: "sql-craft",
    name: "SQL Craft",
    tagline: "Natural language to safe, performant SQL",
    description:
      "Converts natural-language questions into SQL for Postgres, MySQL, BigQuery and Snowflake. Explains query plans, warns about missing indexes, refuses destructive writes unless explicitly allowed.",
    author: "vera-labs",
    authorVerified: true,
    category: "data",
    version: "1.4.0",
    icon: "📊",
    accent: "from-indigo-500 to-blue-500",
    installs: 19877,
    rating: 4.7,
    reviewCount: 611,
    trustLevel: "verified",
    trustScore: 92,
    supportedAgents: ["Claude", "GPT", "Gemini"],
    permissions: ["network:db-proxy", "read:schema"],
    tools: ["sql-parser", "explain-planner"],
    lastUpdated: "2026-11-20",
    evidence: {
      security: [
        { label: "Refuses DROP/TRUNCATE by default", status: "pass", detail: "Destructive statements require explicit `--allow-destructive` flag." },
        { label: "Parameterized queries only", status: "pass", detail: "Generated SQL always uses placeholders; no string concat paths." },
      ],
      behavior: [
        { label: "Query-plan warnings in 82% of slow cases", status: "pass", detail: "Correctly flagged missing indexes on 82% of EXPLAIN-flagged plans." },
      ],
      performance: [
        { label: "P95 latency 1.8s", status: "pass", detail: "Measured against real DB schemas up to 200 tables." },
      ],
      compatibility: [
        { label: "All agents + 4 dialects", status: "pass", detail: "Postgres, MySQL, BigQuery, Snowflake covered." },
      ],
      provenance: [
        { label: "Signed by vera-labs", status: "pass", detail: "Verified publisher chain." },
        { label: "Reproducible build", status: "pass", detail: "Build from source matches published artifact." },
      ],
    },
    evaluation: {
      taskSuccessRate: 0.89,
      withoutSkillRate: 0.46,
      improvement: 93,
      benchmarks: [
        { name: "Spider-Bench", score: 86, baseline: 52 },
        { name: "DestructiveOp-Refusal", score: 100, baseline: 12 },
      ],
    },
    sandbox: {
      filesystemWrites: [],
      networkCalls: ["db-proxy.vera.internal"],
      commandsRun: [],
      unexpectedBehavior: [],
    },
    versions: [
      { version: "1.4.0", date: "2026-11-20", changes: ["BigQuery support"], trustChange: "unchanged" },
      { version: "1.3.0", date: "2026-10-01", changes: ["Index-hint warnings"], trustChange: "improved", trustDelta: 2 },
    ],
    reviews: [
      { author: "data-eng", rating: 5, date: "2026-11-21", comment: "Refusing DROP is table stakes done right. Love it." },
      { author: "analyst-amy", rating: 5, date: "2026-11-14", comment: "Explains query plans better than my senior DBA some days." },
    ],
    examples: [
      { title: "Count users by region", body: "How many active users do we have per region in the last 30 days?" },
      { title: "Diagnose a slow query", body: "Why is the orders-by-month report slow? Suggest fixes." },
    ],
    installed: true,
  },
  {
    id: "slack-broadcaster",
    name: "Slack Broadcaster",
    tagline: "Composes clear team updates from raw context",
    description:
      "Given a channel history or a doc link, drafts a team update that matches your org's tone. Supports approval workflow before posting.",
    author: "comms-ai",
    authorVerified: false,
    category: "productivity",
    version: "0.6.1",
    icon: "📨",
    accent: "from-pink-500 to-rose-500",
    installs: 5341,
    rating: 3.9,
    reviewCount: 142,
    trustLevel: "caution",
    trustScore: 58,
    supportedAgents: ["Claude", "GPT"],
    permissions: ["network:slack", "write:messages", "read:channels"],
    tools: ["slack-api"],
    lastUpdated: "2026-10-14",
    evidence: {
      security: [
        { label: "Dry-run mode available", status: "pass", detail: "Can preview messages without posting." },
        { label: "Requests `chat:write` for all channels", status: "warn", detail: "Broader scope than strictly needed for approval workflow." },
      ],
      behavior: [
        { label: "Tone matching varies by org", status: "warn", detail: "Required fine-tuning on 3 of 5 test orgs to hit acceptable tone." },
      ],
      performance: [
        { label: "P95 latency 0.9s", status: "pass", detail: "" },
      ],
      compatibility: [
        { label: "Not tested on Gemini", status: "info", detail: "" },
      ],
      provenance: [
        { label: "Unverified publisher", status: "warn", detail: "No verified identity." },
      ],
    },
    evaluation: {
      taskSuccessRate: 0.58,
      withoutSkillRate: 0.44,
      improvement: 32,
      benchmarks: [
        { name: "ToneMatch-Bench", score: 64, baseline: 48 },
      ],
    },
    sandbox: {
      filesystemWrites: [],
      networkCalls: ["slack.com/api"],
      commandsRun: [],
      unexpectedBehavior: [],
    },
    versions: [
      { version: "0.6.1", date: "2026-10-14", changes: ["Approval workflow added"], trustChange: "improved", trustDelta: 4 },
      { version: "0.6.0", date: "2026-09-10", changes: ["Initial public release"], trustChange: "unchanged" },
    ],
    reviews: [
      { author: "pm-leo", rating: 4, date: "2026-10-30", comment: "Good for status updates. Not for sensitive comms." },
      { author: "sre-brenda", rating: 3, date: "2026-10-18", comment: "Tone felt generic until I tuned it." },
    ],
    examples: [
      { title: "Weekly update", body: "Summarize this week's engineering wins for #team-general." },
    ],
  },
  {
    id: "data-profiler",
    name: "Data Profiler",
    tagline: "Dataset-shape, drift and anomaly reports",
    description:
      "Profiles CSV, Parquet and dataframes: column stats, null patterns, cardinality, drift vs. a baseline snapshot, and anomaly flags.",
    author: "pola-labs",
    authorVerified: true,
    category: "data",
    version: "2.0.3",
    icon: "📈",
    accent: "from-amber-500 to-orange-500",
    installs: 14207,
    rating: 4.4,
    reviewCount: 368,
    trustLevel: "trusted",
    trustScore: 81,
    supportedAgents: ["Claude", "GPT"],
    permissions: ["read:files"],
    tools: ["polars", "numpy"],
    lastUpdated: "2026-11-08",
    evidence: {
      security: [
        { label: "No network access", status: "pass", detail: "Offline execution." },
        { label: "Reads only paths passed in request", status: "pass", detail: "No directory traversal under isolation." },
      ],
      behavior: [
        { label: "Drift detection F1 0.88", status: "pass", detail: "On synthetic drift suite." },
      ],
      performance: [
        { label: "Streams datasets >10GB", status: "pass", detail: "Chunked processing; constant memory." },
      ],
      compatibility: [
        { label: "Gemini untested", status: "info", detail: "" },
      ],
      provenance: [
        { label: "Open source (BSD-3)", status: "pass", detail: "github.com/pola-labs/profiler" },
      ],
    },
    evaluation: {
      taskSuccessRate: 0.81,
      withoutSkillRate: 0.39,
      improvement: 108,
      benchmarks: [
        { name: "DriftDetect-Bench", score: 88, baseline: 55 },
      ],
    },
    sandbox: {
      filesystemWrites: ["/tmp/profiles/*.json"],
      networkCalls: [],
      commandsRun: [],
      unexpectedBehavior: [],
    },
    versions: [
      { version: "2.0.3", date: "2026-11-08", changes: ["Parquet streaming fix"], trustChange: "unchanged" },
      { version: "2.0.0", date: "2026-09-25", changes: ["Rewrite on Polars 1.x"], trustChange: "improved", trustDelta: 7 },
    ],
    reviews: [
      { author: "ml-engineer", rating: 5, date: "2026-11-15", comment: "Drift reports saved us from a silent model regression." },
      { author: "data-sci", rating: 4, date: "2026-11-01", comment: "Great. Wish it had more visualization options." },
    ],
    examples: [
      { title: "Profile a CSV", body: "Give me a full column profile of sales_2026.csv." },
      { title: "Drift report", body: "Compare today's user_events against last Monday's baseline." },
    ],
  },
  {
    id: "security-linter",
    name: "Security Linter",
    tagline: "Finds vulns before CI does",
    description:
      "Scans source trees for OWASP top-10, secrets, outdated dependencies and dangerous patterns. Explains each finding with CWE references and a suggested fix.",
    author: "sec-watch",
    authorVerified: true,
    category: "security",
    version: "1.2.0",
    icon: "🛡️",
    accent: "from-red-500 to-rose-500",
    installs: 10942,
    rating: 4.6,
    reviewCount: 284,
    trustLevel: "verified",
    trustScore: 95,
    supportedAgents: ["Claude", "GPT", "Gemini"],
    permissions: ["read:files"],
    tools: ["semgrep", "gitleaks"],
    lastUpdated: "2026-11-22",
    evidence: {
      security: [
        { label: "Read-only, no network", status: "pass", detail: "Fully offline analyzer." },
        { label: "No executable rule-loading", status: "pass", detail: "Rules are YAML-only; no code execution path." },
        { label: "Signed by sec-watch", status: "pass", detail: "Verified publisher." },
      ],
      behavior: [
        { label: "0.3% false positive on OWASP-Bench", status: "pass", detail: "Among the lowest false-positive rates in its category." },
      ],
      performance: [
        { label: "Scans 100k LOC in 14s", status: "pass", detail: "Parallelized rule evaluation." },
      ],
      compatibility: [
        { label: "All agents, 12 languages", status: "pass", detail: "Python, JS/TS, Go, Rust, Java, C#, Ruby, PHP, Swift, Kotlin, C, C++." },
      ],
      provenance: [
        { label: "Open source (MIT)", status: "pass", detail: "github.com/sec-watch/linter" },
        { label: "SBOM + reproducible", status: "pass", detail: "" },
      ],
    },
    evaluation: {
      taskSuccessRate: 0.92,
      withoutSkillRate: 0.31,
      improvement: 197,
      benchmarks: [
        { name: "OWASP-Bench", score: 94, baseline: 38 },
        { name: "SecretDetect", score: 99, baseline: 61 },
      ],
    },
    sandbox: {
      filesystemWrites: ["/tmp/findings.json"],
      networkCalls: [],
      commandsRun: [],
      unexpectedBehavior: [],
    },
    versions: [
      { version: "1.2.0", date: "2026-11-22", changes: ["New SQL-injection rules", "Swift support"], trustChange: "improved", trustDelta: 1 },
      { version: "1.1.0", date: "2026-10-05", changes: ["Reduced false positives"], trustChange: "improved", trustDelta: 3 },
    ],
    reviews: [
      { author: "appsec-raj", rating: 5, date: "2026-11-23", comment: "Lowest noise of any linter I've used. Keep it." },
      { author: "ci-wrangler", rating: 4, date: "2026-11-10", comment: "Slower than I'd like on huge monorepos." },
    ],
    examples: [
      { title: "Full scan", body: "Scan the whole repo and group findings by severity." },
      { title: "Secrets only", body: "Just check for committed secrets in the last 50 commits." },
    ],
  },
];

export function getSkill(id: string): Skill | undefined {
  return skills.find((s) => s.id === id);
}

export function trustLevelColor(level: Skill["trustLevel"]): string {
  switch (level) {
    case "verified":
      return "text-emerald-300 bg-emerald-500/10 border-emerald-500/30";
    case "trusted":
      return "text-sky-300 bg-sky-500/10 border-sky-500/30";
    case "caution":
      return "text-amber-300 bg-amber-500/10 border-amber-500/30";
    case "unverified":
      return "text-zinc-400 bg-zinc-500/10 border-zinc-500/30";
  }
}

export function trustLevelLabel(level: Skill["trustLevel"]): string {
  switch (level) {
    case "verified":
      return "Verified";
    case "trusted":
      return "Trusted";
    case "caution":
      return "Caution";
    case "unverified":
      return "Unverified";
  }
}
