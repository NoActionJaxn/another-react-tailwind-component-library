import type { Preview } from "@storybook/react-vite";
import "../src/styles/main.css";

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
};

export default preview;
