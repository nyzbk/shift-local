import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <div id="main" className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
