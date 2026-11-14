import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import poster from "../Video/sample-poster.jpg?url";
import video from "../Video/sample.webm?url";
import { ImageGallery, type ImageGalleryItem } from "./ImageGallery";

const text = m.components.ImageGallery.story;

// Inline illustrations so the story needs no network or image files.
const scene = (sky: string, hill: string, sun: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 120 90"><rect width="120" height="90" fill="${sky}"/><circle cx="90" cy="25" r="10" fill="${sun}"/><path d="M0 70 Q30 45 60 65 T120 60 V90 H0 Z" fill="${hill}"/></svg>`,
  )}`;

const items: ImageGalleryItem[] = [
  { src: scene("#bae6fd", "#4d7c0f", "#fde68a"), alt: text.alts[0] },
  { src: scene("#fed7aa", "#9a3412", "#fef3c7"), alt: text.alts[1] },
  { type: "video", src: video, poster, label: text.videoLabel },
  { src: scene("#1e1b4b", "#312e81", "#e0e7ff"), alt: text.alts[2] },
  { src: scene("#d9f99d", "#166534", "#fef9c3"), alt: text.alts[3] },
  { src: scene("#fbcfe8", "#831843", "#fff1f2"), alt: text.alts[4] },
];

const meta = {
  title: "Blocks/ImageGallery",
  component: ImageGallery,
  parameters: docsParameters("ImageGallery", { layout: "padded" }),
  args: {
    items,
    columns: 3,
    minColumnWidth: "10rem",
    aspectRatio: "4 / 3",
    zoomOnHover: true,
    colorScheme: "default",
    closeLabel: "Close",
    previousLabel: "Previous",
    nextLabel: "Next",
  },
  argTypes: docsArgTypes("ImageGallery", ["colorScheme"], {
    items: { control: false },
    columns: { control: "number", table: { defaultValue: { summary: "3" } } },
    minColumnWidth: {
      control: "text",
      table: { defaultValue: { summary: "10rem" } },
    },
    aspectRatio: {
      control: "text",
      table: { defaultValue: { summary: "4 / 3" } },
    },
    zoomOnHover: { table: { defaultValue: { summary: "true" } } },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
    closeLabel: { table: { defaultValue: { summary: "Close" } } },
    previousLabel: { table: { defaultValue: { summary: "Previous" } } },
    nextLabel: { table: { defaultValue: { summary: "Next" } } },
  }),
} satisfies Meta<typeof ImageGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: text.alts[0] }));
    const dialog = await screen.findByRole("dialog", { name: text.alts[0] });
    await expect(dialog).toHaveTextContent("1 / 6");
    await userEvent.keyboard("{ArrowRight}");
    await expect(
      await screen.findByRole("dialog", { name: text.alts[1] }),
    ).toHaveTextContent("2 / 6");
    // Wraps around from the first item to the last.
    await userEvent.click(screen.getByRole("button", { name: "Previous" }));
    await userEvent.click(screen.getByRole("button", { name: "Previous" }));
    await expect(screen.getByRole("dialog")).toHaveTextContent("6 / 6");
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  },
};

// Videos open in the lightbox with controls.
export const VideoItem: Story = {
  tags: ["!dev"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: text.videoLabel }),
    );
    const dialog = await screen.findByRole("dialog");
    const player = dialog.querySelector("video")!;
    await expect(player).toHaveAttribute("aria-label", text.videoLabel);
    await expect(player).toHaveAttribute("controls");
    await expect(dialog).toHaveTextContent("3 / 6");
    // ArrowLeft steps back.
    await userEvent.keyboard("{ArrowLeft}");
    await expect(
      await screen.findByRole("dialog", { name: text.alts[1] }),
    ).toHaveTextContent("2 / 6");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  },
};

// A single item has nothing to step through.
export const SingleItem: Story = {
  tags: ["!dev"],
  args: { items: items.slice(0, 1) },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: text.alts[0] }));
    await screen.findByRole("dialog", { name: text.alts[0] });
    await expect(screen.queryByRole("button", { name: "Next" })).toBeNull();
    await expect(screen.queryByRole("button", { name: "Previous" })).toBeNull();
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  },
};
