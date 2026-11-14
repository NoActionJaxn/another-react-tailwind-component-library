import type { Meta, StoryObj } from "@storybook/react-vite";
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

export const Default: Story = {};
