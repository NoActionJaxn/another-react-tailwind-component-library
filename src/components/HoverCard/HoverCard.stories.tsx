import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarFallback } from "../Avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";

const meta = {
  title: "Components/HoverCard",
  component: HoverCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {},
  argTypes: {},
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger
        href="#"
        className="text-sm font-medium underline underline-offset-4"
      >
        @radix-ui
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <p>Unstyled, accessible components for React.</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
