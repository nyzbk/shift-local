import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { ConvertCta, PageHero, Prose } from "@/components/site/Prose";

export const Route = createFileRoute("/webp-vs-avif")({
  component: ComparePage,
  head: () => ({
    meta: [
      { title: "WebP vs AVIF — which should you convert to? | Shift" },
      {
        name: "description",
        content:
          "WebP vs AVIF for still photos: support, size, quality, and why Shift disables AVIF instead of faking encode on phones.",
      },
    ],
  }),
});

function ComparePage() {
  return (
    <AppShell>
      <Prose>
        <PageHero
          kicker="Compare"
          title="WebP vs AVIF for still images"
          lead="Both beat JPEG on size. They do not beat each other on support. Shift defaults to WebP and treats AVIF as optional, probed, and honest."
        />
        <h2>One-line difference</h2>
        <p>
          WebP is the compatibility codec. AVIF is the efficiency codec. If the file has to open in a random app next
          year, pick WebP. If you control the <code>picture</code> tag and the visitors are on current Chrome, Firefox,
          Edge or recent Safari, AVIF is often smaller at the same viewing quality.
        </p>
        <h2>Where each codec came from, in practice</h2>
        <p>
          WebP is a VP8 still (lossy) plus a lossless mode, shipped by Chrome for more than a decade and now decoded
          in Safari and Firefox too. Encode via Canvas is boring: it works. AVIF is AV1 in an ISO-BMFF still container.
          It is newer, usually denser on photographs, and much easier to get wrong at encode time. Shift exists in the
          gap between “the internet says convert to AVIF” and “this phone just wrote a JPEG named .avif.”
        </p>
        <h2>Support in the real world</h2>
        <p>
          WebP decode is everywhere that matters for a consumer site in 2026. Encode via Canvas is equally boring — it
          works. AVIF decode is good in current desktop browsers and improving on iOS, but encode is the gap Shift was
          built around. Many phones implement <code>canvas.toBlob('image/avif')</code> poorly: empty blobs,
          wrong types, or a JPEG with an AVIF mime. Shift does not trust that API. It checks magic bytes, then loads a
          WASM encoder, then disables the option if both paths fail. That is why you might see “AVIF encode: no” on a
          phone that can <em>display</em> AVIF just fine.
        </p>
        <p>
          Display support is not the same as encode support. A site can serve AVIF with a WebP fallback and never
          encode on the visitor’s device. Shift has to encode here, in this tab, so the badge is about this device, not
          about the public web. If you are building the site that will host the file, you can still pick AVIF on a
          desktop where the badge is yes, then keep a WebP sibling for older clients.
        </p>
        <h2>Size and quality</h2>
        <p>
          On photographs (skin, sky, foliage) AVIF usually wins the size contest at a matched quality. On screenshots,
          UI, and type, lossless PNG or lossless-ish WebP is often the right call — AVIF’s film-grain tricks do not help
          a 1-px rule. Shift’s quality slider is the same 10–100% control for WebP, AVIF and JPG so you can A/B the same
          source. Convert twice, download both, look at 100% crop on the face or the logo, then pick. Do not pick from
          the filename.
        </p>
        <p>
          A typical 24 MP iPhone JPEG at max width 1920 and quality 85% often lands as a few hundred kilobytes of WebP
          and a somewhat smaller AVIF. The delta is not always huge. If the AVIF is 10% smaller and the badge on your
          shipping device is flaky, ship WebP. If you run a documentation site with a <code>picture</code> element and
          a CDN cache, AVIF plus WebP is the grown-up setup.
        </p>
        <h2>Animation, HDR, and what Shift does not promise</h2>
        <p>
          Animated AVIF/WebP and HDR are out of v1. GIF input is a still frame if the browser gives one. Shift will not
          sell you “AVIF is always smaller.” A tiny JPEG of a solid color can lose to a verbose AVIF header. A
          screenshot of Slack at 85% WebP can look worse than PNG. The converter is a tool, not a religion.
        </p>
        <p>
          Wide-gamut and HDR AVIF decode to whatever this browser’s ImageBitmap hands the canvas — usually an sRGB-ish
          8-bit surface. Do not use Shift as a color-managed mastering tool. If you needed that, you already have
          libavif on a computer.
        </p>
        <h2>Practical recipe</h2>
        <ul>
          <li>Web delivery, unknown clients: WebP at 80–85%, max width 1920.</li>
          <li>Your own site with <code>picture</code>: AVIF + WebP fallback, same max width.</li>
          <li>Email, print shops, old CMS: JPG or PNG, not AVIF.</li>
          <li>iPhone share to someone who “just needs the photo”: JPG or WebP, not AVIF.</li>
          <li>Badge says AVIF encode: no — stop. Use WebP. Do not rename the file.</li>
        </ul>
        <h2>How Shift’s AVIF probe works, without marketing</h2>
        <p>
          Native path: draw 1×1, <code>toBlob('image/avif')</code>, inspect the first bytes for <code>ftyp</code> +
          avif/avis. Fail if the blob is empty, the type is wrong, or the bytes look like JPEG/WebP/PNG. WASM path:
          load the local jSquash encoder (static asset from this origin, not a third-party API), encode the same 1×1,
          inspect again. If both fail or the WASM path times out, disable AVIF for this session. SIMD is detected and
          used when present; it is not required. Cross-origin isolation is not required because the encoder is
          single-thread.
        </p>
        <p>
          That is why this page exists as its own URL: the decision is not “which codec is fashionable.” It is “which
          codec this device can actually write.” Step-by-step encoding is on the <Link to="/guide">guide</Link>. Reverse
          conversion is <Link to="/avif-to-jpg">AVIF to JPG</Link>. The converter is on the{" "}
          <Link to="/">home page</Link>.
        </p>
        <ConvertCta />
      </Prose>
    </AppShell>
  );
}
