import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen, waitFor, within } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Image } from "./Image";

// Inline gradient so the story needs no network or image file.
const src = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 320 180"><rect width="320" height="180" fill="#bae6fd"/><circle cx="250" cy="45" r="22" fill="#fde68a"/><path d="M0 140 L70 60 L120 110 L170 50 L240 125 L320 70 V180 H0 Z" fill="#78716c"/><path d="M58 74 L70 60 L82 74 L74 70 L66 76 Z M158 64 L170 50 L182 64 L174 60 L166 66 Z" fill="#fafaf9"/><path d="M0 155 Q80 130 160 150 T320 145 V180 H0 Z" fill="#4d7c0f"/></svg>',
)}`;

const meta = {
  title: "Data Display/Image",
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
    zoomOnHover: true,
    openInDialog: false,
    openLabel: "Open image",
    closeLabel: "Close",
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
    zoomOnHover: { table: { defaultValue: { summary: "false" } } },
    openInDialog: { table: { defaultValue: { summary: "false" } } },
    dialogSrc: { control: "text" },
    openLabel: { table: { defaultValue: { summary: "Open image" } } },
    closeLabel: { table: { defaultValue: { summary: "Close" } } },
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

const alt = m.components.Image.story.alt;

export const Default: Story = {
  play: async ({ canvas }) => {
    const image = canvas.getByRole("img", { name: alt });
    await expect(image.tagName).toBe("IMG");
    await expect(image).toHaveAttribute("src", src);
    await expect(canvas.queryByRole("button")).toBeNull();
  },
};

// A broken image shows the fallback, named by alt, and still calls onError.
export const BrokenImage: Story = {
  tags: ["!dev"],
  args: { src: "/missing-image.png", onError: fn() },
  play: async ({ args, canvas, canvasElement }) => {
    await waitFor(() =>
      expect(canvasElement.querySelector("[data-fallback]")).not.toBeNull(),
    );
    const fallback = canvas.getByRole("img", { name: alt });
    await expect(fallback.tagName).toBe("DIV");
    await expect(args.onError).toHaveBeenCalledTimes(1);
  },
};

// With no alt the fallback is decorative.
export const DecorativeFallback: Story = {
  tags: ["!dev"],
  args: { src: undefined, alt: "" },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.queryByRole("img")).toBeNull();
    await expect(
      canvasElement.querySelector("[data-fallback]"),
    ).toHaveAttribute("aria-hidden", "true");
  },
};

export const OpenInDialog: Story = {
  tags: ["!dev"],
  args: { openInDialog: true, dialogSrc: `${src}#large` },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: alt });
    await userEvent.click(button);
    const dialog = await screen.findByRole("dialog", { name: alt });
    // The dialog shows dialogSrc when given.
    await expect(
      within(dialog).getByRole("img", { name: alt }),
    ).toHaveAttribute("src", `${src}#large`);
    await userEvent.click(
      within(dialog).getByRole("button", { name: "Close" }),
    );
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await expect(button).toHaveFocus();
  },
};

// Without alt, the open button and dialog fall back to openLabel.
export const OpenInDialogNoAlt: Story = {
  tags: ["!dev"],
  args: { openInDialog: true, alt: "", openLabel: "Enlarge" },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Enlarge" }));
    await expect(
      await screen.findByRole("dialog", { name: "Enlarge" }),
    ).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  },
};
