import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { ConverterApp } from "@/components/shift/ConverterApp";
import { HowItWorks } from "@/components/site/HowItWorks";
import { FaqSection } from "@/components/site/FaqSection";
import { SoftAgencyCta } from "@/components/ads/SoftAgencyCta";
import { AdUnit } from "@/components/ads/AdUnit";
import { JsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <AppShell>
      <JsonLd />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">Private · in your browser</p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
          Convert to WebP or AVIF — free, private, no upload
        </h1>
        <p className="mt-4 text-pretty text-muted">
          Shift is a WebP and AVIF converter that runs entirely in this tab. Drop JPG, PNG, WebP or AVIF, pick an
          output codec, set quality, optionally cap width or height, then download a file or a ZIP. Photos are not
          posted to a conversion API. There is no account and no watermark.
        </p>
        <p className="mt-3 text-pretty text-muted">
          Most “free converters” take your camera roll, store it, and re-encode on a machine you do not control. Shift
          does the opposite: Canvas for WebP, JPG and PNG; a local AVIF encoder only after a real capability probe —
          because native <code className="text-ink">toBlob('image/avif')</code> on many phones returns a lie.
          If this device cannot encode AVIF, the control is disabled and WebP still works.
        </p>
        <div className="mt-8">
          <ConverterApp />
        </div>
      </main>
      <HowItWorks />
      <AdUnit slot="mid" />
      <article className="prose-shift mx-auto px-4 py-6">
        <h2>Why convert to WebP or AVIF at all</h2>
        <p>
          JPEG is still the default export from cameras and design tools, but it is a 1990s still-image codec. A
          12-megapixel phone JPEG is often two to four megabytes before anyone has edited it. WebP (lossy or lossless)
          and AVIF (AV1 stills) typically land smaller at a similar viewing distance — which is why CDNs, documentation
          sites, and app stores keep asking for them. The catch is the encoder. Online tools that “convert to WebP”
          usually mean: upload, transcode with ImageMagick or libvips, email you a link. That is a privacy problem for
          passports, kids, interiors, and work screenshots, and it is a reliability problem when the queue is busy.
        </p>
        <p>
          Shift’s product job is the codec change, not a generic “compress my vacation.”{" "}
          <a href="https://crush-local.vercel.app">Crush</a> exists for size-first JPG/PNG/WebP. Here the default call
          to action is Convert, the default output is WebP, and AVIF is honest about device support. If you only needed
          a smaller JPEG, you are in the wrong tool — and the UI will not pretend otherwise.
        </p>
        <h2>What happens to a file inside this tab</h2>
        <p>
          After you choose files, Shift checks size and magic bytes (JPEG SOI, PNG signature, RIFF/WEBP, AVIF{" "}
          <code>ftyp</code> brands). HEIC is refused with a pointer to HEIC Local. Each image is decoded with{" "}
          <code>createImageBitmap</code> (orientation when the browser supports it). A canvas is sized to the optional
          max width/height, the bitmap is drawn, then encoded. WebP/JPG/PNG use <code>canvas.toBlob</code>. AVIF uses
          a single-thread WASM encoder so it does not hang waiting for cross-origin isolation. Object URLs are revoked
          after download. Close the tab and the pixels are gone.
        </p>
        <p>
          Quality is a slider from 10% to 100%, default 85%. PNG ignores it (lossless). AVIF quality is mapped onto the
          encoder’s 10–100 scale. Batch mode processes files one after another so a cheap phone is less likely to OOM
          than a worker pool would. The ZIP path is JSZip in-process — the same family pattern as Crush and Folio, with
          Shift filenames.
        </p>
        <h2>When WebP is the right output</h2>
        <p>
          Use WebP when the consumer might be an iPhone, a WordPress media library, a Slack upload, or an older Android
          WebView. Browser encode support is the reason Shift defaults here. A typical 24-megapixel JPEG from an iPhone
          export, converted at 85% with a max width of 1920, is usually a few hundred kilobytes of WebP that still looks
          like a photograph. Read the dedicated{" "}
          <Link to="/jpg-to-webp" className="text-copper-deep underline underline-offset-4">
            JPG to WebP
          </Link>{" "}
          page if that is your only job today.
        </p>
        <h2>When AVIF is worth it — and when it is not</h2>
        <p>
          AVIF often beats WebP on still photos at the same visual quality, especially large hero images. It is also
          the codec that breaks silently: a phone may report{" "}
          <code>image/avif</code> and hand you a JPEG-in-disguise. Shift’s badge (“AVIF encode: yes/no”) is the product
          surface for that. If the badge is no, do not hunt for a hidden toggle. Convert to WebP, or open the{" "}
          <Link to="/webp-vs-avif" className="text-copper-deep underline underline-offset-4">
            WebP vs AVIF
          </Link>{" "}
          comparison. Going the other way — AVIF you received from a designer, back to JPG for email — is covered on{" "}
          <Link to="/avif-to-jpg" className="text-copper-deep underline underline-offset-4">
            AVIF to JPG
          </Link>
          .
        </p>
        <h2>Batch ZIP, memory, and why a file can get bigger</h2>
        <p>
          Two or more successful converts unlock Download ZIP. The archive is assembled in this tab; it is not a
          mailbox attachment we generate for you. Filenames pick up a <code>-shift</code> suffix and the real
          extension, so you can tell the original JPEG from the WebP sitting next to it. If two inputs share a stem,
          Shift keeps the ZIP entries unique instead of overwriting.
        </p>
        <p>
          Memory is the only quota. Files over about 25 MB get a warning. Files over 80 MB are refused so Safari does
          not kill the tab. Four 48-megapixel exports at full resolution will also fail on a tired phone even if each
          file is under the byte cap — that is why max width exists. 1920 px is the web-hero default; 1280 is enough
          for cards and blog inline images. Empty max fields keep the pixel grid, which is rarely what you want.
        </p>
        <p>
          Sometimes the WebP or AVIF is larger than the JPEG you started with. That happens with already-small
          screenshots, heavy chroma-subsampled JPEGs, or quality 95% on a graphic. Lower quality, cap width, or switch
          to PNG for UI with type. Shift reports original size → new size on the result row so you can decide without
          guessing from the filename.
        </p>
        <h2>iPhone, batch, and what this site is not</h2>
        <p>
          iOS Safari is a first-class path: file picker, Share-sheet download, orientation, memory copy. Details live
          on{" "}
          <Link to="/iphone" className="text-copper-deep underline underline-offset-4">
            iPhone photos
          </Link>
          . Batch ZIP is for a folder of product shots, not a 200-file dump on a 3 GB phone — use max width. Shift does
          not strip GPS (that is Strip), does not merge PDFs (Folio), does not remove backgrounds, and does not add
          watermarks. HEIC is refused on purpose after reading the <code>ftyp</code> brand. Animated WebP/AVIF is not a
          v1 pipeline — you get a still frame if the browser hands one over.
        </p>
        <h2>What Shift will refuse</h2>
        <p>
          Empty files, renamed text, PDFs, videos, and HEIC/HEIF. Magic bytes are checked, not only the extension, so
          <code>.jpg</code> that is actually a ZIP is rejected with a sentence instead of a blank canvas. If decode
          fails after the header looked fine, the row shows an error and the rest of the batch continues. There is no
          server-side job to resume after a crash: reload and convert again.
        </p>
        <p>
          Legal pages:{" "}
          <Link to="/privacy" className="text-copper-deep underline underline-offset-4">
            Privacy
          </Link>
          ,{" "}
          <Link to="/terms" className="text-copper-deep underline underline-offset-4">
            Terms
          </Link>
          ,{" "}
          <Link to="/about" className="text-copper-deep underline underline-offset-4">
            About
          </Link>
          ,{" "}
          <Link to="/contact" className="text-copper-deep underline underline-offset-4">
            Contact
          </Link>
          . Step-by-step encoding is on the{" "}
          <Link to="/guide" className="text-copper-deep underline underline-offset-4">
            conversion guide
          </Link>
          .
        </p>
      </article>
      <FaqSection />
      <SoftAgencyCta />
    </AppShell>
  );
}
