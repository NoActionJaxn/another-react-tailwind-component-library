import type { Meta, StoryObj } from "@storybook/react-vite";

import AccordionComponent from "../components/Accordion";

const meta = {
  title: "Ui/Accordion",
  component: AccordionComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A vertically stacked set of collapsible sections built on Radix's Accordion primitive. Content height is animated using Radix's --radix-accordion-content-height variable, so it expands and collapses smoothly rather than snapping open.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the accordion styling.",
    },
    multiple: {
      control: "boolean",
      description:
        "When true, multiple items can be open at once. When false, opening an item closes any other open item.",
    },
  },
  args: {
    variant: "default",
    multiple: false,
  },
} satisfies Meta<typeof AccordionComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = [
  {
    title: "What is a container query?",
    content:
      "A container query lets an element respond to the size of its nearest sized ancestor instead of the viewport, so a component looks right whether it's in a sidebar, a modal, or full width.",
  },
  {
    title: "Does this library support dark mode?",
    content:
      "Theming is driven by the default color scale in theme.css. Swap the palette tokens there to restyle every component at once.",
  },
  {
    title: "Can I open more than one item at a time?",
    content:
      "Yes, set the multiple prop to true. By default the accordion behaves as a single-open, collapsible group.",
  },
];

export const Accordion: Story = {
  render: (args) => (
    <div className="w-md">
      <AccordionComponent {...args} items={items} />
    </div>
  ),
};

export const Multiple: Story = {
  args: {
    multiple: true,
  },
  render: (args) => (
    <div className="w-md">
      <AccordionComponent {...args} items={items} />
    </div>
  ),
};
