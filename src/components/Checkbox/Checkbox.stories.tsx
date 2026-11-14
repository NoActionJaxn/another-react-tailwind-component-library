import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { expect, fn } from "storybook/test";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Forms/Checkbox",
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
      indeterminateIcon: { control: false },
      icon: { control: false },
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

const label = m.components.Checkbox.story.label;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox", { name: label });
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenLastCalledWith(true);
    // The label toggles it too.
    await userEvent.click(canvas.getByText(label));
    await expect(checkbox).not.toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenLastCalledWith(false);
    await userEvent.keyboard(" ");
    await expect(checkbox).toBeChecked();
  },
};

export const Indeterminate: Story = {
  tags: ["!dev"],
  args: { defaultChecked: "indeterminate" },
  play: async ({ args, canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox", { name: label });
    await expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    await expect(checkbox).toBePartiallyChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenLastCalledWith(true);
  },
};

// A checkbox in a form submits its value when checked.
export const InForm: Story = {
  tags: ["!dev"],
  args: { name: "terms", value: "yes" },
  render: (args) => (
    <form>
      <Checkbox {...args} />
    </form>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const form = canvasElement.querySelector("form")!;
    await expect(new FormData(form).get("terms")).toBeNull();
    await userEvent.click(canvas.getByRole("checkbox"));
    await expect(new FormData(form).get("terms")).toBe("yes");
  },
};

export const Disabled: Story = {
  tags: ["!dev"],
  args: { disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox", { name: label });
    await expect(checkbox).toBeDisabled();
    await userEvent.click(checkbox);
    await userEvent.click(canvas.getByText(label));
    await expect(checkbox).not.toBeChecked();
    await expect(args.onCheckedChange).not.toHaveBeenCalled();
  },
};

export const WithoutLabel: Story = {
  tags: ["!dev"],
  args: { label: undefined, "aria-label": label },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole("checkbox", { name: label })).toBeVisible();
    await expect(canvasElement.querySelector("label")).toBeNull();
  },
};
