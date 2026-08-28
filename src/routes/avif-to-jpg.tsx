import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { ConvertCta, PageHero, Prose } from "@/components/site/Prose";

export const Route = createFileRoute("/avif-to-jpg")({
  component: AvifToJpgPage,
  head: () => ({
    meta: [
      { title: "AVIF to JPG converter — open AVIF as JPEG in the browser | Shift" },
      {
        name: "description",
        content:
          "Convert AVIF back to JPG or PNG without uploading. Native decode first, WASM fallback if this browser cannot open the AVIF.",
      },
    ],
  }),
});

function AvifToJpgPage() {
  return (
    <AppShell>
      <Prose>
        <PageHero
          kicker="AVIF → JPG"
          title="Open an AVIF as JPG or PNG"
          lead="Designers and CDNs ship AVIF. Email clients, printers, and old CMS fields still want JPEG. Shift does that conversion in the tab."
        />
        <h2>Why this page exists</h2>
        <p>
          AVIF is efficient and still awkward. You receive a <code>.avif</code> from a developer, double-click it, and
          Preview or an email compose window shrugs. Converting “in the cloud” means giving someone else a photo that
          was already compressed once. Shift decodes here: browser <code>createImageBitmap</code> first, then a local
          WASM decoder if native decode fails, then Canvas encode to JPG or PNG.
        </p>
        <p>
          This is the opposite of the default Shift job. Most visitors convert JPEG to WebP. This URL is for the
          inbound file that is already modern and needs to go backwards — a printer, a lawyer’s portal that only
          accepts JPEG, a CMS media library from 2014, or a teammate on an older iPhone Mail.app.
        </p>
        <h2>Steps</h2>
        <p>
          Drop the AVIF. Set output to JPG for photographs you will attach; PNG if you must keep sharp edges or you
          suspect transparency. Quality 90–95 for JPG if this is the last generation before print or a client review.
          Convert. Download. If decode fails, the row shows a clear error — this browser could not open that AVIF.
          Trying Chrome or Edge on desktop is the usual fix; Shift will not invent pixels it cannot decode.
        </p>
        <p>
          If native decode fails, Shift loads the same local WASM codec used for encode and tries again. That decoder
          is a static asset from this origin, not a conversion API. If both fail, the file may be truncated, not
          actually AVIF, or an animated/HDR variant this build does not handle. Open it in a desktop browser before
          assuming Shift is broken.
        </p>
        <h2>WebP to JPG is the same control</h2>
        <p>
          Output JPG or PNG also works on <code>.webp</code>. That is the compatibility escape hatch when a partner
          cannot take modern codecs. It is not a compressor. If the WebP is already 80 KB, the JPEG may be larger.
          That is expected. A lossy WebP decoded and re-encoded as JPEG is a generation of loss — raise JPG quality
          (90–95) so you are not stacking artefacts for no reason.
        </p>
        <h2>Color and transparency</h2>
        <p>
          JPG has no alpha. Shift fills the canvas with white before drawing so transparent AVIF/WebP/PNG does not
          become a black hole. If you needed the hole, pick PNG. Wide-gamut / HDR AVIF is not a promised pipeline in
          v1 — you get what this browser’s decoder hands the canvas.
        </p>
        <p>
          Soft proofing, CMYK, and ICC preservation are out of scope. The canvas is the color pipeline. If a print shop
          sent a spec for ISO coated, they do not want a browser convert. They want a TIFF from the original. Use Shift
          when the destination is “please just send a JPEG.”
        </p>
        <h2>How to tell the inbound file is actually AVIF</h2>
        <p>
          Real AVIF starts with an ISO-BMFF box: <code>ftyp</code> and a brand that includes <code>avif</code> or{" "}
          <code>avis</code>. JPEG starts with <code>FF D8</code>. WebP starts with <code>RIFF</code> then{" "}
          <code>WEBP</code>. If someone emailed you “hero.avif” and Shift says it is not a supported image, look at the
          header before filing a bug. Shift already does that check; a renamed JPEG will be treated as JPEG if the
          bytes say so, or rejected if the extension and bytes disagree badly.
        </p>
        <h2>When not to go back to JPG</h2>
        <p>
          If the destination is a modern website you control, keep the AVIF and add a WebP fallback — do not flatten
          to JPEG just because email can. If the destination is this site’s converter default, you probably wanted{" "}
          <Link to="/jpg-to-webp">JPG to WebP</Link> instead. If you needed metadata stripped, that is Strip, and
          converting codecs is the wrong tool.
        </p>
        <p>
          Encoding the other direction: <Link to="/jpg-to-webp">JPG to WebP</Link> and the{" "}
          <Link to="/guide">guide</Link>. Codec choice: <Link to="/webp-vs-avif">WebP vs AVIF</Link>.
        </p>
        <ConvertCta label="Convert AVIF to JPG" />
      </Prose>
    </AppShell>
  );
}
