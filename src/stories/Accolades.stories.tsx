import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import AccoladesComponent from "../components/Accolades";

const meta = {
  title: "Components/Accolades",
  component: AccoladesComponent,
  parameters: {
    docs: {
      description: {
        component: `A single-row strip of press mentions, awards, or ratings that auto-slides and loops seamlessly. Items snap into place, and autoplay pauses on hover (desktop) or touch (mobile) so visitors can scroll or swipe through manually.

**States & classes** (see \`styles/components/accolades.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-accolades[data-variant="default"]\` | \`variant="default"\` | text color |
| \`.another-accolades-viewport\` | root scroll container, always | layout, spacing, scrollbar hiding |
| \`.another-accolades-item\` | each item, always | layout |`,
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
      description: "Visual variant used by the accolades styling.",
    },
    speed: {
      control: { type: "number", min: 10, max: 200, step: 10 },
      description: "Auto-slide speed in pixels per second.",
    },
    items: {
      control: false,
      description: "Elements rendered as each accolade item.",
    },
  },
  args: {
    className: "",
    as: "section",
    variant: "default",
    speed: 40,
  },
} satisfies Meta<typeof AccoladesComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const badge = (label: string) => (
  <span className="h-36 rounded-sm border-2 border-default-300 px-4 py-2 text-sm font-semibold whitespace-nowrap text-default-600">
    {label}
  </span>
);

const items = [
  badge("★★★★★ 4.9/5 on G2"),
  badge("Featured in TechCrunch"),
  badge("Y Combinator S24"),
  badge("#1 Product of the Day"),
  badge("SOC 2 Type II Certified"),
  badge("99.99% Uptime SLA"),
];

export const Accolades: Story = {
  render: (args) => (
    <div className="w-full resize-x overflow-auto border-2 border-dashed border-default-400">
      <AccoladesComponent {...args} items={items} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The component renders each item twice (the second copy marked
    // aria-hidden/inert) to make the auto-scroll loop seamless.
    const [visible, hidden] = canvas.getAllByText("Featured in TechCrunch");

    expect(visible.closest(".another-accolades-item")).toHaveAttribute(
      "aria-hidden",
      "false",
    );
    expect(hidden.closest(".another-accolades-item")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  },
};
