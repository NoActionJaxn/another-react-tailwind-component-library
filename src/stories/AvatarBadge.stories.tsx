import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import AvatarBadgeComponent from "../components/AvatarBadge";

const meta = {
  title: "Components/AvatarBadge",
  component: AvatarBadgeComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Pairs the Avatar component with a small notification-count bubble in the corner, for things like an unread-messages indicator on a user menu trigger. Accepts every Avatar prop plus \`count\`; the bubble is omitted entirely when \`count\` is \`0\` or unset.

**States & classes** (see \`styles/components/avatar-badge.css\`, and **Retheming Components** for how to target these; the embedded avatar uses **Avatar**'s own classes):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-avatar-badge\` | root element, always | positioning context for the count bubble |
| \`.another-avatar-badge-count\` | \`count\` is a positive number | bubble shape, color, ring |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: { type: "number", min: 0 },
      description:
        "Notification count shown in a bubble over the avatar's corner. Omitted (no bubble) when 0 or unset.",
    },
    src: {
      control: "text",
      description: "Image source URL, forwarded to Avatar.",
    },
    fallback: {
      control: "text",
      description: "Fallback content, forwarded to Avatar.",
    },
    size: {
      control: "radio",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description: "The size of the underlying avatar.",
    },
  },
  args: {
    count: 3,
    src: undefined,
    fallback: "JH",
    size: "md",
  },
} satisfies Meta<typeof AvatarBadgeComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AvatarBadge: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("JH")).toBeInTheDocument();
    await expect(canvas.getByText("3")).toBeInTheDocument();
  },
};

export const NoCount: Story = {
  args: {
    count: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("JH")).toBeInTheDocument();
    await expect(canvas.queryByText("0")).not.toBeInTheDocument();
  },
};
