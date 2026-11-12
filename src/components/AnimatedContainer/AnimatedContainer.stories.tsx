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
    await waitFor(() => expect(container).toHaveAttribute("data-in-view"));
  },
};
