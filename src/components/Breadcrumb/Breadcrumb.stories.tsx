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
  play: async ({ canvas }) => {
    const nav = canvas.getByRole("navigation", { name: "Breadcrumb" });
    await expect(nav.querySelectorAll("[data-breadcrumb-item]")).toHaveLength(
      4,
    );
    await expect(canvas.getByText(text.items[3]!)).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};
