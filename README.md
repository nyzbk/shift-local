# Shift — Free WebP & AVIF Converter

Convert JPG, PNG, WebP and AVIF **in the browser**. No upload. No signup. No watermark.

- **Live:** https://shift-local.vercel.app
- **Job:** format convert (WebP + AVIF). Not a compressor — that is [Crush](https://crush-local.vercel.app).
- **Engine:** Canvas for WebP / JPG / PNG. `@jsquash/avif` (libavif WASM, single-thread) for AVIF, with an honest capability probe. Native `toBlob('image/avif')` only if magic-bytes prove it is real AVIF.
- **Batch ZIP:** JSZip, in-tab.

## Stack

Vite · React 19 · TanStack Start · Tailwind · JSZip · jSquash AVIF

## Hard constraints

- Files never leave the tab
- No account, no watermark, no quota
- Ads only after-success / mid / footer (`VITE_ADSENSE_LIVE=false` until Site Ready)
- Isolation: this repo is Shift only (`nyzbk/shift-local`)
