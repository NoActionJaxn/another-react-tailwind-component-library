import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import CheckboxComponent from "../components/Checkbox";

const meta = {
  title: "Components/Checkbox",
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
    reverse: {
      control: "boolean",
      description: "Reverses the flex direction of the checkbox and label.",
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
    reverse: false,
    label: "Accept terms and conditions",
    disabled: false,
    defaultChecked: false,
  },
} satisfies Meta<typeof CheckboxComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", {
      name: "Accept terms and conditions",
    });

    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  },
};
