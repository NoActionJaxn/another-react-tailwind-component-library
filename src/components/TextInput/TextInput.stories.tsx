import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import {
  EnvelopeClosedIcon,
  Link2Icon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import { TextInput } from "./TextInput";

const icons: Record<string, ReactNode> = {
  none: undefined,
  search: <MagnifyingGlassIcon aria-hidden />,
  mail: <EnvelopeClosedIcon aria-hidden />,
  link: <Link2Icon aria-hidden />,
};

const iconControl = {
  control: { type: "select", labels: m.common.icons },
  options: Object.keys(icons),
  mapping: icons,
} as const;

const meta = {
  title: "Components/TextInput",
  component: TextInput,
  parameters: docsParameters("TextInput", { layout: "centered" }),
  args: {
    type: "text",
    variant: "outline",
    size: "md",
    colorScheme: "default",
    placeholder: m.components.TextInput.story.placeholder,
    disabled: false,
    prependElement: "none",
    appendElement: "none",
    "aria-label": m.components.TextInput.story.ariaLabel,
  },
  argTypes: docsArgTypes(
    "TextInput",
    ["variant", "size", "colorScheme", "disabled"],
    {
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
        table: { defaultValue: { summary: m.common.defaults.inherited } },
      },
      disabled: { table: { defaultValue: { summary: "false" } } },
      prependElement: iconControl,
      appendElement: iconControl,
    },
  ),
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
