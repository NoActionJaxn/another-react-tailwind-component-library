import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, within } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import { Banner } from "./Banner";

const text = m.components.Banner.story;

const meta = {
  title: "Feedback/Banner",
  component: Banner,
  parameters: docsParameters("Banner", { layout: "fullscreen" }),
  args: {
    variant: "solid",
    status: "info",
    colorScheme: undefined,
    sticky: false,
    dismissLabel: "Dismiss",
  },
  argTypes: docsArgTypes("Banner", ["colorScheme"], {
    variant: {
      control: "inline-radio",
      options: ["soft", "solid", "outline"],
      table: { defaultValue: { summary: "solid" } },
    },
    status: {
      control: "inline-radio",
      options: ["info", "success", "warning", "danger"],
    },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: {
        defaultValue: { summary: m.components.Alert.story.schemeDefault },
      },
    },
    sticky: { table: { defaultValue: { summary: "false" } } },
    icon: {
      control: false,
      table: {
        defaultValue: { summary: m.components.Alert.story.iconDefault },
      },
    },
    action: { control: false },
    onDismiss: { control: false },
    dismissLabel: { table: { defaultValue: { summary: "Dismiss" } } },
    role: {
      control: false,
      table: {
        defaultValue: { summary: m.components.Alert.story.roleDefault },
      },
    },
  }),
  render: function Render(args) {
    const [open, setOpen] = useState(true);
    return (
      <div className="min-h-40">
        {open ? (
          <Banner
            {...args}
            onDismiss={() => setOpen(false)}
            action={
              <a
                href="#"
                className="font-semibold underline underline-offset-2"
              >
                {text.action}
              </a>
            }
          >
            {text.message}
          </Banner>
        ) : (
          <div className="p-4">
            <Button onClick={() => setOpen(true)}>{text.showAgain}</Button>
          </div>
        )}
      </div>
    );
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const banner = canvas.getByRole("status");
    await expect(banner).toHaveTextContent(text.message);
    await expect(
      within(banner).getByRole("link", { name: text.action }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Dismiss" }));
    await expect(canvas.queryByRole("status")).toBeNull();
    await userEvent.click(canvas.getByRole("button", { name: text.showAgain }));
    await expect(canvas.getByRole("status")).toBeVisible();
  },
};

export const Urgent: Story = {
  tags: ["!dev"],
  args: { status: "warning" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toHaveTextContent(text.message);
  },
};

// Sticky banners stay at the top of the scrolling page.
export const Sticky: Story = {
  tags: ["!dev"],
  args: { sticky: true },
  play: async ({ canvas }) => {
    await expect(getComputedStyle(canvas.getByRole("status")).position).toBe(
      "sticky",
    );
  },
};

export const NotDismissible: Story = {
  tags: ["!dev"],
  render: (args) => <Banner {...args}>{text.message}</Banner>,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("status")).toBeVisible();
    await expect(canvas.queryByRole("button")).toBeNull();
  },
};
