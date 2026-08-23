export type OutputType = "image/webp" | "image/avif" | "image/jpeg" | "image/png";

export type ConvertOptions = {
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
  outputType: OutputType;
};

export type ConvertResult = {
  blob: Blob;
  width: number;
  height: number;
  originalSize: number;
  newSize: number;
  filename: string;
};

export type CodecSupport = {
  webpEncode: boolean;
  avifEncode: boolean;
  avifEngine: "jsquash" | "native" | "none";
  simd: boolean;
};

export const MAX_FILE_BYTES = 80 * 1024 * 1024;
export const WARN_FILE_BYTES = 25 * 1024 * 1024;

const EXT: Record<OutputType, string> = {
  "image/webp": "webp",
  "image/avif": "avif",
  "image/jpeg": "jpg",
  "image/png": "png",
};

export function outputExt(type: OutputType): string {
  return EXT[type];
}

export function outputLabel(type: OutputType): string {
  if (type === "image/webp") return "WebP";
  if (type === "image/avif") return "AVIF";
  if (type === "image/png") return "PNG";
  return "JPG";
}

function indexOfFourCC(buf: Uint8Array, code: string, from = 0, to = buf.length): number {
  const a = code.charCodeAt(0);
  const b = code.charCodeAt(1);
  const c = code.charCodeAt(2);
  const d = code.charCodeAt(3);
  const end = Math.min(buf.length - 4, to);
  for (let i = from; i <= end; i++) {
    if (buf[i] === a && buf[i + 1] === b && buf[i + 2] === c && buf[i + 3] === d) return i;
  }
  return -1;
}

export function looksLikeAvif(head: Uint8Array): boolean {
  const ftyp = indexOfFourCC(head, "ftyp", 0, 16);
  if (ftyp < 0) return false;
  const brands = new TextDecoder("latin1").decode(
    head.subarray(ftyp, Math.min(head.length, ftyp + 64)),
  );
  return brands.includes("avif") || brands.includes("avis");
}

export function looksLikeHeic(head: Uint8Array): boolean {
  const ftyp = indexOfFourCC(head, "ftyp", 0, 16);
  if (ftyp < 0) return false;
  const brands = new TextDecoder("latin1")
    .decode(head.subarray(ftyp, Math.min(head.length, ftyp + 64)))
    .toLowerCase();
  if (brands.includes("avif") || brands.includes("avis")) return false;
  return /heic|heif|heix|heim|heis|mif1|msf1/.test(brands);
}

function looksLikeRaster(head: Uint8Array): boolean {
  if (head.length < 4) return false;
  if (head[0] === 0xff && head[1] === 0xd8) return true;
  if (head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47) return true;
  if (head[0] === 0x47 && head[1] === 0x49 && head[2] === 0x46) return true;
  if (head[0] === 0x42 && head[1] === 0x4d) return true;
  if (
    head[0] === 0x52 &&
    head[1] === 0x49 &&
    head[2] === 0x46 &&
    head[3] === 0x46 &&
    head[8] === 0x57 &&
    head[9] === 0x45 &&
    head[10] === 0x42 &&
    head[11] === 0x50
  ) {
    return true;
  }
  return looksLikeAvif(head);
}

export function isAcceptedImage(file: File): boolean {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  const typeOk =
    type === "image/jpeg" ||
    type === "image/jpg" ||
    type === "image/png" ||
    type === "image/webp" ||
    type === "image/avif" ||
    type === "image/bmp" ||
    type === "image/gif" ||
    type === "image/x-windows-bmp";
  const extOk = /\.(jpe?g|png|webp|avif|bmp|gif)$/.test(name);
  return typeOk || extOk;
}

