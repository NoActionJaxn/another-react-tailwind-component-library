import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";

const meta = {
  title: "Overlays/Tooltip",
  component: TooltipContent,
  parameters: docsParameters("Tooltip", { layout: "centered" }),
  args: {
    showArrow: true,
    sideOffset: 4,
    side: "top",
    colorScheme: "default",
    children: m.components.Tooltip.story.content,
  },
  argTypes: docsArgTypes("Tooltip", [{ colorScheme: "portalColorScheme" }], {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    side: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
    },
  }),
  render: (args) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            {m.components.Tooltip.story.trigger}
          </Button>
        </TooltipTrigger>
        <TooltipContent {...args} />
      </Tooltip>
    </TooltipProvider>
  ),
} satisfies Meta<typeof TooltipContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = m.components.Tooltip.story;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: text.trigger });
    await expect(screen.queryByRole("tooltip")).toBeNull();
    // Keyboard focus shows it at once.
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    const tooltip = await screen.findByRole("tooltip");
    await expect(tooltip).toHaveTextContent(text.content);
    // The trigger is described by the tooltip.
    await expect(trigger).toHaveAccessibleDescription(text.content);
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());

    // Hovering shows it after the provider's delay.
    await userEvent.hover(trigger);
    await expect(
      await screen.findByRole("tooltip", undefined, { timeout: 2000 }),
    ).toHaveTextContent(text.content);
    await userEvent.unhover(trigger);
    await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());
  },
};
