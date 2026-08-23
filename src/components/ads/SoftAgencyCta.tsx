import { Link } from "@tanstack/react-router";

export function SoftAgencyCta() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 text-center">
      <p className="font-display text-xl text-ink text-balance">Need a brand people actually want?</p>
      <p className="mt-2 text-sm text-muted text-pretty">
        Shift is a free tool from Ultimatum. We also build brand identity, private utilities, and $10k websites.
      </p>
      <Link
        to="/about"
        className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-copper-deep underline-offset-4 hover:underline"
      >
        About the studio
      </Link>
    </section>
  );
}
