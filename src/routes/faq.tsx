import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { FaqSection } from "@/components/site/FaqSection";
import { ConvertCta, PageHero, Prose } from "@/components/site/Prose";
import { JsonLd } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "Shift FAQ — WebP, AVIF, privacy, iPhone, ZIP | Shift" },
      {
        name: "description",
        content:
          "Answers: no upload, WebP vs AVIF, disabled AVIF on phones, ZIP privacy, HEIC, iPhone Safari, quality slider, AdSense.",
      },
    ],
  }),
});

function FaqPage() {
  return (
    <AppShell>
      <JsonLd />
      <Prose>
        <PageHero
          kicker="FAQ"
          title="Questions about converting to WebP and AVIF in the browser"
          lead="Short answers for privacy, codecs, iPhone, and what Shift will not do. The converter is on the home page."
        />
      </Prose>
      <FaqSection />
      <div className="mx-auto max-w-2xl px-4 pb-12">
        <ConvertCta />
      </div>
    </AppShell>
  );
}
