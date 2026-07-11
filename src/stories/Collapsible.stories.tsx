import type { Meta, StoryObj } from "@storybook/react-vite";

import CollapsibleComponent from "../components/Collapsible";

const meta = {
  title: "Ui/Collapsible",
  component: CollapsibleComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A single collapsible section built on Radix's Collapsible primitive, animated the same way as Accordion: content height is driven by Radix's --radix-collapsible-content-height variable so it expands and collapses smoothly. Use this for a standalone disclosure; use Accordion for a group of them.",
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
};
