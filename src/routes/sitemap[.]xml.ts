import { createFileRoute } from "@tanstack/react-router";
import { CONTENT_LASTMOD, SITE_ORIGIN } from "@/lib/site";

const URLS: { path: string; changefreq: string; priority: string }[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/guide", changefreq: "weekly", priority: "0.9" },
  { path: "/webp-vs-avif", changefreq: "weekly", priority: "0.9" },
  { path: "/compare", changefreq: "weekly", priority: "0.9" },
  { path: "/jpg-to-webp", changefreq: "weekly", priority: "0.8" },
  { path: "/avif-to-jpg", changefreq: "weekly", priority: "0.8" },
  { path: "/iphone", changefreq: "weekly", priority: "0.8" },
  { path: "/whatsapp", changefreq: "weekly", priority: "0.8" },
  { path: "/email", changefreq: "weekly", priority: "0.8" },
  { path: "/android", changefreq: "weekly", priority: "0.8" },
  { path: "/faq", changefreq: "weekly", priority: "0.9" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/about", changefreq: "monthly", priority: "0.4" },
  { path: "/privacy", changefreq: "monthly", priority: "0.3" },
  { path: "/terms", changefreq: "monthly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${URLS.map(
  (item) => `  <url>
    <loc>${SITE_ORIGIN}${item.path === "/" ? "/" : item.path}</loc>
    <lastmod>${CONTENT_LASTMOD}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`,
).join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
