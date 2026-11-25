import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex items-baseline gap-2.5">
          <span className="text-sm font-semibold tracking-tight">VERA</span>
          <span className="hidden text-[11px] font-normal text-muted sm:inline">
            verified ecosystem for reusable agents
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <NavLink href="/marketplace">Marketplace</NavLink>
          <NavLink href="/create">Publish</NavLink>
          <NavLink href="/dashboard">My skills</NavLink>
          <div className="ml-4 hidden items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-[11px] text-muted sm:flex">
            <span className="text-accent">$</span>
            <span>vera search code review</span>
          </div>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-1.5 text-muted transition hover:bg-surface hover:text-foreground"
    >
      {children}
    </Link>
  );
}
