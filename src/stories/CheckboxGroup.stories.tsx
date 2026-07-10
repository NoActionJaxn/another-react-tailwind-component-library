import type { Meta, StoryObj } from "@storybook/react-vite";

import CheckboxGroupComponent from "../components/CheckboxGroup";

const meta = {
  title: "Inputs",
  component: CheckboxGroupComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An accessible group of checkboxes, built from the Checkbox component, that reports the checked values as an array. Supports list and grid layouts.",
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
      description: "Visual variant used by the checkbox styling.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "The size of each checkbox.",
    },
    view: {
      control: "radio",
      options: ["list", "grid"],
      description: "Layout of the options.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the entire checkbox group.",
    },
  },
  args: {
    options: ["Small", "Medium", "Large", "Extra Large"],
    variant: "default",
    size: "md",
    view: "list",
    defaultValue: ["Medium"],
    disabled: false,
  },
} satisfies Meta<typeof CheckboxGroupComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckboxGroup: Story = {};
