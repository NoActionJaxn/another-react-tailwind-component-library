import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import AnchorComponent from "../components/Anchor";

const meta = {
  title: "Components/Anchor",
  component: AnchorComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `A link styled to match the Button link variant, rendered as an <a> by default.

**States & classes** (see \`styles/components/anchor.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-anchor\` | root element, always | text color, underline, focus ring |
| \`.another-anchor:hover\` | hovering | text color |
| \`.another-anchor:disabled\`, \`.another-anchor[aria-disabled="true"]\` | disabled | pointer events, opacity |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: false,
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

export const Anchor: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Learn more" });

    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "#");
  },
};

export const Disabled: Story = {
  args: {
    "aria-disabled": true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Learn more" });

    expect(link).toHaveAttribute("aria-disabled", "true");
  },
};
