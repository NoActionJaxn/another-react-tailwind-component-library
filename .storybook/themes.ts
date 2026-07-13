import { create } from "storybook/theming";

// Mirrors this library's own design tokens (src/styles/theme.css) instead of
// inventing separate branding. The "default" color scale there is Tailwind's
// stone palette, and there's no separate primary/secondary hue anywhere in
// the component styles - colorPrimary/colorSecondary below are just
// darker/lighter points on that same neutral scale, not a new brand color.
// Shared between manager.ts (the app chrome) and DocsContainer.tsx (the Docs
// pages) - both are permanently dark, independent of the story-level toolbar
// theme toggle, which only affects individual component canvases.
export const darkTheme = create({
  base: "dark",
  brandTitle: "Another React + Tailwind Component Library",
  brandUrl: "https://another-react-tailwind-component-library.com",
  brandImage: "/logo.svg",
  fontBase: '"Roboto Flex", sans-serif',
  fontCode: '"Roboto Mono", monospace',

  colorPrimary: "#e7e5e4", // --color-stone-200
  colorSecondary: "#a8a29e", // --color-stone-400

  appBg: "#0c0a09", // --color-stone-950
  appContentBg: "#1c1917", // --color-stone-900
  appBorderColor: "#292524", // --color-stone-800

  textColor: "#fafaf9", // --color-stone-50
  textInverseColor: "#1c1917", // --color-stone-900

  barBg: "#0c0a09", // --color-stone-950
  barTextColor: "#a8a29e", // --color-stone-400
  barSelectedColor: "#fafaf9", // --color-stone-50
});
