import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download, ImagePlus, Loader2, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdUnit } from "@/components/ads/AdUnit";
import {
  convertImage,
  isAcceptedImage,
  outputExt,
  outputLabel,
  probeCodecs,
  WARN_FILE_BYTES,
  type CodecSupport,
  type OutputType,
} from "@/lib/convert";
import { zipBlobs } from "@/lib/zip";
import { downloadBlob, formatBytes } from "@/lib/utils";

type Stage = "idle" | "ready" | "working" | "done";

type Item = {
  id: string;
  file: File;
  preview: string;
  error?: string;
  result?: {
    blob: Blob;
    url: string;
    filename: string;
    originalSize: number;
    newSize: number;
    width: number;
    height: number;
  };
  progress: number;
};

const ACCEPT =
  "image/jpeg,image/png,image/webp,image/avif,image/bmp,image/gif,.jpg,.jpeg,.png,.webp,.avif,.bmp,.gif";

const FORMATS: { value: OutputType; label: string }[] = [
  { value: "image/webp", label: "WebP" },
  { value: "image/avif", label: "AVIF" },
  { value: "image/jpeg", label: "JPG" },
  { value: "image/png", label: "PNG" },
];

function deltaPct(original: number, next: number) {
  if (original <= 0) return 0;
  return Math.round((1 - next / original) * 100);
}

