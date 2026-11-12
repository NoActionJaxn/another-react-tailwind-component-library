import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: docsParameters("Avatar", { layout: "centered" }),
  args: { size: "md", colorScheme: "default" },
  argTypes: docsArgTypes("Avatar", ["size", "colorScheme"], {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  }),
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage alt="" />
      <AvatarFallback>{m.components.Avatar.story.fallback}</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
