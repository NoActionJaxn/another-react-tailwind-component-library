import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import PricingComponent from "../components/Pricing";
import PriceCard from "../components/PriceCard.tsx";
import Badge from "../components/Badge.tsx";
import Button from "../components/Button.tsx";

const meta = {
  title: "Components/Pricing",
  component: PricingComponent,
  parameters: {
    docs: {
      description: {
        component: `A section wrapper for a pricing table, built on the Container component. Renders an optional eyebrow/title/description heading above a responsive grid, and lays out any children (typically several \`PriceCard\`s) in that grid - one column by default, expanding at wider container widths.

**States & classes** (see \`styles/components/pricing.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-pricing[data-variant="default"]\` | \`variant="default"\` | background, text color |
| \`.another-pricing-eyebrow\` | eyebrow label, always | text color |
| \`.another-pricing-description\` | supporting copy, always | text color |
| \`.another-pricing-grid\` | the card grid, always | columns, gap |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: false,
      description: "The element rendered.",
    },
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the pricing section styling.",
    },
    eyebrow: {
      control: "text",
      description: "Small label rendered above the title.",
    },
    title: {
      control: "text",
      description: "The section's headline.",
    },
    description: {
      control: "text",
      description: "Supporting copy under the title.",
    },
  },
  args: {
    as: "section",
    variant: "default",
    eyebrow: "Pricing",
    title: "Plans for teams of every size",
    description:
      "Simple, transparent pricing that scales with you. Cancel anytime.",
  },
} satisfies Meta<typeof PricingComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pricing: Story = {
  render: (args) => (
    <div className="w-full resize-x overflow-auto border-2 border-dashed border-default-400">
      <PricingComponent {...args}>
        <PriceCard
          name="Starter"
          price="$9"
          period="/month"
          description="For individuals just getting started."
          features={["1 project", "1 team member", "Community support"]}
          footer={
            <Button block variant="outline">
              Get started
            </Button>
          }
        />
        <PriceCard
          variant="featured"
          name="Pro"
          price="$29"
          period="/month"
          description="For growing teams that need more room to work."
          badge={<Badge variant="secondary">Most popular</Badge>}
          features={[
            "Unlimited projects",
            "Up to 20 team members",
            "Priority support",
          ]}
          footer={<Button block>Get started</Button>}
        />
        <PriceCard
          name="Enterprise"
          price="Custom"
          description="For organizations with advanced needs."
          features={[
            "Unlimited everything",
            "SSO & audit logs",
            "Dedicated support",
          ]}
          footer={
            <Button block variant="outline">
              Contact sales
            </Button>
          }
        />
      </PricingComponent>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", { name: "Plans for teams of every size" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", { name: "Starter" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", { name: "Pro" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", { name: "Enterprise" }),
    ).toBeInTheDocument();
    await expect(canvas.getByText("Most popular")).toBeInTheDocument();
    await expect(
      canvas.getAllByRole("button", { name: "Get started" }),
    ).toHaveLength(2);
  },
};
