import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import SecureComponent from "../components/Secure";

const meta = {
  title: "Components/Secure",
  component: SecureComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Displays a fallback visually (e.g. a masked value) while the real content stays in the document for assistive technology, via Radix's VisuallyHidden.

**States & classes** (see \`styles/components/secure.css\`): \`.another-secure\` is layout-only (\`inline-flex items-center\`) - no colors or variants to retheme.`,
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

export const Secure: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The fallback is shown visually (aria-hidden, but still queryable by
    // text) while the real value stays in the DOM for assistive tech via
    // VisuallyHidden, rather than being omitted entirely.
    const fallback = canvas.getByText("•••• •••• •••• 1234");
    const real = canvas.getByText("4242 4242 4242 1234");

    expect(fallback).toHaveAttribute("aria-hidden", "true");
    expect(real).toBeInTheDocument();
  },
};

export const Revealed: Story = {
  args: {
    reveal: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("4242 4242 4242 1234")).toBeInTheDocument();
    expect(canvas.queryByText("•••• •••• •••• 1234")).not.toBeInTheDocument();
  },
};
