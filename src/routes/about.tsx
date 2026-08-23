import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <AppShell>
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="font-display text-4xl">About Shift</h1>
        <p className="mt-6 text-pretty">
          Shift is a free, private WebP and AVIF converter. It exists because most “free” converters upload your photos
          to a server you do not control, or hide AVIF support behind a native API that fails silently on phones.
        </p>
        <p className="mt-4 text-pretty text-muted">
          It is made by Ultimatum, a brand-marketing studio. Other private tools in this family:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
          <li>
            <a className="text-copper-deep underline" href="https://crush-local.vercel.app">
              Crush
            </a>{" "}
            — compress JPG, PNG and WebP in the browser
          </li>
          <li>
            <a className="text-copper-deep underline" href="https://heic-local.vercel.app">
              HEIC Local
            </a>{" "}
            — HEIC to JPG/PNG in the browser
          </li>
          <li>
            <a className="text-copper-deep underline" href="https://folio-pdf-toolkit.vercel.app">
              Folio PDF Toolkit
            </a>{" "}
            — merge, split, compress PDFs
          </li>
          <li>
            <a className="text-copper-deep underline" href="https://nota-invoice-mu.vercel.app">
              Nota
            </a>{" "}
            — free invoice PDF generator
          </li>
        </ul>
      </main>
    </AppShell>
  );
}
