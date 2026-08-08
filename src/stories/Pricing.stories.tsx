import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import PricingComponent from "../components/Pricing";
import Badge from "../components/Badge.tsx";
import Button from "../components/Button.tsx";

const meta = {
  title: "Components/Pricing",
  component: PricingComponent,
  parameters: {
    docs: {
      description: {
        component: `A section wrapper for a pricing table, built on the Container component. Renders an optional eyebrow/title/description heading above a responsive grid, and lays out any children (typically several pricing tier cards) in that grid - one column by default, expanding at wider container widths.

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
        <article className="flex flex-col gap-4 border border-default-300 p-6">
          <h3 className="font-accent">Starter</h3>
          <p>
            <span>$9</span>
            <span>/month</span>
          </p>
          <p>For individuals just getting started.</p>
          <ul>
            <li>1 project</li>
            <li>1 team member</li>
            <li>Community support</li>
          </ul>
          <Button block variant="outline">
            Get started
          </Button>
        </article>
        <article className="flex flex-col gap-4 border border-default-300 p-6">
          <Badge variant="secondary">Most popular</Badge>
          <h3 className="font-accent">Pro</h3>
          <p>
            <span>$29</span>
            <span>/month</span>
          </p>
          <p>For growing teams that need more room to work.</p>
          <ul>
            <li>Unlimited projects</li>
            <li>Up to 20 team members</li>
            <li>Priority support</li>
          </ul>
          <Button block>Get started</Button>
        </article>
        <article className="flex flex-col gap-4 border border-default-300 p-6">
          <h3 className="font-accent">Enterprise</h3>
          <p>Custom</p>
          <p>For organizations with advanced needs.</p>
          <ul>
            <li>Unlimited everything</li>
            <li>SSO &amp; audit logs</li>
            <li>Dedicated support</li>
          </ul>
          <Button block variant="outline">
            Contact sales
          </Button>
        </article>
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
