import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import { ButtonGroup } from "./ButtonGroup";

const text = m.components.ButtonGroup.story;

const meta = {
  title: "Actions/ButtonGroup",
  component: ButtonGroup,
  parameters: docsParameters("ButtonGroup", { layout: "centered" }),
  args: {
    orientation: "horizontal",
    variant: "outline",
    size: "md",
    colorScheme: "default",
    "aria-label": text.label,
  },
  argTypes: docsArgTypes(
    "ButtonGroup",
    [
      "variant",
      "size",
      "colorScheme",
      "orientation",
      { "aria-label": "ariaLabel" },
    ],
    {
      orientation: {
        control: "inline-radio",
        options: ["horizontal", "vertical"],
        table: { defaultValue: { summary: "horizontal" } },
      },
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
    },
  ),
  render: (args) => (
    <ButtonGroup {...args}>
      {text.buttons.map((label) => (
        <Button key={label}>{label}</Button>
      ))}
    </ButtonGroup>
  ),
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const group = canvas.getByRole("group", { name: text.label });
    const buttons = canvas.getAllByRole("button");
    await expect(buttons).toHaveLength(text.buttons.length);
    // Buttons take the group's variant and size.
    for (const button of buttons) {
      await expect(group).toContainElement(button);
      await expect(button).toHaveAttribute("data-variant", "outline");
      await expect(button).toHaveAttribute("data-size", "md");
    }
  },
};

// A button's own variant and size win over the group's.
export const ButtonOverrides: Story = {
  tags: ["!dev"],
  args: { variant: "soft", size: "lg" },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>{text.buttons[0]}</Button>
      <Button variant="solid" size="sm">
        {text.buttons[1]}
      </Button>
    </ButtonGroup>
  ),
  play: async ({ canvas }) => {
    const [inherited, own] = canvas.getAllByRole("button");
    await expect(inherited).toHaveAttribute("data-variant", "soft");
    await expect(inherited).toHaveAttribute("data-size", "lg");
    await expect(own).toHaveAttribute("data-variant", "solid");
    await expect(own).toHaveAttribute("data-size", "sm");
  },
};
