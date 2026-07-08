import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../components/Button";

const meta = {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible button component that can render as a native button, anchor, or custom element while preserving your shared styling API.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    asChild: {
      control: false,
      description:
        "Forward the button styles and props onto a single child element instead of rendering a wrapper button.",
    },
    children: {
      control: "text",
      description: "The content rendered inside the button or link.",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "outline", "ghost", "link"],
      description: "Visual style variant of the component.",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the component.",
    },
    disabled: {
      control: "boolean",
      description: "Disables interaction for button-like rendering.",
    },
    block: {
      control: "boolean",
      description: "Makes the component full width.",
    },
    icon: {
      control: "boolean",
      description:
        "Renders the component as a square icon-like button when appropriate.",
    },
    className: {
      control: "text",
      description: "Additional Tailwind classes to append.",
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      description:
        "Native button type attribute. Only used when rendering a button.",
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

export const DefaultButton: Story = {};

export const IconButton: Story = {
  args: {
    children: "🔥",
    icon: true,
  },
};

export const AnchorButton: Story = {
  args: {
    asChild: true,
    children: "Learn more",
    variant: "link",
  },
  render: ({ children, ...rest }) => {
    return (
      <Button {...rest}>
        <a href="https://google.com/" target="_blank">
          {children}
        </a>
      </Button>
    );
  },
};
