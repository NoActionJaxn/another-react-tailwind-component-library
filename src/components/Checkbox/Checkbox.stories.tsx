import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { fn } from "storybook/test";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: docsParameters("Checkbox", { layout: "centered" }),
  args: {
    label: m.components.Checkbox.story.label,
    size: "md",
    colorScheme: "default",
    disabled: false,
    onCheckedChange: fn(),
  },
  argTypes: docsArgTypes(
    "Checkbox",
    ["label", "size", "colorScheme", "disabled"],
    {
      checked: {
        control: "inline-radio",
        options: [false, true, "indeterminate"],
      },
      size: {
        control: "inline-radio",
        options: ["sm", "md", "lg"],
        table: { defaultValue: { summary: "md" } },
      },
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
        table: { defaultValue: { summary: m.common.defaults.inherited } },
      },
      disabled: { table: { defaultValue: { summary: "false" } } },
    },
  ),
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
