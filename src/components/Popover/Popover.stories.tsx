import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen, waitFor } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

const meta = {
  title: "Overlays/Popover",
  component: Popover,
  parameters: docsParameters("Popover", { layout: "centered" }),
  args: {},
  argTypes: docsArgTypes(
    "Popover",
    ["open", "defaultOpen", "onOpenChange", "modal"],
    {
      modal: { table: { defaultValue: { summary: "false" } } },
      defaultOpen: { table: { defaultValue: { summary: "false" } } },
    },
  ),
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline">{m.components.Popover.story.trigger}</Button>
      </PopoverTrigger>
      <PopoverContent>{m.components.Popover.story.content}</PopoverContent>
    </Popover>
  ),
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = m.components.Popover.story;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: text.trigger });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    // Portaled to <body>, outside the canvas.
    const popover = await screen.findByRole("dialog");
    await expect(popover).toHaveTextContent(text.content);
    await expect(popover).toHaveAttribute("data-popover-content");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Escape closes it and returns focus to the trigger.
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await expect(trigger).toHaveFocus();

    // So does a click outside.
    await userEvent.click(trigger);
    await screen.findByRole("dialog");
    await userEvent.click(document.body);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  },
};

export const OpenChange: Story = {
  tags: ["!dev"],
  args: { onOpenChange: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: text.trigger });
    await userEvent.click(trigger);
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(true);
    await userEvent.click(trigger);
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(false);
  },
};
