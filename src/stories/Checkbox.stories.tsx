import type { Meta, StoryObj } from "@storybook/react-vite";

import CheckboxComponent from "../components/Checkbox";

const meta = {
  title: "Inputs",
  component: CheckboxComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "An accessible checkbox with a custom indicator.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the checkbox styling.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "The size of the checkbox.",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Layout of the checkbox relative to its label.",
    },
    label: {
      control: "text",
      description: "Label rendered alongside the checkbox.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox.",
    },
    defaultChecked: {
      control: "boolean",
      description: "Whether the checkbox is checked by default.",
    },
  },
  args: {
    variant: "default",
    size: "md",
    orientation: "horizontal",
    label: "Accept terms and conditions",
    disabled: false,
    defaultChecked: false,
  },
} satisfies Meta<typeof CheckboxComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {};

export const VerticalOrientation: Story = {
  args: {
    orientation: "vertical",
  },
};
