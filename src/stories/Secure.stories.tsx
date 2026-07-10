import type { Meta, StoryObj } from "@storybook/react-vite";

import SecureComponent from "../components/Secure";

const meta = {
  title: "Secure",
  component: SecureComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays a fallback visually (e.g. a masked value) while the real content stays in the document for assistive technology, via Radix's VisuallyHidden.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    fallback: {
      control: "text",
      description: "Content shown visually in place of the real value.",
    },
    children: {
      control: "text",
      description:
        "The real content, hidden visually but present for screen readers.",
    },
    reveal: {
      control: "boolean",
      description:
        "Shows the real content visually instead of the fallback, e.g. for isAdmin or other permission-based use cases.",
    },
  },
  args: {
    fallback: "•••• •••• •••• 1234",
    children: "4242 4242 4242 1234",
    reveal: false,
  },
} satisfies Meta<typeof SecureComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Secure: Story = {};

export const Revealed: Story = {
  args: {
    reveal: true,
  },
};