export async function assertSafeImage(file: File): Promise<void> {
  if (file.size <= 0) throw new Error("This file is empty.");
  if (file.size > MAX_FILE_BYTES) {
    throw new Error("This file is too large for this device’s memory. Try a smaller image.");
  }
  const head = new Uint8Array(await file.slice(0, 64).arrayBuffer());
  if (looksLikeHeic(head)) {
    throw new Error("HEIC files belong in HEIC Local — Shift converts WebP, AVIF, JPG and PNG.");
  }
  if (!isAcceptedImage(file) && !looksLikeAvif(head) && !looksLikeRaster(head)) {
    throw new Error("Only JPG, PNG, WebP, AVIF, BMP, or GIF files are accepted.");
  }
  if (!looksLikeRaster(head) && !looksLikeAvif(head)) {
    throw new Error("This file does not look like a valid image.");
  }
}

function fitSize(width: number, height: number, maxWidth?: number, maxHeight?: number) {
  let scale = 1;
  if (maxWidth && width > maxWidth) scale = Math.min(scale, maxWidth / width);
  if (maxHeight && height > maxHeight) scale = Math.min(scale, maxHeight / height);
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Could not encode this image on this device."));
        else resolve(blob);
      },
      type,
      quality,
    );
  });
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

function memoryError(err: unknown): Error {
  const message = err instanceof Error ? err.message : String(err);
  if (/memory|allocation|source image is too large/i.test(message)) {
    return new Error(
      "This image is too large for this device’s memory. Try a smaller photo or set a max width.",
    );
  }
  return err instanceof Error ? err : new Error("Could not read this image in the browser.");
}

let supportPromise: Promise<CodecSupport> | null = null;
let avifReady: "jsquash" | "native" | "none" | null = null;

export async function probeCodecs(): Promise<CodecSupport> {
  if (supportPromise) return supportPromise;
  supportPromise = (async () => {
    const empty: CodecSupport = {
      webpEncode: false,
      avifEncode: false,
      avifEngine: "none",
      simd: false,
    };
    if (typeof document === "undefined") return empty;

    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#808080";
      ctx.fillRect(0, 0, 1, 1);
    }

    let webpEncode = false;
    try {
      const blob = await canvasToBlob(canvas, "image/webp", 0.8);
      webpEncode = blob.type === "image/webp" && blob.size > 0;
    } catch {
      webpEncode = false;
    }

    let simd = false;
    try {
      const detect = await import("wasm-feature-detect");
      simd = await detect.simd();
    } catch {
      simd = false;
    }

    let avifEngine: CodecSupport["avifEngine"] = "none";
    try {
      avifEngine = await probeAvifEncode(canvas, ctx);
    } catch {
      avifEngine = "none";
    }
    avifReady = avifEngine;
    canvas.width = 0;
    canvas.height = 0;
    return {
      webpEncode,
      avifEncode: avifEngine !== "none",
      avifEngine,
      simd,
    };
  })();
  return supportPromise;
}

async function probeAvifEncode(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null,
): Promise<CodecSupport["avifEngine"]> {
  let nativeOk = false;
  try {
    nativeOk = await withTimeout(probeNativeAvif(canvas), 2000, "AVIF native probe");
  } catch {
    nativeOk = false;
  }

  if (typeof WebAssembly !== "undefined" && ctx) {
    try {
      const blob = await withTimeout(
        encodeAvifFromCanvas(ctx, canvas.width, canvas.height, 0.5),
        10000,
        "AVIF wasm probe",
      );
      if (blob.size > 32 && blob.size < 64_000) {
        avifReady = "jsquash";
        return "jsquash";
      }
    } catch {
      // fall through to native
    }
  }

  if (nativeOk) {
    avifReady = "native";
    return "native";
  }
  return "none";
}

async function probeNativeAvif(canvas: HTMLCanvasElement): Promise<boolean> {
  try {
    const blob = await canvasToBlob(canvas, "image/avif", 0.8);
    if (!blob || blob.size <= 0 || blob.size > 64_000) return false;
    const head = new Uint8Array(await blob.slice(0, 32).arrayBuffer());
    if (!looksLikeAvif(head) && blob.type !== "image/avif") return false;
    if (!looksLikeAvif(head)) return false;
    const bitmap = await createImageBitmap(blob);
    bitmap.close();
    return true;
  } catch {
    return false;
  }
}

