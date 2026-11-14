import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { FontBoldIcon } from "@radix-ui/react-icons";
import { Toggle } from "./Toggle";

const meta = {
  title: "Actions/Toggle",
  component: Toggle,
  parameters: docsParameters("Toggle", { layout: "centered" }),
  args: {
    variant: "ghost",
    size: "md",
    colorScheme: "default",
    "aria-label": m.components.Toggle.story.ariaLabel,
  },
  argTypes: docsArgTypes(
    "Toggle",
    ["variant", "size", "colorScheme", { "aria-label": "ariaLabel" }],
    {
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
      },
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
      variant: { control: "inline-radio", options: ["ghost", "outline"] },
    },
  ),
  render: (args) => (
    <Toggle {...args}>
      <FontBoldIcon />
    </Toggle>
  ),
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", {
      name: m.components.Toggle.story.ariaLabel,
    });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await userEvent.keyboard(" ");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
  },
};

export const PressedChange: Story = {
  tags: ["!dev"],
  args: { onPressedChange: fn() },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onPressedChange).toHaveBeenLastCalledWith(true);
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onPressedChange).toHaveBeenLastCalledWith(false);
  },
};

export const Disabled: Story = {
  tags: ["!dev"],
  args: { disabled: true, onPressedChange: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const toggle = canvas.getByRole("button");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(args.onPressedChange).not.toHaveBeenCalled();
  },
};
