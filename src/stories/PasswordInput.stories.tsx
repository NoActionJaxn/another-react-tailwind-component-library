import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fireEvent, within } from "storybook/test";

import PasswordInputComponent from "../components/PasswordInput";

const meta = {
  title: "Components/PasswordInput",
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

export const PasswordInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Password");
    const toggle = canvas.getByRole("button", { name: "Show password" });

    expect(input).toHaveAttribute("type", "password");

    // It's a press-and-hold control (onMouseDown shows, onMouseUp hides),
    // not a click-to-toggle - fireEvent lets us observe the held state,
    // which userEvent.click's rapid down+up sequence wouldn't.
    await fireEvent.mouseDown(toggle);
    expect(input).toHaveAttribute("type", "text");

    await fireEvent.mouseUp(toggle);
    expect(input).toHaveAttribute("type", "password");
  },
};
