import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="border-b border-line bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex min-h-11 items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-copper font-display text-sm text-paper">
            S
          </span>
          <span className="font-display text-lg tracking-tight">Shift</span>
          <span className="hidden text-sm text-muted sm:inline">Free WebP / AVIF Converter</span>
        </Link>
        <p className="max-w-[46%] text-right text-xs uppercase tracking-wider text-muted">
          No upload. No signup. No watermark.
        </p>
      </div>
    </header>
  );
}
