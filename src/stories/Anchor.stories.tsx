import type { Meta, StoryObj } from "@storybook/react-vite";

import AnchorComponent from "../components/Anchor";

const meta = {
  title: "Ui/Anchor",
  component: AnchorComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A link styled to match the Button link variant, rendered as an <a> by default.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "radio",
      options: ["a", "span"],
      description: "The element rendered.",
    },
    href: {
      control: "text",
      description: "The link destination.",
    },
    children: {
      control: "text",
      description: "The link text.",
    },
  },
  args: {
    as: "a",
    href: "#",
    children: "Learn more",
  },
} satisfies Meta<typeof AnchorComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Anchor: Story = {};

export const Disabled: Story = {
  args: {
    "aria-disabled": true,
  },
};
