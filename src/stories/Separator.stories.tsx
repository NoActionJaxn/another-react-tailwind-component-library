import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import SeparatorComponent, {
  type SeparatorProps,
} from "../components/Separator";

const meta = {
  title: "Components/Separator",
  component: SeparatorComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `An accessible visual divider, built on Radix UI.

**States & classes** (see \`styles/components/separator.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-separator[data-variant="default"]\` | \`variant="default"\` | background |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator.",
    },
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the separator styling.",
    },
    decorative: {
      control: "boolean",
      description:
        "Whether the separator is purely decorative and removed from the accessibility tree.",
    },
  },
  args: {
    orientation: "horizontal",
    variant: "default",
    decorative: true,
  },
} satisfies Meta<typeof SeparatorComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

// A vertical separator is h-full/w-px (see separator.css) - it needs a
// wrapper with an actual height and a row layout to show up at all, while
// horizontal needs a column layout instead. Branching on args.orientation
// here means toggling the control between the two stays viewable, rather
// than only working for whichever orientation a story's render was built for.
const render = (args: SeparatorProps) =>
  args.orientation === "vertical" ? (
    <div className="flex h-16 items-center gap-4">
      <span>Left</span>
      <SeparatorComponent {...args} />
      <span>Right</span>
    </div>
  ) : (
    <div className="flex w-48 flex-col gap-4">
      <span>Above</span>
      <SeparatorComponent {...args} />
      <span>Below</span>
    </div>
  );

export const Separator: Story = {
  render,
  play: async ({ canvasElement }) => {
    // decorative=true (the default) removes the separator from the a11y
    // tree, so it can't be queried by role - fall back to its own class.
    const separator = canvasElement.querySelector(".another-separator");

    await expect(separator).toHaveAttribute("data-orientation", "horizontal");
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render,
  play: async ({ canvasElement }) => {
    const separator = canvasElement.querySelector(".another-separator");

    await expect(separator).toHaveAttribute("data-orientation", "vertical");
  },
};
