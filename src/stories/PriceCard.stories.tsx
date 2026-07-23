import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import PriceCardComponent from "../components/PriceCard";
import Badge from "../components/Badge.tsx";
import Button from "../components/Button.tsx";

const meta = {
  title: "Cards/PriceCard",
  component: PriceCardComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `A card with name, price, period, description, features, badge, and footer slots, well suited to a pricing table tier. Pair several with \`Pricing\` for a full section.

**States & classes** (see \`styles/components/price-card.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-price-card\` | root element, always | border, shadow, transition |
| \`.another-price-card[data-variant="default"]\` | \`variant="default"\` | background, border, text color |
| \`.another-price-card[data-variant="featured"]\` | \`variant="featured"\` | accent border, shadow, badge color |
| \`.another-price-card-badge\` | badge slot, when passed | background, border |
| \`.another-price-card-amount\` | price amount, always | font size, weight |
| \`.another-price-card-period\` | billing period, when passed | text color |
| \`.another-price-card-feature svg\` | a feature's check icon, always | icon color, size |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "featured"],
      description:
        'Visual variant used by the card styling. Use "featured" to emphasize a recommended tier.',
    },
    name: {
      control: "text",
      description: "The plan's name.",
    },
    price: {
      control: "text",
      description: "The plan's price amount.",
    },
    period: {
      control: "text",
      description: "The billing period shown next to the price.",
    },
    description: {
      control: "text",
      description: "A short summary of who the plan is for.",
    },
    features: {
      control: false,
      description: "List of feature strings rendered with a check icon.",
    },
    badge: {
      control: false,
      description:
        "Element rendered in a banner above the card body, typically a Badge.",
    },
    footer: {
      control: false,
      description:
        "Element rendered as the card's footer, typically a CTA button.",
    },
  },
  args: {
    variant: "default",
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams that need more room to work.",
    features: [
      "Unlimited projects",
      "Up to 20 team members",
      "Priority support",
    ],
  },
} satisfies Meta<typeof PriceCardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PriceCard: Story = {
  render: (args) => (
    <div className="w-72">
      <PriceCardComponent
        {...args}
        footer={<Button block>Get started</Button>}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", { name: "Pro" }),
    ).toBeInTheDocument();
    await expect(canvas.getByText("$29")).toBeInTheDocument();
    await expect(canvas.getByText("/month")).toBeInTheDocument();
    await expect(
      canvas.getByText("For growing teams that need more room to work."),
    ).toBeInTheDocument();
    await expect(canvas.getByText("Unlimited projects")).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "Get started" }),
    ).toBeInTheDocument();
  },
};

export const Featured: Story = {
  args: {
    variant: "featured",
  },
  render: (args) => (
    <div className="w-72">
      <PriceCardComponent
        {...args}
        badge={<Badge variant="secondary">Most popular</Badge>}
        footer={<Button block>Get started</Button>}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Most popular")).toBeInTheDocument();
  },
};
