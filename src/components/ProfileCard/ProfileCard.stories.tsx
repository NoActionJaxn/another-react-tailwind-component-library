import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import { ProfileCard } from "./ProfileCard";

const text = m.components.ProfileCard.story;

const meta = {
  title: "Cards/ProfileCard",
  component: ProfileCard,
  parameters: docsParameters("ProfileCard", { layout: "centered" }),
  args: {
    name: text.name,
    subtitle: text.subtitle,
    avatarSrc: "",
    avatarAlt: "",
    avatarFallback: "",
    variant: "outline",
    colorScheme: "default",
    className: "w-72",
  },
  argTypes: docsArgTypes(
    "ProfileCard",
    ["variant", "colorScheme", "className"],
    {
      name: { control: "text" },
      subtitle: { control: "text" },
      avatarSrc: { control: "text" },
      avatarFallback: {
        control: "text",
        table: {
          defaultValue: { summary: m.components.ProfileCard.defaults.fallback },
        },
      },
      avatarAlt: { table: { defaultValue: { summary: '""' } } },
      avatarProps: { control: false },
      actions: { control: false },
      children: { control: false },
      variant: {
        control: "inline-radio",
        options: ["outline", "soft", "ghost"],
        table: { defaultValue: { summary: "outline" } },
      },
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
        table: { defaultValue: { summary: m.common.defaults.inherited } },
      },
    },
  ),
  render: (args) => (
    <ProfileCard
      {...args}
      avatarFallback={args.avatarFallback || undefined}
      actions={
        <>
          <Button size="sm">{text.follow}</Button>
          <Button size="sm" variant="outline">
            {text.message}
          </Button>
        </>
      }
    >
      {text.bio}
    </ProfileCard>
  ),
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
