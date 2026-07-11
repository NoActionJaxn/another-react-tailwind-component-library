import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import RadioGroupComponent from "../components/RadioGroup";

const meta = {
  title: "Forms/Options",
  component: RadioGroupComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An accessible radio group that generates its options from an array of values, with list and grid layouts.",
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

    expect(medium).toBeChecked();
    expect(large).not.toBeChecked();

    await userEvent.click(large);

    expect(large).toBeChecked();
    expect(medium).not.toBeChecked();
    expect(args.onValueChange).toHaveBeenLastCalledWith("Large");
  },
};
