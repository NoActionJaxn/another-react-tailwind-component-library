import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: docsParameters("Button", { layout: "centered" }),
  args: {
    children: m.components.Button.story.children,
    variant: "solid",
    size: "md",
    colorScheme: "default",
    disabled: false,
    block: false,
    asChild: false,
    onClick: fn(),
  },
  argTypes: docsArgTypes(
    "Button",
    ["variant", "size", "colorScheme", "disabled", "block"],
    {
      variant: {
        control: "inline-radio",
        options: ["solid", "soft", "outline", "ghost"],
        table: { defaultValue: { summary: "solid" } },
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
      block: { table: { defaultValue: { summary: "false" } } },
      asChild: { table: { defaultValue: { summary: "false" } } },
    },
  ),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
