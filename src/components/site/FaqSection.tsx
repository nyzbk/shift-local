import { FAQ } from "@/content/faq";

export function FaqSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-4">
      <h2 className="font-display text-2xl">FAQ</h2>
      <div className="mt-6 divide-y divide-line border-y border-line">
        {FAQ.map((item) => (
          <details key={item.q} className="group py-4">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-medium">
              <span>{item.q}</span>
              <span className="text-muted transition-transform duration-150 group-open:rotate-45" aria-hidden>
                +
              </span>
            </summary>
            <p className="mt-2 text-pretty text-sm text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
