import type { Preview } from "@storybook/react-vite";
import "../playground/playground.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    options: {
      storySort: {
        order: [
          "Getting Started",
          "Theming",
          "Components",
          "Containers",
          "Blocks",
          "Dialogs",
          "Utilities",
        ],
      },
    },

    a11y: {
      test: "todo",
    },
  },
};

export default preview;
