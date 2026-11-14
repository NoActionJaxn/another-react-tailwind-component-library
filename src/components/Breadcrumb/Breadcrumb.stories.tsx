import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronRightIcon, HomeIcon, SlashIcon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "./Breadcrumb";

const text = m.components.Breadcrumb.story;

const separators: Record<string, ReactNode> = {
  chevron: <ChevronRightIcon />,
  slash: <SlashIcon />,
  text: "/",
};

const meta = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  parameters: docsParameters("Breadcrumb", { layout: "centered" }),
  args: {
    size: "md",
    separator: "chevron",
    maxItems: 0,
    expandLabel: "Show all breadcrumbs",
    colorScheme: "default",
    "aria-label": "Breadcrumb",
  },
  argTypes: docsArgTypes(
    "Breadcrumb",
    ["size", "colorScheme", { "aria-label": "ariaLabel" }],
    {
      size: {
        control: "inline-radio",
        options: ["sm", "md", "lg"],
        table: { defaultValue: { summary: "md" } },
      },
      separator: {
        control: { type: "inline-radio", labels: text.separators },
        options: Object.keys(separators),
        mapping: separators,
        table: { defaultValue: { summary: "ChevronRightIcon" } },
      },
      maxItems: {
        control: { type: "number", min: 0, max: 5 },
        table: { defaultValue: { summary: m.common.defaults.notSet } },
      },
      expandLabel: {
        table: { defaultValue: { summary: "Show all breadcrumbs" } },
      },
      "aria-label": { table: { defaultValue: { summary: "Breadcrumb" } } },
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
        table: { defaultValue: { summary: m.common.defaults.inherited } },
      },
    },
  ),
  render: ({ maxItems, ...args }) => (
    <Breadcrumb {...args} maxItems={maxItems || undefined}>
      <BreadcrumbItem>
        <HomeIcon aria-hidden />
        <BreadcrumbLink href="#">{text.items[0]}</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">{text.items[1]}</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">{text.items[2]}</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbPage>{text.items[3]}</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, canvasElement }) => {
    const nav = canvas.getByRole("navigation", { name: "Breadcrumb" });
    await expect(canvas.getByRole("list")).toBeInTheDocument();
    await expect(nav.querySelectorAll("[data-breadcrumb-item]")).toHaveLength(
      4,
    );
    await expect(canvas.getAllByRole("listitem")).toHaveLength(4);
    // Separators sit between items and are hidden from assistive tech.
    const separators = canvasElement.querySelectorAll(
      'li[role="presentation"]',
    );
    await expect(separators).toHaveLength(3);
    for (const separator of separators) {
      await expect(separator).toHaveAttribute("aria-hidden", "true");
    }
    await expect(canvas.getAllByRole("link")).toHaveLength(3);
    await expect(canvas.getByText(text.items[3]!)).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};

// maxItems collapses the middle into a button that shows them all.
export const Collapsed: Story = {
  tags: ["!dev"],
  args: { maxItems: 3 },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(4);
    await expect(canvas.queryByText(text.items[1]!)).toBeNull();
    await expect(canvas.getByText(text.items[0]!)).toBeVisible();
    await expect(canvas.getByText(text.items[2]!)).toBeVisible();
    await expect(canvas.getByText(text.items[3]!)).toBeVisible();

    await userEvent.click(
      canvas.getByRole("button", { name: "Show all breadcrumbs" }),
    );
    await expect(canvas.queryByRole("button")).toBeNull();
    await expect(canvas.getAllByRole("link")).toHaveLength(3);
    // Focus moves to the first item the button revealed.
    await expect(
      canvas.getByRole("link", { name: text.items[1] }),
    ).toHaveFocus();
  },
};

// Not enough items to collapse: all are shown.
export const MaxItemsNotReached: Story = {
  tags: ["!dev"],
  args: { maxItems: 4 },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("button")).toBeNull();
    await expect(canvas.getAllByRole("link")).toHaveLength(3);
  },
};
