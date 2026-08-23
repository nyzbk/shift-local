import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/privacy")({ component: Privacy });

function Privacy() {
  return (
    <AppShell>
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="font-display text-4xl">Privacy</h1>
        <p className="mt-2 text-sm text-muted">Last updated: 23 August 2026</p>

        <h2 className="mt-8 font-display text-2xl">Summary</h2>
        <p className="mt-4 text-pretty">
          Shift converts images entirely in your browser. Photos you drop here are not uploaded to our servers for
          processing. There is no account, no tracking of file contents, and no cloud conversion.
        </p>

        <h2 className="mt-8 font-display text-2xl">What we process</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-pretty text-muted">
          <li>
            <strong className="text-ink">Files you select</strong> stay on this device. Conversion runs in the tab
            (ImageBitmap + Canvas, and a local WebAssembly AVIF codec when the browser can load it). Closing the tab
            discards them.
          </li>
          <li>
            <strong className="text-ink">Technical logs:</strong> hosting / CDN (Vercel) may log IP, user-agent, and
            request paths for security and reliability. Those logs do not include your images.
          </li>
          <li>
            <strong className="text-ink">Advertising:</strong> Google AdSense (publisher ca-pub-7636435144500691) may
            set cookies after the site is approved. Ads are independent of image processing. See{" "}
            <a className="text-copper-deep underline" href="https://policies.google.com/privacy">
              Google Privacy & Terms
            </a>
            .
          </li>
        </ul>

        <h2 className="mt-8 font-display text-2xl">What we do not do</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-pretty text-muted">
          <li>We do not upload, store, or sell your photos.</li>
          <li>We do not require an account to convert files.</li>
          <li>We do not use your files to train models.</li>
          <li>We do not add watermarks.</li>
        </ul>

        <h2 className="mt-8 font-display text-2xl">Your choices</h2>
        <p className="mt-4 text-pretty text-muted">
          Do not select files you do not want processed in this tab. Use browser controls to clear site data. Ad
          settings:{" "}
          <a className="text-copper-deep underline" href="https://adssettings.google.com/">
            adssettings.google.com
          </a>
          .
        </p>
      </main>
    </AppShell>
  );
}
