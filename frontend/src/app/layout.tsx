import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VERA — Verified Ecosystem for Reusable Agents",
  description:
    "A trusted marketplace and evaluation platform for AI-agent skills. Discover, install and publish skills with evidence-based trust profiles.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-type="software"
      data-radius="soft"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-sm font-semibold">VERA</span>
          <p className="mt-2 max-w-sm text-xs text-muted">
            A trusted marketplace and evaluation platform for AI-agent skills.
            Evidence over stars, continuously re-evaluated.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-xs text-muted">
          <a href="/marketplace" className="underline-draw">Marketplace</a>
          <a href="/create" className="underline-draw">Publish</a>
          <a href="/dashboard" className="underline-draw">My skills</a>
        </div>
      </div>
    </footer>
  );
}
