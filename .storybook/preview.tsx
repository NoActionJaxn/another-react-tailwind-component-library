import type { Preview } from "@storybook/react-vite";
import { m } from "../src/docs/i18n";
import "../playground/playground.css";

// Props whose description lives in common.props under another key.
const commonKeys: Record<string, string> = { "aria-label": "ariaLabel" };

/** Fills any props-table gaps: a common description, and a default for every row. */
// Args-only props (no argType yet) are included: Storybook adds their rows later.
const fillDocs: NonNullable<Preview["argTypesEnhancers"]>[number] = ({
  argTypes,
  initialArgs,
}) =>
  Object.fromEntries(
    [
      ...new Set([...Object.keys(argTypes), ...Object.keys(initialArgs ?? {})]),
    ].map((name) => {
      const argType = argTypes[name] ?? { name };
      const common = (m.common.props as Record<string, string>)[
        commonKeys[name] ?? name
      ];
      const summary =
        argType.table?.defaultValue?.summary ??
        (name === "colorScheme"
          ? m.common.defaults.inherited
          : m.common.defaults.notSet);
      return [
        name,
        {
          ...argType,
          description: argType.description || common,
          table: {
            ...argType.table,
            defaultValue: { ...argType.table?.defaultValue, summary },
          },
        },
      ];
    }),
  );

const preview: Preview = {
  argTypesEnhancers: [fillDocs],
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
          "Actions",
          "Forms",
          "Navigation",
          "Data Display",
          "Typography",
          "Overlays",
          "Dialogs",
          "Containers",
          "Cards",
          "Blocks",
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
