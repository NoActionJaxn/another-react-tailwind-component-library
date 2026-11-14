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
    await expect(card).toHaveTextContent(text.header);
    await userEvent.click(card);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    // A focusable button: Enter and Space activate it.
    await expect(card).toHaveAttribute("tabindex", "0");
    card.focus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(2);
    await userEvent.keyboard(" ");
    await expect(args.onClick).toHaveBeenCalledTimes(3);
  },
};

// onKeyDown can cancel the keyboard activation.
export const KeyDownPrevented: Story = {
  tags: ["!dev"],
  args: { onKeyDown: (event) => event.preventDefault() },
  play: async ({ args, canvas, userEvent }) => {
    canvas.getByRole("button").focus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

// With href, the card is a link.
export const Link: Story = {
  tags: ["!dev"],
  args: { href: "#alps", target: "_blank", rel: "noopener" },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("button")).toBeNull();
    const link = canvas.getByRole("link");
    await expect(link).toHaveAttribute("href", "#alps");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener");
    await expect(link).toHaveAttribute("data-action-card");
  },
};

// asChild: the child (e.g. a router link) becomes the card.
export const AsChild: Story = {
  tags: ["!dev"],
  args: { asChild: true },
  render: (args) => (
    <ActionCard {...args}>
      <a href="#child">
        <CardHeader>{text.header}</CardHeader>
      </a>
    </ActionCard>
  ),
  play: async ({ canvas, canvasElement }) => {
    const link = canvas.getByRole("link", { name: text.header });
    await expect(link).toHaveAttribute("href", "#child");
    await expect(link).toHaveAttribute("data-card");
    await expect(canvasElement.querySelectorAll("a")).toHaveLength(1);
  },
};
