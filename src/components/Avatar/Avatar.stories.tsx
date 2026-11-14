import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

const meta = {
  title: "Data Display/Avatar",
  component: Avatar,
  parameters: docsParameters("Avatar", { layout: "centered" }),
  args: {
    size: "md",
    colorScheme: "default",
    badge: true,
    badgeContent: "",
    badgeLabel: m.components.Avatar.story.badge,
    badgePosition: "bottom-end",
  },
  argTypes: docsArgTypes("Avatar", ["size", "colorScheme"], {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    badge: { table: { defaultValue: { summary: "false" } } },
    badgeContent: { control: "text" },
    badgePosition: {
      control: "inline-radio",
      options: ["top-end", "bottom-end", "top-start", "bottom-start"],
      table: { defaultValue: { summary: "bottom-end" } },
    },
  }),
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage alt="" />
      <AvatarFallback>{m.components.Avatar.story.fallback}</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = m.components.Avatar.story;

// No image source: the fallback shows instead.
export const Default: Story = {
  play: async ({ canvas, canvasElement }) => {
    await expect(await canvas.findByText(text.fallback)).toBeVisible();
    await expect(canvasElement.querySelector("img")).toBeNull();
    // An empty badgeContent is a dot, named by badgeLabel.
    const badge = canvas.getByRole("status", { name: text.badge });
    await expect(badge).toBeEmptyDOMElement();
    await expect(badge).toHaveAttribute("data-position", "bottom-end");
  },
};

const pixel =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1'/%3E%3C/svg%3E";

// Once the image loads, it replaces the fallback.
export const WithImage: Story = {
  tags: ["!dev"],
  args: { badge: false },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={pixel} alt={text.fallback} />
      <AvatarFallback>{text.fallback}</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByRole("img", { name: text.fallback }),
    ).toBeVisible();
    await expect(canvas.queryByText(text.fallback)).toBeNull();
    await expect(canvas.queryByRole("status")).toBeNull();
  },
};

export const BrokenImage: Story = {
  tags: ["!dev"],
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/missing-avatar.png" alt="" />
      <AvatarFallback>{text.fallback}</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvas }) => {
    await expect(await canvas.findByText(text.fallback)).toBeVisible();
  },
};

export const BadgeCount: Story = {
  tags: ["!dev"],
  args: { badgeContent: 3, badgeLabel: undefined, badgePosition: "top-end" },
  play: async ({ canvasElement }) => {
    const badge = canvasElement.querySelector("[data-avatar-badge]");
    await expect(badge).toHaveTextContent("3");
    await expect(badge).toHaveAttribute("data-position", "top-end");
    // Without a label it isn't announced as a status.
    await expect(badge).not.toHaveAttribute("role");
  },
};
