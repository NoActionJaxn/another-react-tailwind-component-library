import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/styles/main.css";
import "./preview.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // The Interactions tab is core Storybook, not a removable addon - this is
    // the documented way to hide it (parameters.interactions.disable).
    interactions: {
      disable: true,
    },
  },
  // Toggles the same data-theme attribute theme.css's dark mode reads (see
  // the :root[data-theme="dark"] block there) - set on <html> so it affects
  // the whole page, matching how a real consumer app would toggle it.
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "dark",
      attributeName: "data-theme",
      parentSelector: "html",
    }),
  ],
};

export default preview;
