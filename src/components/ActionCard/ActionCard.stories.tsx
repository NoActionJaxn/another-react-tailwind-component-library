import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { CardDescription, CardHeader } from "../Card";
import { ActionCard, ActionCardImage } from "./ActionCard";

const text = m.components.ActionCard.story;

// Inline illustration so the story needs no network or image file.
const image = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 320 180"><rect width="320" height="180" fill="#bae6fd"/><circle cx="250" cy="45" r="22" fill="#fde68a"/><path d="M0 140 L70 60 L120 110 L170 50 L240 125 L320 70 V180 H0 Z" fill="#78716c"/><path d="M58 74 L70 60 L82 74 L74 70 L66 76 Z M158 64 L170 50 L182 64 L174 60 L166 66 Z" fill="#fafaf9"/><path d="M0 155 Q80 130 160 150 T320 145 V180 H0 Z" fill="#4d7c0f"/></svg>',
)}`;

const meta = {
  title: "Cards/ActionCard",
  component: ActionCard,
  parameters: docsParameters("ActionCard", { layout: "centered" }),
  args: {
    href: "",
    target: "",
    onClick: fn(),
    variant: "outline",
    colorScheme: "default",
    asChild: false,
    className: "w-80",
  },
  argTypes: docsArgTypes(
    "ActionCard",
    ["variant", "colorScheme", "className", "onClick"],
    {
      href: { control: "text" },
      target: { control: "text" },
      rel: { control: "text" },
      children: { control: false },
      asChild: { table: { defaultValue: { summary: "false" } } },
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
    <ActionCard {...args} href={args.href || undefined}>
      <ActionCardImage src={image} alt={text.imageAlt} />
      <CardHeader>{text.header}</CardHeader>
      <CardDescription>{text.description}</CardDescription>
    </ActionCard>
  ),
} satisfies Meta<typeof ActionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const card = canvas.getByRole("button");
    await userEvent.click(card);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    card.focus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};
