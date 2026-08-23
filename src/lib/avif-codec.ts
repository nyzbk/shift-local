import { defaultOptions } from "@jsquash/avif/meta.js";
import { initEmscriptenModule } from "@jsquash/avif/utils.js";

type AvifModule = {
  encode: (
    data: Uint8Array,
    width: number,
    height: number,
    options: Record<string, unknown>,
  ) => Uint8Array | null;
};

let encoderPromise: Promise<AvifModule> | null = null;

async function getEncoder(): Promise<AvifModule> {
  if (!encoderPromise) {
    encoderPromise = (async () => {
      const factory = (await import("@jsquash/avif/codec/enc/avif_enc.js")).default;
      return (await initEmscriptenModule(factory)) as AvifModule;
    })();
  }
  return encoderPromise;
}

export async function encodeAvifImageData(imageData: ImageData, quality: number): Promise<Uint8Array> {
  const module = await getEncoder();
  const q = Math.round(Math.min(1, Math.max(0.1, quality)) * 100);
  const pixels = new Uint8Array(imageData.data);
  const output = module.encode(pixels, imageData.width, imageData.height, {
    ...defaultOptions,
    quality: q,
    speed: 8,
    lossless: false,
  });
  if (!output || output.byteLength < 32) {
    throw new Error("AVIF encoding failed on this device.");
  }
  return output.slice();
}

export async function decodeAvifBuffer(buffer: ArrayBuffer): Promise<ImageData> {
  const { default: decode, init } = await import("@jsquash/avif/decode.js");
  await init();
  const result = await decode(buffer);
  if (!result?.width || !result.height) {
    throw new Error("This browser can’t open this AVIF.");
  }
  return result;
}
