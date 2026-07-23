import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import BadgeComponent from "../components/Badge";

const meta = {
  title: "Components/Badge",
  component: BadgeComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `A small pill used to label or highlight status, category, or metadata.

**States & classes** (see \`styles/components/badge.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-badge\` | root element, always | shape, padding, border |
| \`.another-badge[data-variant="default"]\` | \`variant="default"\` | background, text color |
| \`.another-badge[data-variant="secondary"]\` | \`variant="secondary"\` | background, text color |
| \`.another-badge[data-variant="destructive"]\` | \`variant="destructive"\` | background, text color |
| \`.another-badge[data-variant="outline"]\` | \`variant="outline"\` | border, text color |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "secondary", "destructive", "outline"],
      description: "Visual variant used by the badge styling.",
    },
    children: {
      control: "text",
      description: "Content rendered inside the badge.",
    },
  },
  args: {
    variant: "default",
    children: "New",
  },
} satisfies Meta<typeof BadgeComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Badge: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("New")).toBeInTheDocument();
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <BadgeComponent variant="default">Default</BadgeComponent>
      <BadgeComponent variant="secondary">Secondary</BadgeComponent>
      <BadgeComponent variant="destructive">Destructive</BadgeComponent>
      <BadgeComponent variant="outline">Outline</BadgeComponent>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Default")).toBeInTheDocument();
    await expect(canvas.getByText("Secondary")).toBeInTheDocument();
    await expect(canvas.getByText("Destructive")).toBeInTheDocument();
    await expect(canvas.getByText("Outline")).toBeInTheDocument();
  },
};
