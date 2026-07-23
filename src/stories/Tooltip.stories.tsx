import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

import TooltipComponent from "../components/Tooltip";
import Button from "../components/Button";

const meta = {
  title: "Components/Tooltip",
  component: TooltipComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `A hover/focus-triggered tooltip. Self-contained (wraps its own Radix \`Provider\`), so it doesn't require any app-level setup - just drop it in wherever a trigger needs a hint.

**States & classes** (see \`styles/components/tooltip.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-tooltip-content\` | the tooltip bubble, always | shape, border, shadow |
| \`.another-tooltip-content[data-variant="default"]\` | \`variant="default"\` | background, text color |
| \`.another-tooltip-arrow\` | the pointer arrow, always | fill color |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      control: false,
      description: "Element that opens the tooltip on hover or focus.",
    },
    children: {
      control: "text",
      description: "Content rendered inside the tooltip.",
    },
    delayDuration: {
      control: "number",
      description:
        "The duration from when the pointer enters the trigger until the tooltip gets opened.",
    },
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the tooltip styling.",
    },
  },
  args: {
    children: "Saved to your account",
    delayDuration: 0,
    variant: "default",
    trigger: null,
  },
} satisfies Meta<typeof TooltipComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tooltip: Story = {
  render: (args) => (
    <TooltipComponent {...args} trigger={<Button>Hover me</Button>} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Hover me" });

    // Radix renders the tooltip text twice (the visible bubble plus a
    // visually-hidden span carrying role="tooltip" for accessibility) -
    // query by that role instead of by text to get a single match.
    await expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    await userEvent.hover(trigger);
    await waitFor(() =>
      expect(screen.getByRole("tooltip")).toHaveTextContent(
        "Saved to your account",
      ),
    );

    await userEvent.unhover(trigger);
    await waitFor(() =>
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument(),
    );
  },
};
