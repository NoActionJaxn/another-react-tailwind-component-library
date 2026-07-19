import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import CollapsibleComponent from "../components/Collapsible";

const meta = {
  title: "Components/Collapsible",
  component: CollapsibleComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `A single collapsible section built on Radix's Collapsible primitive, animated the same way as Accordion: content height is driven by Radix's --radix-collapsible-content-height variable so it expands and collapses smoothly. Use this for a standalone disclosure; use Accordion for a group of them.

**States & classes** (see \`styles/components/collapsible.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-collapsible[data-variant="default"]\` | \`variant="default"\` | text color |
| \`.another-collapsible-trigger\` | trigger, always | layout, typography, focus ring |
| \`.another-collapsible-trigger:not([data-disabled]):hover\` | hovering, not disabled | text color |
| \`.another-collapsible-trigger[data-disabled]\` | disabled | cursor, opacity |
| \`.another-collapsible-icon\` | chevron icon, always | size, rotation transition |
| \`.another-collapsible-trigger[data-state="open"] .another-collapsible-icon\` | open | icon rotation |
| \`.another-collapsible-content[data-state="open"\\|"closed"]\` | opening/closing | expand/collapse animation |
| \`.another-collapsible-content-inner\` | content wrapper, always | text color, spacing |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the collapsible styling.",
    },
    title: {
      control: "text",
      description: "The trigger's label.",
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the content is expanded on initial render.",
    },
    disabled: {
      control: "boolean",
      description: "Prevents the trigger from being toggled.",
    },
  },
  args: {
    variant: "default",
    title: "What's included",
    defaultOpen: false,
    disabled: false,
  },
} satisfies Meta<typeof CollapsibleComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Collapsible: Story = {
  render: (args) => (
    <div className="w-md">
      <CollapsibleComponent {...args}>
        Every component ships with a Storybook story, a scoped CSS file, and
        full keyboard and screen reader support via Radix primitives.
      </CollapsibleComponent>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "What's included" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
    title: "Shipping details",
  },
  render: (args) => (
    <div className="w-md">
      <CollapsibleComponent {...args}>
        Orders placed before 2pm ship the same day. International orders may
        take an additional 3-5 business days to arrive.
      </CollapsibleComponent>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Shipping details" });

    expect(trigger).toHaveAttribute("aria-expanded", "true");
  },
};
