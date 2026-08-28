import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { ConvertCta, PageHero, Prose } from "@/components/site/Prose";

export const Route = createFileRoute("/jpg-to-webp")({
  component: JpgToWebpPage,
  head: () => ({
    meta: [
      { title: "JPG to WebP converter in the browser — no upload | Shift" },
      {
        name: "description",
        content:
          "Convert JPG and JPEG to WebP on this device. Quality control, optional resize, batch ZIP. Files never leave the tab.",
      },
    ],
  }),
});

function JpgToWebpPage() {
  return (
    <AppShell>
      <Prose>
        <PageHero
          kicker="JPG → WebP"
          title="Convert JPG to WebP without a server"
          lead="The most common Shift job: a camera JPEG that is too heavy for a page, turned into WebP in this browser."
        />
        <h2>Why JPG to WebP</h2>
        <p>
          JPEG is what the camera (or “Export for web”) still emits. WebP is what the page should ship. A 3 MB JPEG
          hero often becomes a few hundred kilobytes of WebP at 85% with a 1920-px cap, and it still looks like the
          same photograph in a browser. That is not magic; it is a newer still-image codec plus you not sending a
          48-megapixel original to every mobile visitor.
        </p>
        <p>
          WordPress, Shopify, many static-site generators, and almost every current browser will take a{" "}
          <code>.webp</code>. Slack and some email clients are pickier — if the recipient must open the file in a
          random app, keep a JPEG too. Shift’s job on this page is the codec hop, in the tab, without an account.
        </p>
        <h2>How to do it in Shift</h2>
        <p>
          Open the converter, leave output on WebP, leave quality at 85% unless you have a reason. Set max width to
          1920 for articles, 1280 for cards, empty if you truly need the original pixel grid. Choose the JPEG (or a
          handful). Convert. Check the size delta on the result row. Download. If you have a folder of product shots,
          convert them together and use Download ZIP — still local, still no account.
        </p>
        <p>
          On iPhone, use Choose files. If the original is HEIC, Shift will refuse it. Convert HEIC to JPG first, then
          come back here. Camera set to Most Compatible already writes JPEG, so you can skip that hop. More on the{" "}
          <Link to="/iphone">iPhone page</Link>.
        </p>
        <h2>Settings that usually work</h2>
        <ul>
          <li>Blog or docs hero: WebP 85%, max width 1920.</li>
          <li>Product card / collection: WebP 75–80%, max width 800–1280.</li>
          <li>Open Graph image: WebP 70–75%, max width 1200. (Some networks still prefer JPG; keep both if unsure.)</li>
          <li>Thumbnail: WebP 70%, max width 400–640.</li>
          <li>Archive a high-res WebP next to the RAW/JPEG: quality 95%, no max width, desktop only.</li>
        </ul>
        <p>
          Quality is the Canvas encoder’s 0–1 scale, shown as 10–100% in the UI, default 85%. It is not ImageMagick’s
          <code>-quality</code> number, even though the range looks similar. If you are matching a design system that
          already picked 80, start at 80 and look at a crop — do not assume bit-identical output with a CLI.
        </p>
        <h2>When the WebP comes out larger</h2>
        <p>
          Already-small JPEGs, heavy chroma subsampling, or quality 95% on a graphic can make WebP bigger. Lower
          quality, cap width, or switch to PNG if it is a screenshot with type. Shift will not invent a smaller file
          if the source has nothing left to give.
        </p>
        <p>
          Another case: you converted a progressive JPEG that was already saved at quality 60. Re-encoding at 85% WebP
          can look better and still be larger, or look worse and be smaller. The result row is the scoreboard. If both
          size and look are worse, keep the JPEG.
        </p>
        <h2>PNG to WebP</h2>
        <p>
          Same path. PNG with a huge canvas (UI dumps, screenshots) benefits even more from a max width. Lossy WebP
          will soften thin type; if the PNG is a logo, keep PNG or use a high quality. Transparency: WebP keeps alpha;
          JPG does not — if you pick JPG, Shift paints white first.
        </p>
        <p>
          Photographs that happen to be PNG (exports from some editors) should still go to WebP at 85%, not stay PNG.
          PNG is the wrong container for camera grain. The converter will not scold you; the file size will.
        </p>
        <h2>Batch of product shots</h2>
        <p>
          Drop the folder’s worth of JPEGs. Keep one output codec for the batch — mixed WebP/AVIF in one ZIP is how
          people lose track. Convert. Download ZIP. Names look like <code>sku-red-shift.webp</code>. Two files with the
          same stem get unique entries. Do not convert 200 full-resolution studio files on a phone; use a laptop or set
          max width 1920 first.
        </p>
        <p>
          Full walkthrough: <Link to="/guide">conversion guide</Link>. If you actually wanted AVIF, read{" "}
          <Link to="/webp-vs-avif">WebP vs AVIF</Link> and check the AVIF badge first. Reverse:{" "}
          <Link to="/avif-to-jpg">AVIF or WebP to JPG</Link>.
        </p>
        <ConvertCta label="Convert JPG to WebP" />
      </Prose>
    </AppShell>
  );
}
