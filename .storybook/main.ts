import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../src/docs/**/*.mdx"],
  addons: [
    "@storybook/addon-vitest",
    "@storybook/addon-mcp",
    "@storybook/addon-themes",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
  ],
  framework: "@storybook/react-vite",
  staticDirs: ["../public"],
  // Hides individual story entries from the sidebar so each component is a
  // single clickable item (its autodocs page, with every story variant
  // embedded inline) rather than a folder you have to expand first.
  docs: {
    docsMode: true,
  },
};
export default config;
