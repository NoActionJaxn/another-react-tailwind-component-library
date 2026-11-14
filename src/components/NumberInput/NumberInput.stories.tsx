import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MinusIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { expect } from "storybook/test";
import type { ReactNode } from "react";
import { NumberInput } from "./NumberInput";

const text = m.components.NumberInput.story;

// Stepper icons: the default chevrons, or custom ones.
const icons: Record<string, ReactNode> = {
  chevron: undefined,
  plus: <PlusIcon aria-hidden />,
  minus: <MinusIcon aria-hidden />,
  arrowUp: <ArrowUpIcon aria-hidden />,
  arrowDown: <ArrowDownIcon aria-hidden />,
};

const iconControl = {
  control: { type: "select", labels: text.icons },
  options: Object.keys(icons),
  mapping: icons,
  table: { defaultValue: { summary: text.defaultIcon } },
} as const;

const meta = {
  title: "Forms/NumberInput",
  component: NumberInput,
  parameters: docsParameters("NumberInput", { layout: "centered" }),
  args: {
    defaultValue: 1,
    min: 0,
    max: 10,
    step: 1,
    variant: "outline",
    size: "md",
    colorScheme: "default",
    placeholder: text.placeholder,
    disabled: false,
    block: false,
    incrementIcon: "chevron",
    decrementIcon: "chevron",
    incrementLabel: "Increase",
    decrementLabel: "Decrease",
    hideSteppers: false,
    label: text.label,
    labelPlacement: "top",
    required: false,
  },
  argTypes: docsArgTypes(
    "NumberInput",
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
      min: { control: "number" },
      max: { control: "number" },
      step: { control: "number", table: { defaultValue: { summary: "1" } } },
      defaultValue: { control: "number" },
      incrementLabel: { table: { defaultValue: { summary: "Increase" } } },
      decrementLabel: { table: { defaultValue: { summary: "Decrease" } } },
      hideSteppers: { table: { defaultValue: { summary: "false" } } },
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
      incrementIcon: iconControl,
      decrementIcon: iconControl,
      prependElement: { control: false },
      appendElement: { control: false },
    },
  ),
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("spinbutton");
    await userEvent.click(canvas.getByRole("button", { name: "Increase" }));
    await expect(input).toHaveValue(2);
    await userEvent.click(canvas.getByRole("button", { name: "Decrease" }));
    await userEvent.click(canvas.getByRole("button", { name: "Decrease" }));
    await expect(input).toHaveValue(0);
    // min is 0: stepping down stops there.
    await userEvent.click(canvas.getByRole("button", { name: "Decrease" }));
    await expect(input).toHaveValue(0);
  },
};
