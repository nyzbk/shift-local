import { FAQ } from "@/content/faq";

export function JsonLd() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Shift",
    url: "https://shift-local.vercel.app",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires HTML5 Canvas and a modern browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Convert JPG, PNG, WebP and AVIF in the browser. Batch, quality control, ZIP download. No upload, no signup, no watermark.",
    featureList: [
      "JPG and PNG to WebP",
      "AVIF encode when the browser can do it honestly",
      "WebP or AVIF back to JPG or PNG",
      "Batch ZIP in the tab",
      "No server upload",
    ],
  };
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ultimatum",
    url: "https://shift-local.vercel.app/about",
    email: "ultaultimatum@gmail.com",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
    </>
  );
}

export function GuideJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Convert JPG or PNG to WebP or AVIF in the browser",
    description: "Use Shift to convert images to WebP or AVIF without uploading files.",
    totalTime: "PT2M",
    step: [
      { "@type": "HowToStep", name: "Choose files", text: "Select JPG, PNG, WebP or AVIF on this device." },
      { "@type": "HowToStep", name: "Pick output", text: "Choose WebP, AVIF, JPG or PNG and set quality." },
      { "@type": "HowToStep", name: "Convert", text: "Tap Convert. Encoding runs in the tab." },
      { "@type": "HowToStep", name: "Download", text: "Save one file or a ZIP. No watermark." },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
