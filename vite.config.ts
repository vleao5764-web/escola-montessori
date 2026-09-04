// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { loadEnv } from "vite";

const localEnv = loadEnv("development", process.cwd(), "");
if (localEnv["LOVABLE_PREVIEW_HOST"]) {
  process.env["LOVABLE_PREVIEW_HOST"] = localEnv["LOVABLE_PREVIEW_HOST"];
}

export default defineConfig({
  vite: {
    server: {
      allowedHosts: [".lhr.life"],
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // A Hospedagem Business serve arquivos estáticos; gere a página inicial no build.
    prerender: {
      enabled: true,
      autoSubfolderIndex: true,
      crawlLinks: true,
      failOnError: true,
    },
  },
});
