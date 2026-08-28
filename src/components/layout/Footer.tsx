import { Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/ads/AdUnit";

const COLS = [
  {
    title: "Convert",
    links: [
      { to: "/", label: "WebP / AVIF converter" },
      { to: "/jpg-to-webp", label: "JPG to WebP" },
      { to: "/avif-to-jpg", label: "AVIF to JPG" },
      { to: "/iphone", label: "iPhone photos" },
    ],
  },
  {
    title: "Learn",
    links: [
      { to: "/guide", label: "How to convert" },
      { to: "/webp-vs-avif", label: "WebP vs AVIF" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Site",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/privacy", label: "Privacy" },
      { to: "/terms", label: "Terms" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <AdUnit slot="footer" />
        <div className="grid gap-8 sm:grid-cols-3">
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">{col.title}</p>
              <ul className="mt-3 space-y-1">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Shift · files stay on this device · no upload · no watermark · Ultimatum
        </p>
      </div>
    </footer>
  );
}
