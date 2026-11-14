import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { OneTimeCodeInput } from "./OneTimeCodeInput";

const text = m.components.OneTimeCodeInput.story;

const meta = {
  title: "Forms/OneTimeCodeInput",
  component: OneTimeCodeInput,
  parameters: docsParameters("OneTimeCodeInput", { layout: "centered" }),
  args: {
    length: 6,
    variant: "outline",
    size: "md",
    colorScheme: "default",
    label: text.label,
    labelPlacement: "top",
    validationType: "numeric",
    masked: false,
    autoSubmit: false,
    required: false,
    disabled: false,
    block: false,
  },
  argTypes: docsArgTypes(
    "OneTimeCodeInput",
    [
      "variant",
      "size",
      "colorScheme",
      "disabled",
      "block",
      "defaultValue",
      "onValueChange",
    ],
    {
      length: {
        control: { type: "number", min: 1, max: 10 },
        table: { defaultValue: { summary: "6" } },
      },
      label: { control: "text" },
      labelPlacement: {
        control: "inline-radio",
        options: ["top", "left"],
        table: { defaultValue: { summary: "top" } },
      },
      validationType: {
        control: "inline-radio",
        options: ["numeric", "alpha", "alphanumeric", "none"],
        table: { defaultValue: { summary: "numeric" } },
      },
      masked: { table: { defaultValue: { summary: "false" } } },
      autoSubmit: { table: { defaultValue: { summary: "false" } } },
      onAutoSubmit: { control: false },
      required: { table: { defaultValue: { summary: "false" } } },
      value: { control: false },
      name: { control: "text" },
      placeholder: { control: "text" },
      cellLabel: {
        control: false,
        table: { defaultValue: { summary: text.defaultCellLabel } },
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
    },
  ),
} satisfies Meta<typeof OneTimeCodeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const cells = canvas.getAllByRole("textbox");
    await expect(cells).toHaveLength(6);
    await userEvent.click(cells[0]!);
    // Letters are rejected by the default numeric validation.
    await userEvent.keyboard("12a3456");
    await expect(cells.map((cell) => (cell as HTMLInputElement).value)).toEqual(
      ["1", "2", "3", "4", "5", "6"],
    );
  },
};
