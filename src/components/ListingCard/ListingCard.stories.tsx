import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import { ListingCard } from "./ListingCard";

const text = m.components.ListingCard.story;
const addToCart = fn();

// Inline illustration so the story needs no network or image file.
const image = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 320 180"><rect width="320" height="180" fill="#bae6fd"/><path d="M0 120 Q160 95 320 120 V180 H0 Z" fill="#38bdf8"/><path d="M110 120 L160 80 L210 120 Z" fill="#9a3412"/><rect x="122" y="118" width="76" height="40" fill="#fed7aa"/><rect x="152" y="132" width="16" height="26" fill="#7c2d12"/><path d="M0 160 Q160 140 320 160 V180 H0 Z" fill="#4d7c0f"/></svg>',
)}`;

const meta = {
  title: "Cards/ListingCard",
  component: ListingCard,
  parameters: docsParameters("ListingCard", { layout: "centered" }),
  args: {
    title: text.title,
    imageSrc: image,
    imageAlt: text.imageAlt,
    badge: text.badge,
    price: text.price,
    unit: text.unit,
    subtitle: text.subtitle,
    variant: "outline",
    colorScheme: "default",
    className: "w-80",
  },
  argTypes: docsArgTypes(
    "ListingCard",
    ["variant", "colorScheme", "className"],
    {
      title: { control: "text" },
      badge: { control: "text" },
      price: { control: "text" },
      unit: { control: "text" },
      subtitle: { control: "text" },
      imageSrc: { control: "text" },
      imageAlt: { table: { defaultValue: { summary: '""' } } },
      badgeProps: { control: false },
      children: { control: false },
      actions: { control: false },
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
    <ListingCard
      {...args}
      actions={
        <Button block onClick={addToCart}>
          {text.addToCart}
        </Button>
      }
    >
      {text.details.map((detail) => (
        <span key={detail}>{detail}</span>
      ))}
    </ListingCard>
  ),
} satisfies Meta<typeof ListingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await expect(
      canvas.getByRole("heading", { level: 3, name: text.title }),
    ).toBeVisible();
    // An empty imageAlt makes the image decorative.
    await expect(canvasElement.querySelector("img")).toHaveAttribute("alt", "");
    await expect(canvas.getByText(text.badge)).toBeVisible();
    await expect(canvas.getByText(text.price)).toHaveTextContent(
      `${text.price} /${text.unit}`,
    );
    await expect(canvas.getByText(text.subtitle)).toBeVisible();
    for (const detail of text.details) {
      await expect(canvas.getByText(detail)).toBeVisible();
    }
    addToCart.mockClear();
    await userEvent.click(canvas.getByRole("button", { name: text.addToCart }));
    await expect(addToCart).toHaveBeenCalledTimes(1);
  },
};

// Optional parts are left out when empty.
export const Minimal: Story = {
  tags: ["!dev"],
  args: { imageSrc: "", badge: "", price: "", subtitle: undefined },
  render: (args) => <ListingCard {...args} />,
  play: async ({ canvas, canvasElement }) => {
    await expect(
      canvas.getByRole("heading", { name: text.title }),
    ).toBeVisible();
    await expect(canvasElement.querySelector("img")).toBeNull();
    await expect(canvasElement.querySelector("[data-badge]")).toBeNull();
    await expect(canvas.queryByText(`/${text.unit}`)).toBeNull();
    await expect(canvasElement.querySelector("[data-card-footer]")).toBeNull();
  },
};
