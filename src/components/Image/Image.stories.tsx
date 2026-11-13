import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Image } from "./Image";

// Inline gradient so the story needs no network or image file.
const src = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#a8a29e"/><stop offset="1" stop-color="#44403c"/></linearGradient></defs><rect width="16" height="9" fill="url(#g)"/></svg>',
)}`;

const meta = {
  title: "Components/Image",
  component: Image,
  parameters: docsParameters("Image", { layout: "centered" }),
  args: {
    src,
    alt: m.components.Image.story.alt,
    variant: "ghost",
    fit: "cover",
    aspectRatio: "16 / 9",
    colorScheme: "default",
    className: "w-80",
  },
  argTypes: docsArgTypes("Image", ["variant", "colorScheme"], {
    fallback: {
      control: false,
      table: { defaultValue: { summary: "ImageIcon" } },
    },
    variant: {
      control: "inline-radio",
      options: ["ghost", "outline"],
      table: { defaultValue: { summary: "ghost" } },
    },
    fit: {
      control: "inline-radio",
      options: ["cover", "contain", "fill", "none", "scale-down"],
      table: { defaultValue: { summary: "cover" } },
    },
    aspectRatio: { control: "text" },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
  }),
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
