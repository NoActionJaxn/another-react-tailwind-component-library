import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { PhoneInput } from "./PhoneInput";

const text = m.components.PhoneInput.story;

const meta = {
  title: "Forms/PhoneInput",
  component: PhoneInput,
  parameters: docsParameters("PhoneInput", { layout: "centered" }),
  args: {
    label: text.label,
    labelPlacement: "top",
    name: "phone",
    defaultCountry: "US",
    placeholder: text.placeholder,
    countryLabel: "Country code",
    variant: "outline",
    size: "md",
    colorScheme: "default",
    disabled: false,
    required: false,
    block: false,
    onValueChange: fn(),
    onCountryChange: fn(),
  },
  argTypes: docsArgTypes(
    "PhoneInput",
    ["variant", "size", "colorScheme", "disabled", "block"],
    {
      label: { control: "text" },
      labelPlacement: {
        control: "inline-radio",
        options: ["top", "left"],
        table: { defaultValue: { summary: "top" } },
      },
      required: { table: { defaultValue: { summary: "false" } } },
      name: { control: "text" },
      value: { control: "text" },
      defaultValue: { control: "text" },
      defaultCountry: {
        control: "text",
        table: { defaultValue: { summary: text.firstCountry } },
      },
      countries: {
        control: false,
        table: { defaultValue: { summary: "defaultPhoneCountries" } },
      },
      countryLabel: { table: { defaultValue: { summary: "Country code" } } },
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
  render: (args) => (
    <form className="w-80" onSubmit={(event) => event.preventDefault()}>
      <PhoneInput {...args} block />
    </form>
  ),
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    const input = canvas.getByLabelText(text.label);
    await expect(input).toHaveAttribute("type", "tel");
    await expect(
      canvas.getByRole("combobox", { name: "Country code" }),
    ).toHaveTextContent("+1");
    await userEvent.type(input, "5555555555");
    // Shown formatted for the selected country…
    await expect(input).toHaveValue("(555) 555-5555");
    // …but reported and submitted unformatted.
    await expect(args.onValueChange).toHaveBeenLastCalledWith("+15555555555");
    const form = canvasElement.querySelector("form")!;
    await expect(new FormData(form).get("phone")).toBe("+15555555555");
    // A US number has at most 10 digits: extra ones are dropped.
    await userEvent.type(input, "12");
    await expect(input).toHaveValue("(555) 555-5555");
    await userEvent.clear(input);
    await expect(args.onValueChange).toHaveBeenLastCalledWith("");
    await expect(new FormData(form).get("phone")).toBe("");
  },
};

// A pasted international number picks its own country.
export const PasteInternational: Story = {
  tags: ["!dev"],
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByLabelText(text.label);
    await userEvent.click(input);
    await userEvent.paste("+44 20 7946 0958");
    await expect(
      canvas.getByRole("combobox", { name: "Country code" }),
    ).toHaveTextContent("+44");
    await expect(args.onCountryChange).toHaveBeenCalledWith(
      expect.objectContaining({ code: "GB" }),
    );
    await expect(args.onValueChange).toHaveBeenLastCalledWith("+442079460958");
  },
};

// Digits from other scripts are read as 0-9.
export const OtherScriptDigits: Story = {
  tags: ["!dev"],
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByLabelText(text.label);
    await userEvent.click(input);
    await userEvent.paste("٥٥٥٥٥٥٥٥٥٥");
    await expect(input).toHaveValue("(555) 555-5555");
    await expect(args.onValueChange).toHaveBeenLastCalledWith("+15555555555");
  },
};

// Picking another country keeps the digits and reports the new number.
export const ChangeCountry: Story = {
  tags: ["!dev"],
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByLabelText(text.label);
    await userEvent.type(input, "612345678");
    const trigger = canvas.getByRole("combobox", { name: "Country code" });
    await userEvent.click(trigger);
    await userEvent.click(
      await screen.findByRole("option", { name: "France (+33)" }),
    );
    await expect(trigger).toHaveTextContent("+33");
    await expect(args.onCountryChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ code: "FR" }),
    );
    await expect(args.onValueChange).toHaveBeenLastCalledWith("+33612345678");
  },
};

// An E.164 value picks its country and is shown in the national format.
export const WithDefaultValue: Story = {
  tags: ["!dev"],
  args: { defaultValue: "+33612345678" },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("combobox", { name: "Country code" }),
    ).toHaveTextContent("+33");
    await expect(canvas.getByLabelText(text.label)).toHaveValue(
      "06 12 34 56 78",
    );
  },
};

export const CustomCountries: Story = {
  tags: ["!dev"],
  args: {
    defaultCountry: undefined,
    countries: [
      { code: "JP", dialCode: "+81", name: "Japan" },
      { code: "DE", dialCode: "+49", name: "Germany" },
    ],
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("combobox", { name: "Country code" });
    // Without a defaultCountry, the first listed country is picked.
    await expect(trigger).toHaveTextContent("+81");
    await userEvent.click(trigger);
    await expect(await screen.findAllByRole("option")).toHaveLength(2);
    await userEvent.keyboard("{Escape}");
  },
};

export const Disabled: Story = {
  tags: ["!dev"],
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText(text.label)).toBeDisabled();
    await expect(
      canvas.getByRole("combobox", { name: "Country code" }),
    ).toBeDisabled();
  },
};
