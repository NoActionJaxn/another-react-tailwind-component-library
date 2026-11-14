import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
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
    await userEvent.type(input, "5555555555");
    // Shown formatted for the selected country…
    await expect(input).toHaveValue("(555) 555-5555");
    // …but reported and submitted unformatted.
    await expect(args.onValueChange).toHaveBeenLastCalledWith("+15555555555");
    const form = canvasElement.querySelector("form")!;
    await expect(new FormData(form).get("phone")).toBe("+15555555555");
    await userEvent.clear(input);
  },
};
