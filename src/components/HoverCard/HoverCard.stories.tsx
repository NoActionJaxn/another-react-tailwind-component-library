import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen, waitFor } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Avatar, AvatarFallback } from "../Avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";

const meta = {
  title: "Overlays/HoverCard",
  component: HoverCard,
  parameters: docsParameters("HoverCard", { layout: "centered" }),
  args: {},
  argTypes: docsArgTypes(
    "HoverCard",
    ["open", "defaultOpen", "onOpenChange", "openDelay", "closeDelay"],
    {
      closeDelay: { table: { defaultValue: { summary: "300" } } },
      openDelay: { table: { defaultValue: { summary: "700" } } },
      defaultOpen: { table: { defaultValue: { summary: "false" } } },
    },
  ),
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger
        href="#"
        className="text-sm font-medium underline underline-offset-4"
      >
        {m.components.HoverCard.story.trigger}
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>
              {m.components.HoverCard.story.fallback}
            </AvatarFallback>
          </Avatar>
          <p>{m.components.HoverCard.story.content}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = m.components.HoverCard.story;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("link", { name: text.trigger });
    await userEvent.hover(trigger);
    await expect(
      await screen.findByText(text.content, undefined, { timeout: 2000 }),
    ).toBeInTheDocument();
    await userEvent.unhover(trigger);
    await waitFor(() => expect(screen.queryByText(text.content)).toBeNull(), {
      timeout: 2000,
    });
  },
};

export const NoDelay: Story = {
  tags: ["!dev"],
  args: { openDelay: 0, closeDelay: 0 },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("link", { name: text.trigger });
    await expect(screen.queryByText(text.content)).toBeNull();
    await userEvent.hover(trigger);
    const card = await screen.findByText(text.content);
    await expect(card.closest("[data-hover-card-content]")).not.toBeNull();
    await userEvent.unhover(trigger);
    await waitFor(() => expect(screen.queryByText(text.content)).toBeNull());
    // Keyboard focus opens it too.
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await expect(await screen.findByText(text.content)).toBeInTheDocument();
  },
};

// Waits for openDelay before opening.
export const OpenDelay: Story = {
  tags: ["!dev"],
  args: { openDelay: 400, onOpenChange: fn() },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.hover(canvas.getByRole("link", { name: text.trigger }));
    await new Promise((resolve) => setTimeout(resolve, 150));
    await expect(screen.queryByText(text.content)).toBeNull();
    await expect(
      await screen.findByText(text.content, undefined, { timeout: 2000 }),
    ).toBeInTheDocument();
    await expect(args.onOpenChange).toHaveBeenCalledWith(true);
  },
};
