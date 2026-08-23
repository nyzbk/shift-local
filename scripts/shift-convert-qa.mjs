#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";

const url = process.argv[2] || "http://127.0.0.1:8080/";
const outDir = "/workspace/screenshots";
mkdirSync(outDir, { recursive: true });

function fail(msg, extra) {
  console.error(JSON.stringify({ ok: false, error: msg, ...extra }, null, 2));
  process.exit(1);
}

async function raster(page, type, w, h) {
  const bytes = await page.evaluate(
    async ({ type, w, h }) => {
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#3d6b8a";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#c45c26";
      ctx.fillRect(8, 8, Math.max(4, w / 4), Math.max(4, h / 4));
      const blob = await new Promise((res) => c.toBlob((b) => res(b), type, 0.92));
      const buf = await blob.arrayBuffer();
      return Array.from(new Uint8Array(buf));
    },
    { type, w, h },
  );
  return Buffer.from(bytes);
}

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("pageerror", (err) => errors.push(String(err)));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});

await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
await page.getByRole("button", { name: /choose files/i }).waitFor({ timeout: 15000 });

const jpg = await raster(page, "image/jpeg", 320, 240);
const png = await raster(page, "image/png", 200, 200);

const fileInput = page.locator('input[type="file"]');
await fileInput.setInputFiles([
  { name: "sample.jpg", mimeType: "image/jpeg", buffer: jpg },
  { name: "sample.png", mimeType: "image/png", buffer: png },
]);

await page.getByRole("button", { name: /convert 2/i }).click();
await page.getByText(/converted 2 files to webp/i).waitFor({ timeout: 30000 });

const downloads = page.getByRole("button", { name: /^download$/i });
if ((await downloads.count()) < 2) fail("expected two download buttons after convert");

const webpDl = page.waitForEvent("download");
await downloads.nth(0).click();
const first = await webpDl;
const suggested = first.suggestedFilename();
if (!suggested.endsWith(".webp")) fail("first download is not .webp", { suggested });

const zipWait = page.waitForEvent("download");
await page.getByRole("button", { name: /download zip/i }).click();
const zip = await zipWait;
if (!zip.suggestedFilename().endsWith(".zip")) fail("zip name wrong", { name: zip.suggestedFilename() });

await page.screenshot({ path: `${outDir}/shift-convert-webp.png`, fullPage: false });

await page.getByRole("button", { name: /start over/i }).click();
await fileInput.setInputFiles([{ name: "wide.jpg", mimeType: "image/jpeg", buffer: jpg }]);
await page.locator("#maxW").fill("80");
await page.getByRole("button", { name: /convert 1/i }).click();
await page.getByText(/80×60/).waitFor({ timeout: 20000 });

await page.getByRole("button", { name: /start over/i }).click();
await fileInput.setInputFiles([{ name: "notes.txt", mimeType: "text/plain", buffer: Buffer.from("not an image") }]);
await page.getByText(/not a supported image/i).waitFor({ timeout: 8000 });

const avifBadge = await page.locator("text=AVIF encode:").first().textContent();
const avifYes = /AVIF encode:\s*yes/i.test(avifBadge ?? "");
if (avifYes) {
  await fileInput.setInputFiles([{ name: "to-avif.jpg", mimeType: "image/jpeg", buffer: jpg }]);
  await page.getByRole("button", { name: /^AVIF$/ }).click();
  await page.getByRole("button", { name: /convert 1/i }).click();
  await page.getByText(/converted 1 file to avif/i).waitFor({ timeout: 40000 });
  const avifDl = page.waitForEvent("download");
  await page.getByRole("button", { name: /^download$/i }).first().click();
  const avifFile = await avifDl;
  if (!avifFile.suggestedFilename().endsWith(".avif")) {
    fail("AVIF download not .avif", { name: avifFile.suggestedFilename() });
  }
}

await page.screenshot({ path: `${outDir}/shift-convert-done.png` });
await browser.close();

if (errors.length) fail("console errors during convert QA", { errors });

console.log(
  JSON.stringify(
    {
      ok: true,
      webp: true,
      zip: true,
      maxWidth: "80×60",
      rejectNonImage: true,
      avif: avifYes ? "encoded" : "honest-disabled",
    },
    null,
    2,
  ),
);
