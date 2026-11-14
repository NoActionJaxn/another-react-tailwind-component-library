import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
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

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { level: 3, name: text.name }),
    ).toBeVisible();
    // No avatar image: the fallback shows the name's initials.
    await expect(await canvas.findByText("JL")).toBeVisible();
    await expect(canvas.getByText(text.subtitle)).toBeVisible();
    await expect(canvas.getByText(text.bio)).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: text.follow }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: text.message }),
    ).toBeVisible();
  },
};

export const CustomFallback: Story = {
  tags: ["!dev"],
  args: { avatarFallback: "★" },
  play: async ({ canvas }) => {
    await expect(await canvas.findByText("★")).toBeVisible();
    await expect(canvas.queryByText("JL")).toBeNull();
  },
};

// Initials use the first two words only.
export const LongName: Story = {
  tags: ["!dev"],
  args: { name: "mary  ann evans" },
  play: async ({ canvas }) => {
    await expect(await canvas.findByText("MA")).toBeVisible();
  },
};
