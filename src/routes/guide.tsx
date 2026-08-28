import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { ConvertCta, PageHero, Prose } from "@/components/site/Prose";
import { GuideJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/guide")({
  component: GuidePage,
  head: () => ({
    meta: [
      { title: "How to convert JPG to WebP or AVIF in your browser | Shift" },
      {
        name: "description",
        content:
          "Step-by-step: convert JPG and PNG to WebP or AVIF without uploading. Quality slider, max size, batch ZIP, iPhone Safari notes.",
      },
    ],
  }),
});

function GuidePage() {
  return (
    <AppShell>
      <Prose>
        <GuideJsonLd />
        <PageHero
          kicker="Guide"
          title="How to convert images to WebP or AVIF without uploading"
          lead="A practical walkthrough of Shift: files, codec choice, quality, AVIF honesty, ZIP, and iPhone quirks. The converter itself stays on the home page."
        />
        <h2>1. Put the photos on the device you will convert on</h2>
        <p>
          Shift never sends the file to a backend, so the bytes have to exist in this browser. On a laptop, drag from a
          folder. On iPhone, tap Choose files and pick from Files or Camera Roll. Do not email yourself a HEIC and
          expect this page to open it — HEIC is out of scope; convert that with HEIC Local to JPG first. A 40 MB
          panorama may warn about memory. That warning is the device talking, not an upsell.
        </p>
        <p>
          If the photos live on a camera card, copy them to the computer first. Network drives and iCloud placeholders
          that have not finished downloading will fail as empty or truncated files. Shift reads the first 64 bytes for
          magic: JPEG <code>FF D8</code>, PNG signature, RIFF/WEBP, BMP <code>BM</code>, GIF, or an AVIF{" "}
          <code>ftyp</code> brand. A PDF renamed to <code>.jpg</code> is rejected here, not “converted.”
        </p>
        <h2>2. Read the capability badges before you pick AVIF</h2>
        <p>
          Two badges sit above the dropzone: WebP encode and AVIF encode. WebP should say yes on any current Chrome,
          Safari, Firefox or Edge. AVIF is the unreliable one. Shift probes native Canvas, then a WASM encoder. If the
          AVIF badge is no, pick WebP. Forcing AVIF on a phone that cannot encode it is how other tools produce files
          that say <code>.avif</code> and are not AVIF. The{" "}
          <Link to="/webp-vs-avif">WebP vs AVIF</Link> page explains the trade-off in more depth.
        </p>
        <p>
          The probe is a 1×1 encode whose bytes are checked for real AVIF brands, not a feature-detect string. Native{" "}
          <code>toBlob('image/avif')</code> on several mobile browsers returns an empty blob, a JPEG, or a WebP with
          the wrong type. Shift treats that as a fail and tries jSquash (libavif compiled to WASM, single-thread). If
          WASM is blocked or times out, the AVIF button is disabled. That is the product. It is not a paywall.
        </p>
        <h2>3. Choose output, quality, and optional max width</h2>
        <p>
          Output is global for the batch: WebP, AVIF, JPG or PNG. Quality defaults to 85%. That is a still-photo
          setting, not a thumbnail setting. Drop to 70% for Open Graph images and product-grid thumbs. Raise to 95%
          only if you are printing or archiving a lossless-looking WebP and can afford the size. PNG ignores quality.
          Max width 1920 is a sane cap for web heroes; 1280 is enough for blog inline images. Height is optional and
          keeps aspect ratio. Both fields empty means “keep the pixel grid,” which is rarely what you want for a
          48-megapixel export.
        </p>
        <p>
          Quality on AVIF is mapped from the 0.1–1.0 slider onto the encoder’s 10–100 scale. Do not compare a 70% WebP
          to a 70% JPEG by filename alone — look at a 100% crop of skin, type, or a logo edge. If the destination is
          email or a printer, output JPG at 90–95 instead of fighting AVIF support.
        </p>
        <h2>4. Convert, then actually look at the result</h2>
        <p>
          Tap Convert. Progress is per file. A failure on one image (corrupt JPEG, empty file, HEIC) does not abort the
          others. The result row shows original size → new size, dimensions, and a download button. If the WebP is{" "}
          <em>larger</em> than the JPEG, you probably converted an already-small screenshot at 95% — drop quality or
          use PNG. If AVIF is tiny but looks smeared on skin, raise quality or stay on WebP.
        </p>
        <p>
          Encoding is sequential on purpose. A worker pool would finish a 12-file batch faster on a desktop and freeze
          a 3 GB Android phone. One image at a time is the conservative path. Orientation is applied when{" "}
          <code>createImageBitmap</code> supports it, so a phone JPEG shot in portrait should not land on its side.
        </p>
        <h2>5. Download one file or a ZIP</h2>
        <p>
          Individual download uses a blob URL. On iPhone, if the browser can share files, you get a Share sheet (Save
          to Files, AirDrop). Desktop browsers get a normal download named like <code>street-shift.webp</code>. Two or
          more successes unlock Download ZIP. The archive is built in the tab. Nothing is stored against your email
          because there is no email in the converter.
        </p>
        <p>
          Blob URLs are revoked after the download starts so the tab does not leak object URLs for every convert you
          ran this session. If you cancel the iOS Share sheet, nothing was uploaded — there is no server waiting for
          the file. Allow a second before the URL is revoked if the sheet is slow to open.
        </p>
        <h2>6. Reverse path: WebP or AVIF back to JPG</h2>
        <p>
          Designers send AVIF; your printer wants JPEG. Set output to JPG, quality 90–95, convert. Transparency becomes
          white. If you need the alpha channel, use PNG. Native decode is tried first; if this browser cannot open the
          AVIF, Shift falls back to the same local WASM decoder. See{" "}
          <Link to="/avif-to-jpg">AVIF to JPG</Link> for that specific job.
        </p>
        <h2>7. If something fails</h2>
        <p>
          “Not a supported image” means magic bytes did not look like a raster Shift handles. “Too large for this
          device’s memory” means lower max width or convert fewer files. AVIF encode timed out means the WASM path did
          not finish — use WebP. A white or blank download is almost always a failed encode; Shift should have shown an
          error on the row. If the whole page crashed, reload: no server-side job exists to resume.
        </p>
        <p>
          If WebP encode itself fails, you are on a very old browser. Update Chrome, Safari, Firefox or Edge. Shift
          does not polyfill WebP encode. BMP and still GIF are accepted as input; they are not interesting outputs.
          Animated GIF/WebP/AVIF is not a v1 pipeline.
        </p>
        <h2>8. What not to use Shift for</h2>
        <p>
          Do not use it as a GPS stripper (Strip), a compressor-first tool (Crush), a HEIC pipeline (HEIC Local), or a
          PDF toolkit (Folio). Do not feed it copyrighted assets you are not allowed to process. Do not expect
          animated WebP/AVIF to survive as animation. Those are different products and different codecs.
        </p>
        <h2>9. Quality recipes for common jobs</h2>
        <ul>
          <li>Article hero, unknown browsers: WebP, 85%, max width 1920.</li>
          <li>Product grid or card: WebP, 75–80%, max width 1280.</li>
          <li>Open Graph / social crop: WebP, 70–75%, max width 1200.</li>
          <li>Your own site with a <code>picture</code> tag: AVIF at 80–85% plus a WebP fallback at the same size.</li>
          <li>Client review or print shop: JPG, 90–95%, no max width unless the file is huge.</li>
          <li>UI screenshot with type: PNG, or WebP at 90% if you accept a little softness.</li>
        </ul>
        <p>
          These are starting points, not laws. Convert twice when the picture matters. Look at the face, the sky, and
          a hard edge. Then pick. Dedicated notes for the most common direction live on{" "}
          <Link to="/jpg-to-webp">JPG to WebP</Link>.
        </p>
        <h2>10. How the encoder actually runs</h2>
        <p>
          Decode: <code>createImageBitmap</code> from the File. Optional downscale: the canvas is sized so the long
          edge respects max width or max height, aspect ratio kept. Draw. Encode: <code>canvas.toBlob</code> for WebP,
          JPG and PNG; jSquash for AVIF when the badge is yes. JPG output fills white first so transparent pixels do
          not become a black hole. PNG keeps alpha. WebP keeps alpha. There is no EXIF rewrite, no GPS strip, no color
          profile conversion beyond what the browser’s decoder already did.
        </p>
        <p>
          That last sentence is load-bearing. If you needed GPS gone, that is Strip. If you needed a smaller JPEG at
          all costs, that is Crush. Shift will change the codec and optionally the pixel grid. It will not pretend to
          be a DAM.
        </p>
        <h2>11. Checking the file is really WebP or AVIF</h2>
        <p>
          On a computer, the first bytes of a WebP are <code>RIFF....WEBP</code>. AVIF has an ISO-BMFF{" "}
          <code>ftyp</code> box with an <code>avif</code> or <code>avis</code> brand. If a site gave you an “AVIF”
          that starts with JPEG SOI (<code>FF D8</code>), they lied. Shift’s probe exists because that lie is common
          on phones. After you download, you can also drop the result back into Shift and convert the other way — if
          decode fails, the file was not a real AVIF.
        </p>
        <h2>12. iPhone, in one paragraph</h2>
        <p>
          Use Choose files, not drag-and-drop. HEIC is refused. If Camera is set to Most Compatible you already have
          JPEG. Cap max width on old phones. Download tries the Share sheet. Full notes:{" "}
          <Link to="/iphone">iPhone photos</Link>. Questions: <Link to="/faq">FAQ</Link>.
        </p>
        <ConvertCta label="Convert a file now" />
      </Prose>
    </AppShell>
  );
}