async function encodeAvifFromCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  quality: number,
): Promise<Blob> {
  try {
    const { encodeAvifImageData } = await import("./avif-codec");
    const imageData = ctx.getImageData(0, 0, width, height);
    const bytes = await encodeAvifImageData(imageData, quality);
    const copy = new Uint8Array(bytes);
    const blob = new Blob([copy], { type: "image/avif" });
    const head = copy.subarray(0, 32);
    if (!looksLikeAvif(head)) {
      throw new Error("AVIF encode did not produce a valid AVIF file.");
    }
    return blob;
  } catch (err) {
    throw memoryError(err);
  }
}

async function decodeAvifToBitmap(file: File): Promise<ImageBitmap> {
  const { decodeAvifBuffer } = await import("./avif-codec");
  const imageData = await decodeAvifBuffer(await file.arrayBuffer());
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available in this browser.");
  ctx.putImageData(imageData, 0, 0);
  try {
    return await createImageBitmap(canvas);
  } finally {
    canvas.width = 0;
    canvas.height = 0;
  }
}

async function decodeFile(file: File): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(file, { imageOrientation: "from-image" } as ImageBitmapOptions);
  } catch {
    try {
      return await createImageBitmap(file);
    } catch (second) {
      const head = new Uint8Array(await file.slice(0, 64).arrayBuffer());
      if (looksLikeAvif(head) || file.type === "image/avif" || /\.avif$/i.test(file.name)) {
        try {
          return await decodeAvifToBitmap(file);
        } catch {
          throw new Error("This browser can’t open this AVIF. Try Chrome, Edge, or convert it elsewhere.");
        }
      }
      throw memoryError(second);
    }
  }
}

export async function convertImage(file: File, opts: ConvertOptions): Promise<ConvertResult> {
  await assertSafeImage(file);

  const quality = Math.min(1, Math.max(0.1, opts.quality));
  let outputType = opts.outputType;
  const support = await probeCodecs();

  if (outputType === "image/webp" && !support.webpEncode) {
    throw new Error("This browser cannot encode WebP. Try JPG instead.");
  }
  if (outputType === "image/avif" && !support.avifEncode) {
    throw new Error("AVIF encode is not available on this browser. Use WebP instead.");
  }

  const bitmap = await decodeFile(file);

  try {
    const fitted = fitSize(bitmap.width, bitmap.height, opts.maxWidth, opts.maxHeight);
    const canvas = document.createElement("canvas");
    canvas.width = fitted.width;
    canvas.height = fitted.height;
    const ctx = canvas.getContext("2d", { alpha: outputType !== "image/jpeg" });
    if (!ctx) throw new Error("Canvas is not available in this browser.");
    if (outputType === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    let blob: Blob;
    if (outputType === "image/avif") {
      const engine = avifReady ?? support.avifEngine;
      if (engine === "jsquash") {
        blob = await encodeAvifFromCanvas(ctx, canvas.width, canvas.height, quality);
      } else {
        blob = await canvasToBlob(canvas, "image/avif", quality);
        const head = new Uint8Array(await blob.slice(0, 32).arrayBuffer());
        if (!looksLikeAvif(head)) {
          throw new Error("AVIF encode is not available on this browser. Use WebP instead.");
        }
      }
    } else {
      blob = await canvasToBlob(canvas, outputType, quality);
      if (outputType === "image/webp" && blob.type !== "image/webp") {
        throw new Error("This browser cannot encode WebP. Try JPG instead.");
      }
    }

    canvas.width = 0;
    canvas.height = 0;

    const stem = (file.name.split(/[/\\]/).pop() ?? "image").replace(/\.[^.]+$/, "") || "image";
    return {
      blob,
      width: fitted.width,
      height: fitted.height,
      originalSize: file.size,
      newSize: blob.size,
      filename: `${stem}-shift.${EXT[outputType]}`,
    };
  } finally {
    bitmap.close();
  }
}
