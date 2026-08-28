import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { ConvertCta, PageHero, Prose } from "@/components/site/Prose";

export const Route = createFileRoute("/iphone")({
  component: IphonePage,
  head: () => ({
    meta: [
      { title: "Convert photos to WebP on iPhone Safari — no app store | Shift" },
      {
        name: "description",
        content:
          "Use Shift in iOS Safari: Choose files, WebP default, honest AVIF badge, Share sheet download. HEIC is a different tool.",
      },
    ],
  }),
});

function IphonePage() {
  return (
    <AppShell>
      <Prose>
        <PageHero
          kicker="iPhone"
          title="Convert Camera Roll photos to WebP on iPhone"
          lead="Safari is the app. There is no Shift listing in the App Store. Files stay on the phone."
        />
        <h2>HEIC first, then Shift</h2>
        <p>
          iPhone still stores many originals as HEIC. Shift will refuse those on purpose after reading the{" "}
          <code>ftyp</code> brand. Convert HEIC to JPG with HEIC Local (also in-browser), then open that JPG here for
          WebP or AVIF. If you already used “Most Compatible” in Camera settings, you likely have JPEG and can skip
          that hop.
        </p>
        <p>
          Settings → Camera → Formats → Most Compatible writes JPEG into the roll. High Efficiency writes HEIC. Shift
          is a codec converter, not a HEIF decoder. The refusal is a sentence on the row, not a silent skip, so you
          know which files never entered the canvas.
        </p>
        <h2>Use Choose files, not drag-and-drop</h2>
        <p>
          iOS Safari’s drop target is unreliable. Tap Choose files, pick one or more photos, set WebP (default), set a
          max width of 1920 if the phone is old or the photos are 48 MP, then Convert. If AVIF encode is no on your
          iOS version, ignore AVIF. That badge is the truth for this device, not a broken feature flag.
        </p>
        <p>
          You can pick from Camera Roll or from the Files app. iCloud photos that have not downloaded yet may arrive as
          tiny placeholders or fail the magic-byte check. Wait for the full photo, then convert. Live Photos: you get
          the still, not the motion pair.
        </p>
        <h2>Download and Share</h2>
        <p>
          After convert, Download tries the iOS Share sheet with a real File when <code>canShare</code> allows it. Save
          to Files, AirDrop, or Mail from there. If you cancel the sheet, nothing is uploaded anywhere because nothing
          left the phone. If Share is unavailable, a standard download link is used. Allow a couple of seconds before
          the blob URL is revoked.
        </p>
        <p>
          Mail and Messages may recompress what you attach. If the point was a small WebP for a website, Save to Files
          and upload from a computer. If the point was “send this to a person,” JPG is often the less surprising
          attachment — set output to JPG on the converter instead of fighting the recipient’s client.
        </p>
        <h2>Memory</h2>
        <p>
          Safari will kill the tab if you decode four 48 MP images at full resolution. Convert fewer files, or set max
          width to 1280. The 25 MB warning and 80 MB hard stop exist so the page fails with a sentence instead of a
          white screen. This is not a daily quota.
        </p>
        <p>
          Older iPhones with 3 GB of RAM are the reason encoding is sequential. Do not background Safari mid-convert
          and expect a worker to finish. If iOS dumped the tab, reopen Shift and convert again — there is no cloud job.
        </p>
        <h2>Orientation, screenshots, and AVIF on iOS</h2>
        <p>
          EXIF orientation is applied when the browser supports it, so a portrait shot should not land on its side.
          Screenshots are PNG; they can go to WebP, but thin type will soften. Keep PNG for UI captures you still need
          to read. AVIF encode on iOS is the flaky path Shift was built to tell the truth about. Displaying AVIF in
          Safari is not the same as writing one. Trust the badge.
        </p>
        <p>
          Desktop walkthrough: <Link to="/guide">guide</Link>. Codec choice:{" "}
          <Link to="/webp-vs-avif">WebP vs AVIF</Link>. The usual laptop job:{" "}
          <Link to="/jpg-to-webp">JPG to WebP</Link>.
        </p>
        <ConvertCta label="Open converter on this iPhone" />
      </Prose>
    </AppShell>
  );
}
