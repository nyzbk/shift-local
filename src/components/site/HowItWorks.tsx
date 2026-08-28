import { Link } from "@tanstack/react-router";

const STEPS = [
  {
    title: "Choose files on this device",
    body: "Use Choose files or drop images into the dashed area. Shift accepts JPG, PNG, WebP, AVIF, BMP and still GIF. Nothing is uploaded: the browser keeps a File handle in this tab. A HEIC from Camera Roll is rejected on purpose — convert that in HEIC Local, then come back. Large files get a memory warning before they lock the phone.",
  },
  {
    title: "Pick a codec, not a cloud preset",
    body: "WebP is the default because encode works on essentially every modern browser. AVIF is offered only after a capability probe (native Canvas is not trusted; a WASM encoder is tried next). JPG and PNG are the reverse path: open a WebP or AVIF as something a CMS or email client will take. Optional max width and height keep aspect ratio.",
  },
  {
    title: "Convert in the tab",
    body: "Convert runs createImageBitmap, draws to a canvas, then toBlob for WebP/JPG/PNG. AVIF goes through the local encoder when the badge says yes. Progress is per file. If one image fails, the rest still finish. There is no queue on a server and no email when it is done.",
  },
  {
    title: "Download one file or a ZIP",
    body: "Each result is named with a -shift suffix and the real extension. Two or more files can pack into a ZIP built here with JSZip. iPhone users get a Share sheet when the browser allows file sharing. No watermark is burned in. Clear the list and start over without reloading.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h2 className="font-display text-2xl">How Shift converts images in the browser</h2>
      <p className="mt-3 text-pretty text-muted">
        Four steps, all on-device. For the long version see the{" "}
        <Link to="/guide" className="text-copper-deep underline underline-offset-4">
          conversion guide
        </Link>{" "}
        and{" "}
        <Link to="/webp-vs-avif" className="text-copper-deep underline underline-offset-4">
          WebP vs AVIF
        </Link>
        .
      </p>
      <ol className="mt-6 space-y-6">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-sm font-semibold">
              {i + 1}
            </span>
            <div>
              <h3 className="font-display text-lg">{step.title}</h3>
              <p className="mt-1 text-sm text-pretty text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
