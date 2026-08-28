import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHero, Prose } from "@/components/site/Prose";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy — Shift WebP & AVIF converter, no upload" },
      {
        name: "description",
        content:
          "Shift processes images in your browser. Photos are not uploaded for conversion. AdSense, hosting logs, and how to reach us.",
      },
    ],
  }),
});

function Privacy() {
  return (
    <AppShell>
      <Prose>
        <PageHero
          kicker="Privacy"
          title="Privacy"
          lead="Last updated: 28 August 2026. Conversion is in-tab. This page is the policy, not a slogan."
        />
        <h2>Summary</h2>
        <p>
          Shift converts images in your browser. Files you drop are not uploaded to Ultimatum for processing. There is
          no Shift account and no gallery. Close the tab and the working copies are gone.
        </p>
        <h2>What we process</h2>
        <ul>
          <li>
            <strong>Selected files</strong> stay on the device. Decode/encode use ImageBitmap, Canvas, and a WASM AVIF
            codec fetched as a static asset from this origin when needed. We do not receive the pixels.
          </li>
          <li>
            <strong>Hosting logs:</strong> Vercel may log IP, user-agent, and URL paths. Those logs are not your
            photos.
          </li>
          <li>
            <strong>Advertising:</strong> Google AdSense (publisher ca-pub-7636435144500691) may set cookies after the
            site is approved. Ads are not fed your images. See{" "}
            <a href="https://policies.google.com/privacy">Google Privacy & Terms</a>.
          </li>
        </ul>
        <h2>Cookies and ads</h2>
        <p>
          Shift itself does not need a cookie to convert. When ads are live, Google may use cookies or similar storage
          for ad serving and measurement. You can adjust ad personalization at{" "}
          <a href="https://adssettings.google.com/">adssettings.google.com</a>. Placeholder ad slots on this site are
          not trackers.
        </p>
        <h2>What we do not do</h2>
        <ul>
          <li>We do not upload, store, or sell your photos.</li>
          <li>We do not require an account to convert.</li>
          <li>We do not use your files to train models.</li>
          <li>We do not add watermarks.</li>
          <li>We do not send GPS or EXIF to a map API — Shift is not a metadata viewer.</li>
        </ul>
        <h2>Contact</h2>
        <p>
          Privacy questions: <Link to="/contact">Contact</Link> or{" "}
          <a href="mailto:ultaultimatum@gmail.com">ultaultimatum@gmail.com</a>.
        </p>
      </Prose>
    </AppShell>
  );
}
