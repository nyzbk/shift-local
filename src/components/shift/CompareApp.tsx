import { useCallback, useEffect, useRef, useState } from "react";
import { Download, ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  convertImage,
  isAcceptedImage,
  looksLikeAvif,
  outputLabel,
  probeCodecs,
  WARN_FILE_BYTES,
  type CodecSupport,
  type ConvertResult,
  type OutputType,
} from "@/lib/convert";
import { downloadBlob, formatBytes } from "@/lib/utils";

const ACCEPT =
  "image/jpeg,image/png,image/webp,image/avif,image/bmp,image/gif,.jpg,.jpeg,.png,.webp,.avif,.bmp,.gif";

type Side = {
  type: OutputType;
  result: ConvertResult;
  url: string;
};

function pctSaved(original: number, next: number) {
  if (original <= 0) return 0;
  return Math.round((1 - next / original) * 100);
}

export function CompareApp() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.85);
  const [maxWidth, setMaxWidth] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [working, setWorking] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [codecs, setCodecs] = useState<CodecSupport | null>(null);
  const [left, setLeft] = useState<Side | null>(null);
  const [right, setRight] = useState<Side | null>(null);
  const [pairNote, setPairNote] = useState<string | null>(null);

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

  const takeFile = useCallback((next: File) => {
    if (!isAcceptedImage(next)) {
      setBanner(`${next.name} is not a supported image.`);
      return;
    }
    setBanner(
      next.size > WARN_FILE_BYTES
        ? `${next.name} is large (${formatBytes(next.size)}). Weighing may be slow on this device.`
        : null,
    );
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(next);
    });
    setFile(next);
    setLeft((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setRight((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setPairNote(null);
  }, []);

  function clearFile() {
    if (preview) URL.revokeObjectURL(preview);
    setLeft((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setRight((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setPreview(null);
    setFile(null);
    setBanner(null);
    setPairNote(null);
  }

  async function weigh() {
    if (!file) {
      setBanner("Choose one photo to weigh.");
      return;
    }
    if (codecs && !webpOk) {
      setBanner("This browser cannot encode WebP. Open the converter and pick JPG.");
      return;
    }
    setWorking(true);
    setBanner(null);
    const width = maxWidth ? Number(maxWidth) : undefined;
    const opts = {
      quality,
      maxWidth: width && width > 0 ? width : undefined,
    };
    const rightType: OutputType = codecs && avifOk ? "image/avif" : "image/jpeg";
    setPairNote(
      rightType === "image/avif"
        ? "Same quality and max width on both encodes. AVIF probe passed on this device."
        : "AVIF encode is not available on this browser. Weighing WebP against JPG — no fake .avif.",
    );

    try {
      const webp = await convertImage(file, { ...opts, outputType: "image/webp" });
      const other = await convertImage(file, { ...opts, outputType: rightType });
      if (rightType === "image/avif") {
        const head = new Uint8Array(await other.blob.slice(0, 32).arrayBuffer());
        if (!looksLikeAvif(head)) {
          throw new Error("AVIF encode did not produce a real AVIF. Weighing against JPG instead.");
        }
      }
      setLeft((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return { type: "image/webp", result: webp, url: URL.createObjectURL(webp.blob) };
      });
      setRight((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return { type: rightType, result: other, url: URL.createObjectURL(other.blob) };
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not weigh this image.";
      if (/AVIF/.test(message) && file) {
        try {
          const webp = await convertImage(file, { ...opts, outputType: "image/webp" });
          const jpg = await convertImage(file, { ...opts, outputType: "image/jpeg" });
          setPairNote("AVIF encode failed on this photo. Weighing WebP against JPG — no fake .avif.");
          setLeft((prev) => {
            if (prev) URL.revokeObjectURL(prev.url);
            return { type: "image/webp", result: webp, url: URL.createObjectURL(webp.blob) };
          });
          setRight((prev) => {
            if (prev) URL.revokeObjectURL(prev.url);
            return { type: "image/jpeg", result: jpg, url: URL.createObjectURL(jpg.blob) };
          });
          setBanner(null);
          setWorking(false);
          return;
        } catch (fallbackErr) {
          setBanner(fallbackErr instanceof Error ? fallbackErr.message : message);
        }
      } else {
        setBanner(message);
      }
    }
    setWorking(false);
  }

  const original = file?.size ?? 0;
  const winner =
    left && right
      ? left.result.newSize === right.result.newSize
        ? "tie"
        : left.result.newSize < right.result.newSize
          ? left.type
          : right.type
      : null;

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
          const next = e.dataTransfer.files[0];
          if (next) takeFile(next);
        }}
      >
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-paper text-copper">
          <ImagePlus className="size-6" />
        </div>
        <h2 className="mt-4 font-display text-xl">Drop one photo</h2>
        <p className="mt-1 text-sm text-muted">
          One file. Two encodes. Same quality. The bytes never leave this tab.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button type="button" variant="copper" onClick={() => inputRef.current?.click()}>
            Choose a file
          </Button>
          {file && (
            <Button type="button" variant="outline" onClick={clearFile}>
              Clear
            </Button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          onChange={(e) => {
            const next = e.target.files?.[0];
            if (next) takeFile(next);
            e.target.value = "";
          }}
        />
      </section>

      {file && preview && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-line bg-surface p-3">
          <img src={preview} alt="" className="h-16 w-16 shrink-0 rounded-xl bg-paper object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{file.name}</p>
            <p className="text-sm tabular-nums text-muted">{formatBytes(file.size)}</p>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={clearFile} aria-label="Remove">
            <X className="size-4" />
          </Button>
        </div>
      )}

      <section className="mt-6 rounded-2xl border border-line bg-surface p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Same knobs on both encodes</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="compare-quality" className="flex justify-between text-sm font-medium">
              Quality <span className="tabular-nums text-muted">{Math.round(quality * 100)}%</span>
            </label>
            <input
              id="compare-quality"
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="mt-1 w-full accent-copper"
            />
          </div>
          <div>
            <label htmlFor="compare-maxw" className="text-sm font-medium">
              Max width (optional)
            </label>
            <input
              id="compare-maxw"
              inputMode="numeric"
              placeholder="original"
              value={maxWidth}
              onChange={(e) => setMaxWidth(e.target.value.replace(/[^\d]/g, ""))}
              className="mt-2 h-11 w-full rounded-xl border border-line bg-paper px-3"
            />
          </div>
        </div>
        <div className="mt-5">
          <Button type="button" onClick={() => void weigh()} disabled={!file || working} aria-busy={working}>
            {working ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Weighing…
              </>
            ) : (
              "Weigh this photo"
            )}
          </Button>
        </div>
        {banner && <p className="mt-3 text-sm text-copper-deep">{banner}</p>}
        {pairNote && !banner && <p className="mt-3 text-sm text-muted">{pairNote}</p>}
      </section>

      {left && right && (
        <section className="mt-6 overflow-x-auto rounded-2xl border border-line bg-paper p-5">
          <h3 className="font-display text-xl">Byte table</h3>
          <table className="mt-4 w-full min-w-[28rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-muted">
                <th className="py-2 pr-3 font-medium">Object</th>
                <th className="py-2 pr-3 font-medium tabular-nums">Bytes</th>
                <th className="py-2 pr-3 font-medium tabular-nums">vs original</th>
                <th className="py-2 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line">
                <td className="py-2 pr-3">Original</td>
                <td className="py-2 pr-3 tabular-nums">{formatBytes(original)}</td>
                <td className="py-2 pr-3 tabular-nums">—</td>
                <td className="py-2 text-muted">source</td>
              </tr>
              {[left, right].map((side) => {
                const saved = pctSaved(original, side.result.newSize);
                const isWinner = winner === side.type;
                return (
                  <tr key={side.type} className="border-b border-line last:border-0">
                    <td className="py-2 pr-3 font-medium">{outputLabel(side.type)}</td>
                    <td className="py-2 pr-3 tabular-nums">{formatBytes(side.result.newSize)}</td>
                    <td className="py-2 pr-3 tabular-nums">{saved >= 0 ? `−${saved}%` : `+${Math.abs(saved)}%`}</td>
                    <td className="py-2">
                      {isWinner ? (
                        <span className="inline-flex rounded-full bg-paper px-2 py-0.5 text-xs font-semibold text-success">
                          smaller
                        </span>
                      ) : winner === "tie" ? (
                        <span className="text-muted">tie</span>
                      ) : (
                        <span className="text-muted">heavier</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-muted">
            {left.result.width}×{left.result.height} after max width. Smaller is not always better looking — open both
            at 100% before you ship.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[left, right].map((side) => (
              <figure key={side.type} className="rounded-2xl border border-line bg-surface p-3">
                <img
                  src={side.url}
                  alt={`${outputLabel(side.type)} encode`}
                  className="aspect-square w-full rounded-xl bg-paper object-contain"
                />
                <figcaption className="mt-2 flex items-center justify-between gap-2 text-sm">
                  <span>
                    {outputLabel(side.type)} ·{" "}
                    <span className="tabular-nums">{formatBytes(side.result.newSize)}</span>
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => void downloadBlob(side.result.blob, side.result.filename)}
                  >
                    <Download className="size-4" /> Download
                  </Button>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
