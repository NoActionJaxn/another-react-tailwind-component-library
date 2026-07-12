import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../src/docs/**/*.mdx"],
  addons: [
    "@storybook/addon-vitest",
    "@storybook/addon-mcp",
    "@storybook/addon-themes",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react-vite",
};
export default config;
