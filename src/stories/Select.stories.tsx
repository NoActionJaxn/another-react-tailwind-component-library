import type { Meta, StoryObj } from "@storybook/react-vite";

import SelectComponent from "../components/Select";

const meta = {
  title: "Forms/Inputs",
  component: SelectComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An accessible select, built on Radix UI, that generates its options from an array of values.",
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
    label: {
      control: "text",
      description: "Label rendered above the select.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder shown when no value is selected.",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Layout of the select relative to its label.",
    },
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the select styling.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "The size of the select.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the select.",
    },
  },
  args: {
    options: ["Small", "Medium", "Large", "Extra Large"],
    label: "Size",
    placeholder: "Select a size",
    orientation: "vertical",
    variant: "default",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof SelectComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Select: Story = {};

export const HorizontalSelect: Story = {
  args: {
    orientation: "horizontal",
  },
};
