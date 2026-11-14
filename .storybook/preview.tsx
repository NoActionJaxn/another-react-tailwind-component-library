import type { Preview } from "@storybook/react-vite";
import { m } from "../src/docs/i18n";
import "../playground/playground.css";

// Props whose description lives in common.props under another key.
const commonKeys: Record<string, string> = { "aria-label": "ariaLabel" };

/** Fills any props-table gaps: a common description, and a default for every row. */
// Args-only props (no argType yet) are included: Storybook adds their rows later.
type ArgType = Parameters<
  NonNullable<Preview["argTypesEnhancers"]>[number]
>[0]["argTypes"][string];

/**
 * Storybook falls back to a JSON editor for props it has no type for (Radix
 * props, ReactNode). Pick the control from the story's value instead, and turn
 * it off for content, callbacks and styling hooks that can't be edited as text.
 */
function fixControl(name: string, argType: ArgType, value: unknown) {
  if (name === "className" || name === "style") return false;
  const control = argType.control;
  const type = typeof control === "object" ? control?.type : control;
  // Storybook infers controls after this enhancer, and gives props with no
  // usable type a JSON editor. Decide for those here, from the story's value.
  const untyped = !argType.type?.name || argType.type.name === "other";
  if (type !== "object" && !(control === undefined && untyped)) return control;
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (typeof value === "string") return "text";
  // Arrays and plain objects (e.g. a Slider's [value]) keep the JSON editor.
  if (value !== null && typeof value === "object" && !("$$typeof" in value)) {
    return control ?? "object";
  }
  return false;
}

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
          control: fixControl(name, argType, initialArgs?.[name]),
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
          "Usage",
          "Theming",
          "Actions",
          "Forms",
          "Navigation",
          "Data Display",
          "Typography",
          "Feedback",
          "Overlays",
          "Dialogs",
          "Containers",
          "Cards",
          "Blocks",
          "Utilities",
          "Hooks",
        ],
      },
    },

    a11y: {
      test: "todo",
    },
  },
};

export default preview;
