import { GearIcon } from "@radix-ui/react-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { IconButton } from "./IconButton";

const meta = {
  title: "Actions/IconButton",
  component: IconButton,
  parameters: docsParameters("IconButton", { layout: "centered" }),
  args: {
    "aria-label": m.components.IconButton.story.label,
    variant: "solid",
    size: "md",
    colorScheme: "default",
    round: false,
    disabled: false,
    asChild: false,
    onClick: fn(),
  },
  argTypes: docsArgTypes(
    "IconButton",
    [
      "variant",
      "size",
      "colorScheme",
      "disabled",
      { "aria-label": "ariaLabel" },
    ],
    {
      children: { control: false },
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
      round: { table: { defaultValue: { summary: "false" } } },
      disabled: { table: { defaultValue: { summary: "false" } } },
      asChild: { table: { defaultValue: { summary: "false" } } },
    },
  ),
  render: (args) => (
    <IconButton {...args}>
      <GearIcon aria-hidden />
    </IconButton>
  ),
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
