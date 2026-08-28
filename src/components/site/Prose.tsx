import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("prose-shift mx-auto w-full px-4 py-12", className)}>{children}</div>;
}

export function PageHero({
  kicker,
  title,
  lead,
}: {
  kicker?: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="mb-2">
      {kicker ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">{kicker}</p>
      ) : null}
      <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 text-pretty text-muted">{lead}</p>
    </header>
  );
}

export function ConvertCta({ label = "Open the converter" }: { label?: string }) {
  return (
    <p className="mt-10">
      <Link
        to="/"
        className="inline-flex min-h-11 items-center rounded-full bg-copper px-5 text-sm font-semibold text-paper hover:bg-copper-deep"
      >
        {label}
      </Link>
    </p>
  );
}
