import { Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/ads/AdUnit";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <AdUnit slot="footer" />
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
          <p>Shift · files stay on this device</p>
          <nav className="flex flex-wrap gap-4">
            <Link to="/privacy" className="min-h-11 inline-flex items-center hover:text-ink">
              Privacy
            </Link>
            <Link to="/terms" className="min-h-11 inline-flex items-center hover:text-ink">
              Terms
            </Link>
            <Link to="/about" className="min-h-11 inline-flex items-center hover:text-ink">
              About
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
