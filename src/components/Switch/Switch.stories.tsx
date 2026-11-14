import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Switch } from "./Switch";

const meta = {
  title: "Forms/Switch",
  component: Switch,
  parameters: docsParameters("Switch", { layout: "centered" }),
  args: {
    label: m.components.Switch.story.label,
    size: "md",
    colorScheme: "default",
    disabled: false,
  },
  argTypes: docsArgTypes(
    "Switch",
    ["label", "size", "colorScheme", "disabled"],
    {
      disabled: { table: { defaultValue: { summary: "false" } } },
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
      },
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    },
  ),
  render: (args) => <Switch {...args} />,
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

const label = m.components.Switch.story.label;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const control = canvas.getByRole("switch", { name: label });
    await expect(control).not.toBeChecked();
    await userEvent.click(control);
    await expect(control).toBeChecked();
    // The label toggles it too.
    await userEvent.click(canvas.getByText(label));
    await expect(control).not.toBeChecked();
    await userEvent.keyboard(" ");
    await expect(control).toBeChecked();
  },
};

export const CheckedChange: Story = {
  tags: ["!dev"],
  args: { defaultChecked: true, onCheckedChange: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const control = canvas.getByRole("switch", { name: label });
    await expect(control).toBeChecked();
    await userEvent.click(control);
    await expect(args.onCheckedChange).toHaveBeenLastCalledWith(false);
  },
};

export const Disabled: Story = {
  tags: ["!dev"],
  args: { disabled: true, onCheckedChange: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const control = canvas.getByRole("switch", { name: label });
    await expect(control).toBeDisabled();
    await userEvent.click(control);
    await expect(control).not.toBeChecked();
    await expect(args.onCheckedChange).not.toHaveBeenCalled();
  },
};
