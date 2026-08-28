export const FAQ = [
  {
    q: "Does Shift upload my images to convert them?",
    a: "No. Shift never posts your files to a conversion server. JPG, PNG and WebP encode with this tab’s Canvas (createImageBitmap + toBlob). AVIF encode uses a local WebAssembly codec (jSquash / libavif) loaded as a static asset from this site — not a third-party API. You can go offline after the page and WASM have loaded and still convert.",
  },
  {
    q: "When should I pick WebP instead of AVIF?",
    a: "Pick WebP when you need the file to open everywhere: iMessage, older Android, many CMS uploaders, and almost every current browser. WebP is Shift’s default because encode support is nearly universal on phones and laptops from the last several years. Use AVIF when the destination already accepts it (modern Chrome, Edge, Firefox, recent Safari) and you want a smaller still image at a similar visual quality.",
  },
  {
    q: "Why is AVIF sometimes disabled on my phone?",
    a: "Native canvas.toBlob('image/avif') is missing or lies on a lot of mobile browsers — it may return a blob that is not actually AVIF. Shift probes twice: a native 1×1 encode checked with AVIF magic bytes (ftyp/avif), then a WASM encoder. If both fail or time out, the AVIF button is disabled and the badge says no. That is not a paywall. Convert to WebP instead.",
  },
  {
    q: "Can I convert WebP or AVIF back to JPG or PNG?",
    a: "Yes. Drop a .webp or .avif file and set output to JPG or PNG. Decode uses the browser first. If native AVIF decode fails, Shift falls back to the same local WASM decoder. JPG output fills a white background so transparent pixels do not become black.",
  },
  {
    q: "Will converting to WebP or AVIF ruin photo quality?",
    a: "Lossy WebP, AVIF and JPG use the quality slider (default 85%). At 85% most camera JPEGs look intact while shrinking a lot. Drop to 70% for thumbnails and social crops. PNG output is lossless and ignores the slider — use it when you need crisp UI, screenshots or graphics with text. You can also cap max width or height so a 4000-px export is not re-encoded at full resolution.",
  },
  {
    q: "Is the batch ZIP still private?",
    a: "Yes. After Convert, Download ZIP builds an archive in this tab with JSZip. The zip never goes to Shift’s servers. Filenames look like photo-shift.webp. If two files share a stem, names are kept unique inside the archive.",
  },
  {
    q: "Do I need an account? Is there a watermark or daily limit?",
    a: "No account, no watermark, no quota. The only cap is this device’s memory. Files over about 25 MB get a warning; files over 80 MB are refused so the tab does not crash. That is a safety guard, not a plan upgrade.",
  },
  {
    q: "Can Shift convert HEIC from iPhone?",
    a: "No. HEIC / HEIF is a different job. Shift looks at the file header (ftyp brands) and will tell you to use HEIC Local first. After you have a JPG or PNG, bring it back here for WebP or AVIF.",
  },
  {
    q: "Does it work on iPhone Safari?",
    a: "Yes. Use Choose files (drag-and-drop is unreliable on iOS). EXIF orientation is applied when the browser supports it. Download uses a file Share sheet when iOS allows sharing files; otherwise a normal download link. Large Camera Roll exports may need a max width of 1920 or 1280 if the phone runs out of memory.",
  },
  {
    q: "What formats can I drop in?",
    a: "JPG / JPEG, PNG, WebP, AVIF, BMP and static GIF. Files are checked by type and by magic bytes, not only the extension. A renamed .txt will be rejected. Animated GIF/WebP/AVIF is not a v1 pipeline — you get a still frame if the browser hands one over.",
  },
  {
    q: "Is Shift the same as Crush, the image compressor?",
    a: "No. Crush’s job is smaller files. Shift’s job is changing codec: get a WebP or AVIF, or open a WebP/AVIF as JPG/PNG. You can set quality here, but the product is format convert, not a compression-first UI.",
  },
  {
    q: "Does Google AdSense see my photos?",
    a: "No. Ads, when they are live, are independent of the converter. Image bytes stay in memory in this tab. Hosting logs (Vercel) may record that someone requested a page, not the contents of a dropped photo.",
  },
  {
    q: "How does the quality slider map to AVIF?",
    a: "The slider is 0.1–1.0. For AVIF, Shift maps that onto the encoder’s quality scale (about 10–100). Default 0.85 is a practical still-photo setting. PNG ignores it. If AVIF encode is off, the slider still applies to WebP and JPG.",
  },
  {
    q: "Who runs Shift and how do I contact you?",
    a: "Shift is a free tool from Ultimatum. Email ultaultimatum@gmail.com (also on the Contact page). Do not email photos you do not want stored in a mailbox — the converter itself does not need email.",
  },
] as const;
