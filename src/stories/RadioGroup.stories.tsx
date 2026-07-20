import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import RadioGroupComponent from "../components/RadioGroup";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroupComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `An accessible radio group that generates its options from an array of values, with list and grid layouts.

**States & classes** (see \`styles/components/radio-group.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-radio-group[data-view="grid"]\` | \`view="grid"\` | grid columns |
| \`.another-radio\` | each radio, always | shape, border, focus ring |
| \`.another-radio:disabled\` | disabled | opacity |
| \`.another-radio-indicator\` | the filled dot, always | background |
| \`.another-radio[data-variant="default"]\` | \`variant="default"\` | border, background |
| \`.another-radio[data-variant="default"]:not(:disabled):hover\` | hovering, not disabled | background |
| \`.another-radio[data-variant="default"][data-state="checked"]\` | checked | background, border |
| \`.another-radio[data-size="sm"\\|"md"\\|"lg"]\` | \`size\` prop | radio and indicator size |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: "object",
      description:
        "Values used to auto-generate options. Accepts strings or { value, label } objects.",
    },
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the radio styling.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "The size of each radio.",
    },
    view: {
      control: "radio",
      options: ["list", "grid"],
      description: "Layout of the options.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the entire radio group.",
    },
  },
  args: {
    options: ["Small", "Medium", "Large", "Extra Large"],
    variant: "default",
    size: "md",
    view: "list",
    defaultValue: "Medium",
    disabled: false,
    onValueChange: fn(),
  },
} satisfies Meta<typeof RadioGroupComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RadioGroup: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const medium = canvas.getByRole("radio", { name: "Medium" });
    const large = canvas.getByRole("radio", { name: "Large" });

    await expect(medium).toBeChecked();
    await expect(large).not.toBeChecked();

    await userEvent.click(large);

    await expect(large).toBeChecked();
    await expect(medium).not.toBeChecked();
    await expect(args.onValueChange).toHaveBeenLastCalledWith("Large");
  },
};
