import { CheckIcon } from "@radix-ui/react-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { PriceCard } from "./PriceCard";

const text = m.components.PriceCard.story;

const meta = {
  title: "Cards/PriceCard",
  component: PriceCard,
  parameters: docsParameters("PriceCard", { layout: "centered" }),
  args: {
    title: text.title,
    badge: text.badge,
    price: text.price,
    unit: text.unit,
    buttonLabel: text.buttonLabel,
    buttonProps: { onClick: fn() },
    variant: "outline",
    colorScheme: "default",
    className: "w-80",
  },
  argTypes: docsArgTypes("PriceCard", ["variant", "colorScheme", "className"], {
    title: { control: "text" },
    badge: { control: "text" },
    price: { control: "text" },
    unit: { control: "text" },
    buttonLabel: { control: "text" },
    badgeProps: { control: false },
    buttonProps: { control: false },
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
  }),
  render: (args) => (
    <PriceCard {...args}>
      <ul className="flex flex-col gap-2">
        {text.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <CheckIcon aria-hidden className="shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </PriceCard>
  ),
} satisfies Meta<typeof PriceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas }) => {
    await expect(
      canvas.getByRole("heading", { level: 3, name: text.title }),
    ).toBeVisible();
    await expect(canvas.getByText(text.badge)).toBeVisible();
    await expect(canvas.getByText(text.price).parentElement).toHaveTextContent(
      `${text.price}/${text.unit}`,
    );
    await expect(canvas.getAllByRole("listitem")).toHaveLength(
      text.features.length,
    );
    const button = canvas.getByRole("button", { name: text.buttonLabel });
    button.click();
    await expect(args.buttonProps!.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Minimal: Story = {
  tags: ["!dev"],
  args: { badge: undefined, unit: undefined },
  render: (args) => <PriceCard {...args} />,
  play: async ({ canvas, canvasElement }) => {
    await expect(canvasElement.querySelector("[data-badge]")).toBeNull();
    await expect(canvas.getByText(text.price).parentElement).toHaveTextContent(
      text.price,
      { normalizeWhitespace: true },
    );
    await expect(canvas.queryByText(/\//)).toBeNull();
    await expect(
      canvasElement.querySelector("[data-card-description]"),
    ).toBeNull();
  },
};
