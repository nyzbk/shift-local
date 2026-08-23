export const FAQ = [
  {
    q: "Does Shift upload my images?",
    a: "No. Conversion runs entirely in this tab (Canvas for WebP/JPG/PNG, and a local AVIF codec when the browser can load it). Files never go to a server. You can disconnect after the page loads and it still works.",
  },
  {
    q: "WebP vs AVIF — which should I pick?",
    a: "WebP has the widest support and is the default. AVIF often compresses further when this browser can encode it. If AVIF is disabled on your device, use WebP — that is the honest path, not a paywall.",
  },
  {
    q: "Why is AVIF disabled on my phone?",
    a: "AVIF encode support varies. Shift probes the device on load: native Canvas first is unreliable on many phones, so we load a WebAssembly AVIF encoder (jSquash / libavif) when WASM is available. If that probe fails, AVIF is disabled and WebP still works.",
  },
  {
    q: "Can I convert WebP or AVIF back to JPG?",
    a: "Yes. Drop WebP or AVIF files and set the output to JPG or PNG. Decode uses the browser first; AVIF falls back to the local codec if native decode fails.",
  },
  {
    q: "Is batch ZIP still private?",
    a: "Yes. The ZIP is built in the tab with JSZip. Nothing leaves the device.",
  },
  {
    q: "Do I need an account? Is there a watermark or daily limit?",
    a: "No signup, no watermark, no quota. The only limit is this device’s memory — a guard, not a paywall.",
  },
  {
    q: "Can I convert HEIC photos?",
    a: "Not in Shift. HEIC belongs to the sibling tool HEIC Local (heic-local.vercel.app). Shift is for WebP and AVIF.",
  },
  {
    q: "Does it work on iPhone?",
    a: "Yes. Built for iOS Safari: file picker, EXIF orientation when the browser supports it, blob download, and a Share sheet fallback when the browser allows sharing files.",
  },
  {
    q: "What does the quality slider do?",
    a: "It affects WebP, AVIF and JPG (lossy). PNG is lossless and ignores quality. Default is 85%.",
  },
  {
    q: "Who made Shift?",
    a: "Shift is a free tool from Ultimatum. Other private tools in the family: Crush (compressor), HEIC Local, Folio PDF Toolkit, and Nota Invoice.",
  },
] as const;
