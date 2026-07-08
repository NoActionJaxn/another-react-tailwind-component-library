import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../components/button";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Button content",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "outline", "ghost", "link"],
      description: "Visual button style",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
    },
    block: {
      control: "boolean",
      description: "Make the button full width",
    },
    icon: {
      control: "boolean",
      description: "Render the button as a square",
    },
    className: {
      control: "text",
      description: "Additional Tailwind classes",
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      description: "Button type attribute",
    },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "md",
    disabled: false,
    type: "button",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Icon: Story = {
  args: {
    children: "🔥",
    icon: true,
  },
};
