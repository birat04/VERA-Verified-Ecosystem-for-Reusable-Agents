export type TrustLevel = "verified" | "trusted" | "caution" | "unverified";

export type EvidenceStatus = "pass" | "warn" | "fail" | "info";

export type EvidenceItem = {
  label: string;
  status: EvidenceStatus;
  detail: string;
};

export type EvidenceCategory =
  | "security"
  | "behavior"
  | "performance"
  | "compatibility"
  | "provenance";

export type Review = {
  author: string;
  rating: number;
  date: string;
  comment: string;
};

export type VersionEntry = {
  version: string;
  date: string;
  changes: string[];
  trustChange: "improved" | "unchanged" | "degraded";
  trustDelta?: number;
};

export type Benchmark = {
  name: string;
  score: number;
  baseline: number;
};

export type Skill = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  author: string;
  authorVerified: boolean;
  category: string;
  version: string;
  icon: string;
  accent: string;
  installs: number;
  rating: number;
  reviewCount: number;
  trustLevel: TrustLevel;
  trustScore: number;
  supportedAgents: string[];
  permissions: string[];
  tools: string[];
  lastUpdated: string;
  evidence: Record<EvidenceCategory, EvidenceItem[]>;
  evaluation: {
    taskSuccessRate: number;
    withoutSkillRate: number;
    improvement: number;
    benchmarks: Benchmark[];
  };
  sandbox: {
    filesystemWrites: string[];
    networkCalls: string[];
    commandsRun: string[];
    unexpectedBehavior: string[];
  };
  versions: VersionEntry[];
  reviews: Review[];
  examples: { title: string; body: string }[];
  installed?: boolean;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
};
