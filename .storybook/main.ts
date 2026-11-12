import fs from "node:fs";
import path from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

// Docs pages live in src/docs/<locale>/; a page missing for the locale falls back to English.
const locale = process.env.STORYBOOK_LOCALE ?? "en";
const docsDir = path.resolve(process.cwd(), "src/docs");
const docsPages = fs
  .readdirSync(path.join(docsDir, "en"))
  .filter((file) => file.endsWith(".mdx"))
  .sort()
  .map((file) =>
    fs.existsSync(path.join(docsDir, locale, file))
      ? `../src/docs/${locale}/${file}`
      : `../src/docs/en/${file}`,
  );

const config: StorybookConfig = {
  stories: [
    ...docsPages,
    "../src/components/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
    "@storybook/addon-vitest",
  ],
  framework: "@storybook/react-vite",
};
export default config;
