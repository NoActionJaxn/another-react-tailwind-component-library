import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import { ListItem, UnorderedList } from "../List";
import {
  ListingBlock,
  ListingBlockActions,
  ListingBlockDetails,
  ListingBlockGallery,
  ListingBlockPrice,
  ListingBlockRating,
  ListingBlockSection,
  ListingBlockTitle,
} from "./ListingBlock";

const text = m.components.ListingBlock.story;

// Inline sneaker illustrations so the story needs no network or image files.
const shoe = (upper: string, sole: string, flip = false) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 100 100"><rect width="100" height="100" fill="#f5f5f4"/><g transform="${flip ? "translate(100 0) scale(-1 1)" : ""}"><path d="M14 62 C14 50 22 44 30 42 L44 30 C50 28 54 32 56 38 C62 44 74 46 84 50 C90 52 90 60 88 64 Z" fill="${upper}"/><path d="M12 62 H90 C90 68 86 70 80 70 H18 C14 70 12 68 12 62 Z" fill="${sole}"/><path d="M40 40 L48 48 M46 36 L54 44 M52 38 L58 45" stroke="#fff" stroke-width="2" stroke-linecap="round"/></g></svg>`,
  )}`;

const images = [
  { src: shoe("#e7e5e4", "#57534e"), alt: text.alts[0]! },
  { src: shoe("#2563eb", "#e7e5e4", true), alt: text.alts[1]! },
  { src: shoe("#d6d3d1", "#2563eb"), alt: text.alts[2]! },
  { src: shoe("#44403c", "#e7e5e4", true), alt: text.alts[3]! },
];

const meta = {
  title: "Blocks/ListingBlock",
  component: ListingBlock,
  parameters: docsParameters("ListingBlock", { layout: "fullscreen" }),
  args: {
    block: false,
    colorScheme: "default",
  },
  argTypes: docsArgTypes("ListingBlock", ["colorScheme", "block"], {
    block: { table: { defaultValue: { summary: "false" } } },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
  }),
  render: (args) => (
    <ListingBlock {...args}>
      <ListingBlockGallery images={images} />
      <ListingBlockDetails>
        <ListingBlockTitle>{text.title}</ListingBlockTitle>
        <ListingBlockRating value={4.5} count={text.reviews} />
        <ListingBlockPrice
          price="$159"
          originalPrice="$189"
          note={text.priceNote}
        />
        <ListingBlockSection title={text.aboutTitle}>
          <UnorderedList size="sm">
            {text.about.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </UnorderedList>
        </ListingBlockSection>
        <ListingBlockActions>
          <Button variant="soft" size="lg">
            {text.addToCart}
          </Button>
          <Button size="lg">{text.buyNow}</Button>
        </ListingBlockActions>
      </ListingBlockDetails>
    </ListingBlock>
  ),
} satisfies Meta<typeof ListingBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(
      canvas.getByRole("heading", { level: 1, name: text.title }),
    ).toBeVisible();
    await expect(canvas.getByRole("img", { name: text.alts[0] })).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Show image 2 of 4" }),
    );
    await expect(canvas.getByRole("img", { name: text.alts[1] })).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Show image 2 of 4" }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      canvas.getByRole("img", { name: "Rated 4.5 out of 5" }),
    ).toBeVisible();
    await expect(canvas.getByText(text.reviews)).toBeVisible();
    await expect(
      canvas.getByRole("heading", { level: 2, name: text.aboutTitle }),
    ).toBeVisible();
  },
};

// Ratings are clamped to 0…max, and the filled part matches the value.
export const Rating: Story = {
  tags: ["!dev"],
  render: () => (
    <>
      <ListingBlockRating value={7} />
      <ListingBlockRating
        value={3}
        max={4}
        label={(value, max) => `${value}/${max}`}
      />
    </>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("img", { name: "Rated 5 out of 5" }),
    ).toBeVisible();
    const custom = canvas.getByRole("img", { name: "3/4" });
    await expect(
      custom.querySelector<HTMLElement>("[style]")!.style.width,
    ).toBe("75%");
  },
};

export const Price: Story = {
  tags: ["!dev"],
  render: () => <ListingBlockPrice price="$159" originalPrice="$189" />,
  play: async ({ canvasElement }) => {
    // The old price is struck through as a deletion.
    await expect(canvasElement.querySelector("del")).toHaveTextContent("$189");
    await expect(canvasElement).toHaveTextContent("$159");
  },
};

// A single image needs no thumbnails; defaultIndex picks the first shown.
export const Gallery: Story = {
  tags: ["!dev"],
  render: () => (
    <>
      <ListingBlockGallery data-testid="single" images={images.slice(0, 1)} />
      <ListingBlockGallery
        data-testid="many"
        images={images}
        defaultIndex={2}
      />
    </>
  ),
  play: async ({ canvas }) => {
    await expect(
      within(canvas.getByTestId("single")).queryByRole("button"),
    ).toBeNull();
    const many = within(canvas.getByTestId("many"));
    await expect(many.getByRole("img", { name: text.alts[2] })).toBeVisible();
    await expect(
      many.getByRole("button", { name: "Show image 3 of 4" }),
    ).toHaveAttribute("aria-pressed", "true");
  },
};
