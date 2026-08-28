import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHero, Prose } from "@/components/site/Prose";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About Shift — private WebP and AVIF converter | Ultimatum" },
      {
        name: "description",
        content:
          "Shift converts JPG, PNG, WebP and AVIF in the browser. Built by Ultimatum because upload converters and fake AVIF encode fail people.",
      },
    ],
  }),
});

function About() {
  return (
    <AppShell>
      <Prose>
        <PageHero
          kicker="About"
          title="About Shift"
          lead="A free WebP and AVIF converter that stays on the device. Made by Ultimatum, a brand-marketing studio."
        />
        <p>
          Shift exists because the default “convert to WebP” result on the web is still an upload form. That is a bad
          default for photos of homes, IDs, children, and unreleased work. The second failure mode is quieter: sites
          that claim AVIF on a phone, call <code>toBlob('image/avif')</code>, and hand you a file that is not
          AVIF. Shift’s badge and disable path are the product response to that lie.
        </p>
        <p>
          The engineering is deliberately small. WebP, JPG and PNG go through Canvas. AVIF encode/decode uses a local
          WASM codec when the probe passes. ZIP is JSZip. There is no account graph, no cloud folder, no watermark
          renderer. Quality and max dimensions are the only knobs because codec choice is the job.
        </p>
        <p>
          Shift is one site, one repository, one domain: <strong>shift-local.vercel.app</strong>. It is not a tab
          inside a suite. The converter does not require an email. Ads, when they are live, are independent of the
          pixels you drop. Until Google approves the site, the ad slots are placeholders so we do not serve empty
          Auto ads on a thin page.
        </p>
        <h2>Who makes it</h2>
        <p>
          Ultimatum is a brand-marketing studio. We ship small private utilities next to client work because the
          public tools for “just change the codec” were either upload farms or dishonest about AVIF. Publisher ID for
          this property is <code>ca-pub-7636435144500691</code>. Contact:{" "}
          <a href="mailto:ultaultimatum@gmail.com">ultaultimatum@gmail.com</a>.
        </p>
        <p>
          Ultimatum also ships other private utilities. They are separate sites, separate repos, separate AdSense
          properties — not tabs inside Shift:
        </p>
        <ul>
          <li>
            <a href="https://crush-local.vercel.app">Crush</a> — compress JPG, PNG and WebP
          </li>
          <li>
            <a href="https://heic-local.vercel.app">HEIC Local</a> — HEIC to JPG/PNG
          </li>
          <li>
            <a href="https://folio-pdf-toolkit.vercel.app">Folio PDF Toolkit</a> — merge, split, compress PDFs
          </li>
          <li>
            <a href="https://nota-invoice-mu.vercel.app">Nota</a> — invoice PDFs
          </li>
          <li>
            <a href="https://strip-local.vercel.app">Strip</a> — EXIF / GPS metadata
          </li>
        </ul>
        <p>
          Questions: <Link to="/contact">Contact</Link>. How the converter works: <Link to="/guide">Guide</Link>.
          Privacy: <Link to="/privacy">Privacy</Link>.
        </p>
      </Prose>
    </AppShell>
  );
}
