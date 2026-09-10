import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { CompareApp } from "@/components/shift/CompareApp";
import { ConvertCta, PageHero, Prose } from "@/components/site/Prose";

export const Route = createFileRoute("/compare")({
  component: ComparePage,
  head: () => ({
    meta: [
      { title: "Weigh WebP and AVIF on this photo — Shift" },
      {
        name: "description",
        content:
          "Drop one photo. Shift encodes WebP and AVIF at the same quality and max width, then shows the byte table. If AVIF probe fails, WebP vs JPG — no fake .avif.",
      },
    ],
  }),
});

function ComparePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 pt-10">
        <PageHero
          kicker="Compare"
          title="Weigh WebP and AVIF on this photo"
          lead="One file, two encodes, same quality and max width. If this device cannot write AVIF, the second column is JPG. Shift will not mint a fake .avif."
        />
      </div>
      <div className="mx-auto max-w-3xl px-4 pb-4">
        <CompareApp />
      </div>
      <Prose>
        <h2>Why this is not the lecture page</h2>
        <p>
          <Link to="/webp-vs-avif">WebP vs AVIF</Link> is the theory: support, size, the probe, when to ship a{" "}
          <code>picture</code> tag. This URL is the scale. You drop the photo you actually have. Shift runs{" "}
          <code>convertImage</code> twice with the same quality and optional max width, then puts the bytes in a table.
          A 24-megapixel JPEG that “should” prefer AVIF sometimes does not, at 85%, on this device. Believe the table.
        </p>
        <h2>What happens when AVIF encode is no</h2>
        <p>
          The homepage disables the AVIF button. Compare does not invent a third codec and does not rename a JPEG.
          The pair becomes WebP versus JPG so you still see two real files. That is the honest fallback, not a
          paywall. Batch convert of one codec still lives on the <Link to="/">converter</Link>.
        </p>
        <h2>What this page will not do</h2>
        <p>
          It will not hang a second converter on <Link to="/jpg-to-webp">JPG to WebP</Link> — that URL is an article.
          It will not add SVG or ICO tools. It will not decode HEIC. It will not target a byte budget (that is a
          different product). It does not upload the photo.
        </p>
        <ConvertCta label="Open the single-codec converter" />
      </Prose>
    </AppShell>
  );
}
