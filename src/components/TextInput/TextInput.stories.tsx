import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { TextInput } from "./TextInput";

const Icon = ({ d }: { d: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden
  >
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const icons: Record<string, ReactNode> = {
  None: undefined,
  Search: <Icon d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm10 3-5-5" />,
  Mail: <Icon d="M3 6h18v12H3zM3 7l9 6 9-6" />,
  Link: (
    <Icon d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  ),
};

const meta = {
  title: "Components/TextInput",
  component: TextInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    type: "text",
    variant: "outline",
    size: "md",
    colorScheme: "default",
    placeholder: "Placeholder",
    disabled: false,
    prependElement: "None",
    appendElement: "None",
    "aria-label": "Text input",
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["text", "email", "search", "url"],
      table: { defaultValue: { summary: "text" } },
    },
    variant: {
      control: "inline-radio",
      options: ["outline", "soft", "ghost"],
      table: { defaultValue: { summary: "outline" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: "inherited from parent" } },
    },
    disabled: { table: { defaultValue: { summary: "false" } } },
    prependElement: {
      control: "select",
      options: Object.keys(icons),
      mapping: icons,
    },
    appendElement: {
      control: "select",
      options: Object.keys(icons),
      mapping: icons,
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
