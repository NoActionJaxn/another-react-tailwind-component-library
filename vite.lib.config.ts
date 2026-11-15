import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import pkg from "./package.json" with { type: "json" };

const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
];

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  publicDir: false,
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
    lib: {
      formats: ["es"],
      entry: {
        index: "src/index.ts",
        accolades: "src/accolades.ts",
        sponsors: "src/sponsors.ts",
        carousel: "src/carousel.ts",
        "phone-input": "src/phone-input.ts",
      },
    },
    rolldownOptions: {
      external: (id) =>
        external.some((dep) => id === dep || id.startsWith(`${dep}/`)),
      output: {
        // Components use hooks, so React Server Components frameworks need this.
        banner: '"use client";',
        chunkFileNames: "chunks/[name]-[hash].js",
      },
    },
  },
});
