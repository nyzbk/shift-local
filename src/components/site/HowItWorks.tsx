const STEPS = [
  "Drop or choose images. They stay in this tab.",
  "Pick WebP, AVIF, JPG or PNG. Set quality, optionally cap width or height.",
  "Tap Convert — the browser does the work. Nothing is uploaded.",
  "Download one file or a ZIP. No watermark, no account.",
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h2 className="font-display text-2xl">How it works</h2>
      <ol className="mt-6 space-y-4">
        {STEPS.map((step, i) => (
          <li key={step} className="flex gap-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-sm font-semibold">
              {i + 1}
            </span>
            <p className="pt-1 text-sm text-pretty">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
