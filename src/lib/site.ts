export const SITE_ORIGIN = "https://shift-local.vercel.app";
export const SITE_NAME = "Shift — Free WebP & AVIF Converter";
export const ADSENSE_CLIENT = "ca-pub-7636435144500691";
export const CONTACT_EMAIL = "ultaultimatum@gmail.com";
export const CONTENT_LASTMOD = "2026-09-12";
export const HUB_URL = "https://ultimatum-hub.vercel.app/";

export function absUrl(path: string): string {
  if (!path || path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
