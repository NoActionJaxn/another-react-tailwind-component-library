import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  EnvelopeClosedIcon,
  Link2Icon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import { TextInput } from "./TextInput";

const icons: Record<string, ReactNode> = {
  None: undefined,
  Search: <MagnifyingGlassIcon aria-hidden />,
  Mail: <EnvelopeClosedIcon aria-hidden />,
  Link: <Link2Icon aria-hidden />,
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
