import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
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
  title: "Forms/TextInput",
  component: TextInput,
  parameters: docsParameters("TextInput", { layout: "centered" }),
  args: {
    type: "text",
    variant: "outline",
    size: "md",
    colorScheme: "default",
    placeholder: m.components.TextInput.story.placeholder,
    disabled: false,
    block: false,
    prependElement: "none",
    appendElement: "none",
    label: m.components.TextInput.story.label,
    labelPlacement: "top",
    required: false,
  },
  argTypes: docsArgTypes(
    "TextInput",
    [
      "variant",
      "size",
      "colorScheme",
      "disabled",
      "block",
      { "aria-label": "ariaLabel" },
    ],
    {
      label: { control: "text" },
      labelPlacement: {
        control: "inline-radio",
        options: ["top", "left", "border"],
        table: { defaultValue: { summary: "top" } },
      },
      required: { table: { defaultValue: { summary: "false" } } },
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
      block: { table: { defaultValue: { summary: "false" } } },
      prependElement: iconControl,
      appendElement: iconControl,
    },
  ),
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = m.components.TextInput.story;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: text.label });
    await expect(input).toHaveAttribute("type", "text");
    await expect(input).toHaveAttribute("placeholder", text.placeholder);
    await userEvent.type(input, "ada@example.com");
    await expect(input).toHaveValue("ada@example.com");
    // Clicking the label focuses the input.
    input.blur();
    await userEvent.click(canvas.getByText(text.label));
    await expect(input).toHaveFocus();
  },
};

// Clicking anywhere in the box, e.g. on an icon, focuses the input.
export const ClickIcon: Story = {
  tags: ["!dev"],
  args: { prependElement: "search", appendElement: "mail" },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const input = canvas.getByRole("textbox");
    const prepend = canvasElement.querySelector('[data-slot="prepend"]')!;
    const append = canvasElement.querySelector('[data-slot="append"]')!;
    await userEvent.click(prepend);
    await expect(input).toHaveFocus();
    input.blur();
    await userEvent.click(append);
    await expect(input).toHaveFocus();
  },
};

// Only text-like types are allowed; anything else falls back to "text".
export const UnsupportedType: Story = {
  tags: ["!dev"],
  args: { type: "password" as "text" },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText(text.label)).toHaveAttribute(
      "type",
      "text",
    );
  },
};

export const EmailType: Story = {
  tags: ["!dev"],
  args: { type: "email" },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText(text.label)).toHaveAttribute(
      "type",
      "email",
    );
  },
};

// The star is visual only: the input is required, and its name has no star.
export const Required: Story = {
  tags: ["!dev"],
  args: { required: true },
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: text.label });
    await expect(input).toBeRequired();
    await expect(canvas.getByText("*")).toHaveAttribute("aria-hidden", "true");
  },
};

export const Disabled: Story = {
  tags: ["!dev"],
  args: { disabled: true },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: text.label });
    await expect(input).toBeDisabled();
    await userEvent.type(input, "abc");
    await expect(input).toHaveValue("");
  },
};

export const WithoutLabel: Story = {
  tags: ["!dev"],
  args: { label: undefined, "aria-label": text.ariaLabel },
  play: async ({ canvas, canvasElement }) => {
    await expect(
      canvas.getByRole("textbox", { name: text.ariaLabel }),
    ).toBeVisible();
    await expect(canvasElement.querySelector("label")).toBeNull();
  },
};
