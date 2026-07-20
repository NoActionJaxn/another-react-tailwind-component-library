import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import AccordionComponent from "../components/Accordion";

const meta = {
  title: "Components/Accordion",
  component: AccordionComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `A vertically stacked set of collapsible sections built on Radix's Accordion primitive. Content height is animated using Radix's --radix-accordion-content-height variable, so it expands and collapses smoothly rather than snapping open.

**States & classes** (see \`styles/components/accordion.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-accordion[data-variant="default"]\` | \`variant="default"\` | text color |
| \`.another-accordion-item\` | each item, always | border |
| \`.another-accordion-trigger\` | each item's trigger, always | layout, typography, focus ring |
| \`.another-accordion-trigger:not([data-disabled]):hover\` | hovering, not disabled | text color |
| \`.another-accordion-trigger[data-disabled]\` | item disabled | cursor, opacity |
| \`.another-accordion-icon\` | chevron icon, always | size, rotation transition |
| \`.another-accordion-trigger[data-state="open"] .another-accordion-icon\` | item open | icon rotation |
| \`.another-accordion-content[data-state="open"\\|"closed"]\` | opening/closing | expand/collapse animation |
| \`.another-accordion-content-inner\` | content wrapper, always | text color, spacing |`,
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole("button", {
      name: "What is a container query?",
    });
    const second = canvas.getByRole("button", {
      name: "Does this library support dark mode?",
    });

    await expect(first).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(first);
    await expect(first).toHaveAttribute("aria-expanded", "true");

    // Single (non-multiple) mode: opening another item closes the first.
    await userEvent.click(second);
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(first).toHaveAttribute("aria-expanded", "false");
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole("button", {
      name: "What is a container query?",
    });
    const second = canvas.getByRole("button", {
      name: "Does this library support dark mode?",
    });

    await userEvent.click(first);
    await userEvent.click(second);

    // multiple=true: both stay open at once.
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await expect(second).toHaveAttribute("aria-expanded", "true");
  },
};
