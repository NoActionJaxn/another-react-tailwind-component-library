import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import AnimatedContainerComponent from "../components/AnimatedContainer";

const items = Array.from({ length: 6 }, (_, index) => index + 1);

const meta = {
  title: "Components/AnimatedContainer",
  component: AnimatedContainerComponent,
  parameters: {
    docs: {
      description: {
        component: `Wraps each direct child in its own entrance animation, played on mount. Children can all animate in together or one at a time.

**States & classes** (see \`styles/components/animated-container.css\`, and **Retheming Components** for how to target these). No colors of its own - purely animation:

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-animated-container-item\` | wrapper rendered around each child, always | fill mode, timing function |
| \`.another-animated-container-item[data-animation="fade"]\` | \`animation="fade"\` | opacity keyframes |
| \`.another-animated-container-item[data-animation="pop"]\` | \`animation="pop"\` | opacity + scale keyframes |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: false,
      description: "The element rendered.",
    },
    animation: {
      control: "radio",
      options: ["fade", "pop"],
      description: "The entrance animation played for each child.",
    },
    duration: {
      control: { type: "number", min: 100, max: 2000, step: 50 },
      description: "Animation duration in milliseconds, per child.",
    },
    stagger: {
      control: "boolean",
      description: "Animates children one at a time instead of all at once.",
    },
    staggerDelay: {
      control: { type: "number", min: 0, max: 1000, step: 50 },
      description:
        "Delay in milliseconds between each child's start when stagger is enabled.",
    },
    children: {
      control: false,
      description: "The elements to animate in, one per direct child.",
    },
  },
  args: {
    as: "div",
    animation: "fade",
    duration: 300,
    stagger: false,
    staggerDelay: 100,
  },
} satisfies Meta<typeof AnimatedContainerComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AnimatedContainer: Story = {
  render: (args) => (
    <AnimatedContainerComponent {...args} className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item} className="rounded-sm bg-default-100 p-6 text-center">
          {item}
        </div>
      ))}
    </AnimatedContainerComponent>
  ),
  play: async ({ canvasElement }) => {
    const itemEls = canvasElement.querySelectorAll(
      ".another-animated-container-item",
    );

    expect(itemEls).toHaveLength(6);
    itemEls.forEach((item) => {
      expect(item).toHaveAttribute("data-animation", "fade");
    });
  },
};

export const Staggered: Story = {
  args: {
    animation: "pop",
    stagger: true,
  },
  render: (args) => (
    <AnimatedContainerComponent {...args} className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item} className="rounded-sm bg-default-100 p-6 text-center">
          {item}
        </div>
      ))}
    </AnimatedContainerComponent>
  ),
  play: async ({ canvasElement }) => {
    const itemEls = Array.from(
      canvasElement.querySelectorAll<HTMLElement>(
        ".another-animated-container-item",
      ),
    );

    expect(itemEls[0].style.animationDelay).toBe("0ms");
    expect(itemEls[1].style.animationDelay).toBe("100ms");
    expect(itemEls[2].style.animationDelay).toBe("200ms");
  },
};
