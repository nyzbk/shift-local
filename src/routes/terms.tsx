import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHero, Prose } from "@/components/site/Prose";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms of use — Shift WebP & AVIF converter" },
      {
        name: "description",
        content:
          "Shift is free, as-is. Conversion quality depends on your browser. AVIF may be disabled. You must have the right to process the files.",
      },
    ],
  }),
});

function Terms() {
  return (
    <AppShell>
      <Prose>
        <PageHero
          kicker="Terms"
          title="Terms"
          lead="Last updated: 28 August 2026. Shift is free. It is not a storage product and not a warranty."
        />
        <p>
          Shift is provided as-is, free of charge, by Ultimatum. Conversion quality depends on your browser, device
          memory, and the source file. AVIF encode and decode are not available on every device. Shift probes
          capability on load and will disable AVIF rather than emit a fake file.
        </p>
        <p>
          You must have the right to process the images you drop here. Do not use Shift to violate copyright or someone
          else’s privacy. Output filenames are a convenience; they do not change ownership of the picture.
        </p>
        <p>
          No watermark is added. No daily quota is enforced by us. The only limit is this device’s memory (warnings
          around 25 MB, refusal around 80 MB). That is to keep the tab alive, not to sell a plan.
        </p>
        <p>
          Ads, when live, are served by Google AdSense under Google’s policies. Studio notes on this site are not
          advertisements. The converter works with ads off. Clicking your own ads is not allowed.
        </p>
        <p>
          Shift does not store files, does not guarantee a smaller output, and does not promise that a given phone can
          encode AVIF. If a convert fails, try WebP or another device. There is no service-level agreement.
        </p>
        <p>
          Questions: <Link to="/contact">Contact</Link>. Privacy details: <Link to="/privacy">Privacy</Link>.
        </p>
      </Prose>
    </AppShell>
  );
}
