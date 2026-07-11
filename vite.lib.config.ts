import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Builds the publishable library (JS + type declarations are emitted
// separately via `tsc -p tsconfig.build.json`, which must run first so this
// build's emptyOutDir:false doesn't wipe them). See vite.config.ts for the
// Storybook/dev-app/test config - that one is unrelated to what gets
// published to npm.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-dom",
        "radix-ui",
        "classnames",
        "tailwind-merge",
        "react-paginate",
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
  },
});
