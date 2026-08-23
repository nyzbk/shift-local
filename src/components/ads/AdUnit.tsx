const LIVE = import.meta.env.VITE_ADSENSE_LIVE === "true";

type Slot = "after-success" | "mid" | "footer";

export function AdUnit({ slot }: { slot: Slot }) {
  if (!LIVE) {
    return (
      <aside
        aria-label="Advertisement placeholder"
        data-ad-slot={slot}
        className="my-6 flex min-h-24 items-center justify-center rounded-xl border border-dashed border-line bg-paper/60 px-4 py-6 text-center text-xs tracking-wide text-muted uppercase"
      >
        Ad · {slot.replace("-", " ")}
      </aside>
    );
  }

  return (
    <aside className="my-6 flex justify-center" aria-label="Advertisement" data-ad-slot={slot}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7636435144500691"
        data-ad-slot=""
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
