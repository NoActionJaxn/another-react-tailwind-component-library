import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
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
    const values = () => cells.map((cell) => (cell as HTMLInputElement).value);
    await expect(cells).toHaveLength(6);
    await expect(cells[0]).toHaveAccessibleName("Character 1 of 6");
    await expect(cells[5]).toHaveAccessibleName("Character 6 of 6");
    // The label focuses the first cell.
    await userEvent.click(canvas.getByText(text.label));
    await expect(cells[0]).toHaveFocus();
    // Letters are rejected by the default numeric validation.
    await userEvent.keyboard("12a3456");
    await expect(values()).toEqual(["1", "2", "3", "4", "5", "6"]);
    // Backspace clears the last cell and moves back.
    await userEvent.keyboard("{Backspace}");
    await expect(values()).toEqual(["1", "2", "3", "4", "5", ""]);
  },
};

// Pasting a whole code fills every cell.
export const Paste: Story = {
  tags: ["!dev"],
  args: { name: "code", onValueChange: fn() },
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    const cells = canvas.getAllByRole("textbox");
    await userEvent.click(cells[0]!);
    await userEvent.paste("654321");
    await expect(cells.map((cell) => (cell as HTMLInputElement).value)).toEqual(
      ["6", "5", "4", "3", "2", "1"],
    );
    await expect(args.onValueChange).toHaveBeenLastCalledWith("654321");
    // A hidden input submits the whole code under `name`.
    await expect(
      canvasElement.querySelector<HTMLInputElement>('input[name="code"]'),
    ).toHaveValue("654321");
  },
};

export const Alphanumeric: Story = {
  tags: ["!dev"],
  args: { validationType: "alphanumeric", length: 4 },
  play: async ({ canvas, userEvent }) => {
    const cells = canvas.getAllByRole("textbox");
    await expect(cells).toHaveLength(4);
    await expect(cells[0]).toHaveAccessibleName("Character 1 of 4");
    await userEvent.click(cells[0]!);
    await userEvent.keyboard("a1b2");
    await expect(
      cells.map((cell) => (cell as HTMLInputElement).value.toLowerCase()),
    ).toEqual(["a", "1", "b", "2"]);
  },
};

export const Masked: Story = {
  tags: ["!dev"],
  args: { masked: true },
  play: async ({ canvasElement }) => {
    const cells = canvasElement.querySelectorAll("[data-text-input]");
    await expect(cells).toHaveLength(6);
    for (const cell of cells) {
      await expect(cell).toHaveAttribute("type", "password");
    }
  },
};

export const CustomCellLabel: Story = {
  tags: ["!dev"],
  args: { length: 3, cellLabel: (position: number) => `Digit ${position}` },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("textbox")[2]).toHaveAccessibleName(
      "Digit 3",
    );
  },
};

export const Required: Story = {
  tags: ["!dev"],
  args: { required: true },
  play: async ({ canvas }) => {
    for (const cell of canvas.getAllByRole("textbox")) {
      await expect(cell).toHaveAttribute("aria-required", "true");
    }
  },
};

export const Disabled: Story = {
  tags: ["!dev"],
  args: { disabled: true },
  play: async ({ canvas }) => {
    for (const cell of canvas.getAllByRole("textbox")) {
      await expect(cell).toBeDisabled();
    }
  },
};
