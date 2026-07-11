/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  // Lets Pagination.tsx statically bundle react-paginate for this repo's own
  // Storybook site, where it's a guaranteed devDependency - unlike
  // vite.lib.config.ts (the publishable library build), which doesn't define
  // this, so consumer apps still get the lazy, optional-peer-dependency load.
  define: {
    __STORYBOOK__: "true",
  },
  plugins: [react(), tailwindcss()],
  // aria-query is a deep transitive CJS dependency (via @testing-library/dom,
  // pulled in by Storybook's test utilities) that Vite's dependency scanner
  // doesn't discover on its own in browser-mode Vitest, since nothing in our
  // own source imports it directly. Without pre-bundling it explicitly, the
  // browser gets served the raw CJS file and fails with "does not provide an
  // export named 'elementRoles'".
  optimizeDeps: {
    include: ["aria-query", "lz-string", "pretty-format"],
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
