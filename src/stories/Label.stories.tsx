import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import LabelComponent from "../components/Label";

const meta = {
  title: "Forms/Text",
  component: LabelComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "An accessible label for form controls.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    htmlFor: {
      control: "text",
      description: "The id of the form control this label is associated with.",
    },
    children: {
      control: "text",
      description: "The label text.",
    },
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the label styling.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "The size of the label text.",
    },
  },
  args: {
    htmlFor: "email",
    children: "Email address",
    variant: "default",
  },
} satisfies Meta<typeof LabelComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Label: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText("Email address");

    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveAttribute("for", "email");
  },
};
