import { Link } from "@tanstack/react-router";

const NAV = [
  { to: "/", label: "Convert" },
  { to: "/guide", label: "Guide" },
  { to: "/webp-vs-avif", label: "Compare" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="border-b border-line bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex min-h-11 items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-copper font-display text-sm text-paper">
            S
          </span>
          <span className="font-display text-lg tracking-tight">Shift</span>
          <span className="hidden text-sm text-muted sm:inline">WebP / AVIF</span>
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-1 sm:gap-2">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="inline-flex min-h-11 items-center px-2 text-sm text-muted hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
