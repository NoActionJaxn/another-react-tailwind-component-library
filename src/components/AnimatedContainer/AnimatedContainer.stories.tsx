import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { docsArgTypes, docsParameters, format, m } from "../../docs/i18n";
import { GridContainer } from "../GridContainer";
import { AnimatedContainer } from "./AnimatedContainer";

const meta = {
  title: "Containers/AnimatedContainer",
  component: AnimatedContainer,
  parameters: docsParameters("AnimatedContainer", { layout: "padded" }),
  args: {
    colorScheme: "default",
    animation: "fade",
    duration: 300,
    stagger: true,
    staggerDelay: 100,
    asChild: true,
  },
  argTypes: docsArgTypes(
    "AnimatedContainer",
    ["colorScheme", { asChild: "layoutAsChild" }],
    {
      animation: {
        control: "inline-radio",
        options: ["fade", "pop"],
        table: { defaultValue: { summary: "fade" } },
      },
      duration: { table: { defaultValue: { summary: "300" } } },
      stagger: { table: { defaultValue: { summary: "false" } } },
      staggerDelay: { table: { defaultValue: { summary: "100" } } },
      asChild: { table: { defaultValue: { summary: "false" } } },
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
        table: { defaultValue: { summary: m.common.defaults.inherited } },
      },
    },
  ),
  // The key remounts the container so each control change replays the animation.
  render: (args) => (
    <AnimatedContainer key={JSON.stringify(args)} {...args}>
      <GridContainer columns={3} gap="md">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="rounded-md bg-default-200 px-4 py-6 text-sm text-default-900"
          >
            {format(m.common.layout.item, { n })}
          </div>
        ))}
      </GridContainer>
    </AnimatedContainer>
  ),
} satisfies Meta<typeof AnimatedContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector("[data-animated-container]");
    // asChild: the grid itself is the animated container.
    await expect(container).toHaveAttribute("data-grid-container");
    await expect(container).toHaveAttribute("data-stagger");
    await waitFor(() => expect(container).toHaveAttribute("data-in-view"));
  },
};

// Animates only once scrolled into view.
export const BelowTheFold: Story = {
  tags: ["!dev"],
  args: { asChild: false, stagger: false },
  render: (args) => (
    <div>
      <div style={{ height: "200vh" }} />
      <AnimatedContainer {...args}>
        {format(m.common.layout.item, { n: 1 })}
      </AnimatedContainer>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector("[data-animated-container]")!;
    await expect(container).not.toHaveAttribute("data-stagger");
    await new Promise((resolve) => setTimeout(resolve, 100));
    await expect(container).not.toHaveAttribute("data-in-view");
    container.scrollIntoView();
    await waitFor(() => expect(container).toHaveAttribute("data-in-view"));
    // Stays in view once shown, even when scrolled away again.
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 100));
    await expect(container).toHaveAttribute("data-in-view");
  },
};
