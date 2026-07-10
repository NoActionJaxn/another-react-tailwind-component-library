import type { Meta, StoryObj } from "@storybook/react-vite";

import PasswordInputComponent from "../components/PasswordInput";

const meta = {
  title: "Forms/Inputs",
  component: PasswordInputComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A password input with a built-in show/hide toggle.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text shown when the input is empty.",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Input size.",
    },
    block: {
      control: "boolean",
      description: "Makes the component full width.",
    },
    variant: {
      control: "text",
      description: "Visual variant used by the input styling.",
    },
    label: {
      control: "text",
      description: "Label rendered alongside the input.",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Layout of the input relative to its label.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input and the show/hide toggle.",
    },
    disableShowPassword: {
      control: "boolean",
      description: "Removes the built-in show/hide toggle.",
    },
  },
  args: {
    placeholder: "Enter your password",
    size: "md",
    variant: "default",
    label: "Password",
    orientation: "vertical",
    block: false,
    disabled: false,
    disableShowPassword: false,
  },
} satisfies Meta<typeof PasswordInputComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PasswordInput: Story = {};