export function ConverterApp() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [stage, setStage] = useState<Stage>("idle");
  const [outputType, setOutputType] = useState<OutputType>("image/webp");
  const [quality, setQuality] = useState(0.85);
  const [maxWidth, setMaxWidth] = useState("");
  const [maxHeight, setMaxHeight] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [codecs, setCodecs] = useState<CodecSupport | null>(null);

  useEffect(() => {
    let alive = true;
    void probeCodecs().then((support) => {
      if (alive) setCodecs(support);
    });
    return () => {
      alive = false;
    };
  }, []);

  const avifOk = codecs?.avifEncode === true;
  const webpOk = codecs?.webpEncode !== false;

  const addFiles = useCallback((list: FileList | File[]) => {
    const next: Item[] = [];
    const warnings: string[] = [];
    Array.from(list).forEach((file) => {
      if (!isAcceptedImage(file)) {
        warnings.push(`${file.name} is not a supported image.`);
        return;
      }
      if (file.size > WARN_FILE_BYTES) {
        warnings.push(`${file.name} is large (${formatBytes(file.size)}). Conversion may be slow on this device.`);
      }
      next.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
      });
    });
    if (warnings.length) setBanner(warnings.join(" "));
    else setBanner(null);
    setItems((prev) => {
      const merged = [...prev, ...next];
      setStage(merged.length ? "ready" : "idle");
      return merged;
    });
  }, []);

  function remove(id: string) {
    setItems((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) {
        URL.revokeObjectURL(item.preview);
        if (item.result) URL.revokeObjectURL(item.result.url);
      }
      const rest = prev.filter((p) => p.id !== id);
      if (!rest.length) setStage("idle");
      return rest;
    });
  }

  function clearAll() {
    items.forEach((item) => {
      URL.revokeObjectURL(item.preview);
      if (item.result) URL.revokeObjectURL(item.result.url);
    });
    setItems([]);
    setStage("idle");
    setBanner(null);
  }

  function pickFormat(value: OutputType) {
    if (value === "image/avif" && codecs && !avifOk) return;
    setOutputType(value);
  }

  async function runConvert() {
    if (!items.length) {
      setBanner("Choose at least one image to convert.");
      return;
    }
    if (outputType === "image/avif" && codecs && !avifOk) {
      setBanner("AVIF encode is not available on this browser. Use WebP instead.");
      setOutputType("image/webp");
      return;
    }
    setStage("working");
    const width = maxWidth ? Number(maxWidth) : undefined;
    const height = maxHeight ? Number(maxHeight) : undefined;
    const opts = {
      quality,
      maxWidth: width && width > 0 ? width : undefined,
      maxHeight: height && height > 0 ? height : undefined,
      outputType,
    };

    const next = [...items];
    for (let i = 0; i < next.length; i++) {
      const item = next[i];
      if (!item) continue;
      next[i] = { ...item, progress: 10, error: undefined };
      setItems([...next]);
      try {
        const result = await convertImage(item.file, opts);
        if (item.result) URL.revokeObjectURL(item.result.url);
        next[i] = {
          ...item,
          progress: 100,
          error: undefined,
          result: {
            blob: result.blob,
            url: URL.createObjectURL(result.blob),
            filename: result.filename,
            originalSize: result.originalSize,
            newSize: result.newSize,
            width: result.width,
            height: result.height,
          },
        };
      } catch (err) {
        next[i] = {
          ...item,
          progress: 0,
          error: err instanceof Error ? err.message : "Could not convert this image.",
        };
      }
      setItems([...next]);
    }
    setStage("done");
  }

  async function downloadZip() {
    const files = items
      .filter((item) => item.result)
      .map((item) => ({ name: item.result!.filename, blob: item.result!.blob }));
    if (!files.length) return;
    const blob = await zipBlobs(files);
    await downloadBlob(blob, `shift-${files.length}-images.zip`);
  }

  const totals = useMemo(() => {
    const done = items.filter((i) => i.result);
    const original = done.reduce((s, i) => s + (i.result?.originalSize ?? 0), 0);
    const next = done.reduce((s, i) => s + (i.result?.newSize ?? 0), 0);
    return { count: done.length, original, next };
  }, [items]);

  const overall = items.length ? Math.round(items.reduce((s, i) => s + i.progress, 0) / items.length) : 0;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2" aria-live="polite">
        <span className="inline-flex min-h-8 items-center rounded-full border border-line bg-surface px-3 text-xs font-medium tabular-nums">
          WebP encode: {codecs ? (webpOk ? "yes" : "no") : "…"}
        </span>
        <span className="inline-flex min-h-8 items-center rounded-full border border-line bg-surface px-3 text-xs font-medium tabular-nums">
          AVIF encode: {codecs ? (avifOk ? "yes" : "no") : "…"}
        </span>
      </div>

      <section
        className={`rounded-2xl border border-dashed bg-surface p-6 text-center transition-colors duration-150 sm:p-10 ${
          dragOver ? "border-copper bg-paper" : "border-line"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
        }}
      >
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-paper text-copper">
          <ImagePlus className="size-6" />
        </div>
        <h2 className="mt-4 font-display text-xl">Drop images here</h2>
        <p className="mt-1 text-sm text-muted">JPG, PNG, WebP, AVIF, BMP, GIF — they never leave this tab.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button type="button" variant="copper" onClick={() => inputRef.current?.click()}>
            Choose files
          </Button>
          {items.length > 0 && (
            <Button type="button" variant="outline" onClick={clearAll}>
              Clear all
            </Button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="sr-only"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </section>

      <section className="mt-6 rounded-2xl border border-line bg-surface p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Options</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Output format</legend>
            <div className="flex flex-wrap gap-2">
              {FORMATS.map(({ value, label }) => {
                const disabled = value === "image/avif" && codecs !== null && !avifOk;
                return (
                  <button
                    key={value}
                    type="button"
                    disabled={disabled}
                    onClick={() => pickFormat(value)}
                    className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-colors duration-150 ${
                      outputType === value
                        ? "bg-ink text-paper"
                        : "border border-line bg-paper text-ink"
                    } disabled:cursor-not-allowed disabled:opacity-40`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            {codecs && !avifOk && (
              <p className="mt-2 text-xs text-muted">
                AVIF encode is not available on this browser. WebP still works.
              </p>
            )}
          </fieldset>
          <div>
            <label htmlFor="quality" className="flex justify-between text-sm font-medium">
              Quality <span className="tabular-nums text-muted">{Math.round(quality * 100)}%</span>
            </label>
            <input
              id="quality"
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="mt-1 w-full accent-copper"
            />
            <p className="mt-1 text-xs text-muted">PNG ignores quality (lossless). WebP, AVIF and JPG use this slider.</p>
          </div>
          <div>
            <label htmlFor="maxW" className="text-sm font-medium">
              Max width (optional)
            </label>
            <input
              id="maxW"
              inputMode="numeric"
              placeholder="original"
              value={maxWidth}
              onChange={(e) => setMaxWidth(e.target.value.replace(/[^\d]/g, ""))}
              className="mt-2 h-11 w-full rounded-xl border border-line bg-paper px-3"
            />
          </div>
          <div>
            <label htmlFor="maxH" className="text-sm font-medium">
              Max height (optional)
            </label>
            <input
              id="maxH"
              inputMode="numeric"
              placeholder="original"
              value={maxHeight}
              onChange={(e) => setMaxHeight(e.target.value.replace(/[^\d]/g, ""))}
              className="mt-2 h-11 w-full rounded-xl border border-line bg-paper px-3"
            />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            type="button"
            onClick={() => void runConvert()}
            disabled={!items.length || stage === "working"}
            aria-busy={stage === "working"}
          >
            {stage === "working" ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Converting…
              </>
            ) : (
              `Convert${items.length ? ` ${items.length}` : ""}`
            )}
          </Button>
          {stage === "working" && <span className="text-sm tabular-nums text-muted">{overall}%</span>}
        </div>
        {banner && <p className="mt-3 text-sm text-copper-deep">{banner}</p>}
      </section>

      {items.length > 0 && (
        <ul className="mt-6 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-3 sm:flex-row sm:items-center"
            >
              <img
                src={item.result?.url ?? item.preview}
                alt=""
                className="h-20 w-20 shrink-0 rounded-xl bg-paper object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{item.file.name}</p>
                {item.error ? (
                  <p className="text-sm text-copper-deep">{item.error}</p>
                ) : item.result ? (
                  <p className="text-sm tabular-nums text-ink">
                    {formatBytes(item.result.originalSize)} → {formatBytes(item.result.newSize)}{" "}
                    <span className="text-muted">
                      ({item.result.width}×{item.result.height})
                    </span>
                    <span className="ml-2 inline-flex rounded-full bg-paper px-2 py-0.5 text-xs font-semibold text-success">
                      {deltaPct(item.result.originalSize, item.result.newSize) >= 0
                        ? `−${deltaPct(item.result.originalSize, item.result.newSize)}%`
                        : `+${Math.abs(deltaPct(item.result.originalSize, item.result.newSize))}%`}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm tabular-nums text-muted">{formatBytes(item.file.size)}</p>
                )}
                {stage === "working" && (
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                    <div className="h-full bg-copper transition-[width] duration-200" style={{ width: `${item.progress}%` }} />
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {item.result && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => void downloadBlob(item.result!.blob, item.result!.filename)}
                  >
                    <Download className="size-4" /> Download
                  </Button>
                )}
                <Button type="button" variant="ghost" size="sm" onClick={() => remove(item.id)} aria-label="Remove">
                  <X className="size-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {stage === "done" && totals.count > 0 && (
        <section className="mt-6 rounded-2xl border border-line bg-paper p-5">
          <p className="font-display text-xl">
            Converted {totals.count} {totals.count === 1 ? "file" : "files"} to {outputLabel(outputType)}
          </p>
          <p className="mt-1 text-sm tabular-nums text-muted">
            {formatBytes(totals.original)} → {formatBytes(totals.next)}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {totals.count >= 2 && (
              <Button type="button" variant="copper" onClick={() => void downloadZip()}>
                <Download className="size-4" /> Download ZIP
              </Button>
            )}
            <Button type="button" variant="outline" onClick={clearAll}>
              <Trash2 className="size-4" /> Start over
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted">
            Output as {outputExt(outputType).toUpperCase()}. No watermark.
          </p>
          <AdUnit slot="after-success" />
        </section>
      )}

      {stage === "done" && <AdUnit slot="mid" />}
    </div>
  );
}
