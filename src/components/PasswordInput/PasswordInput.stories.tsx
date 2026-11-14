import type { Meta, StoryObj } from "@storybook/react-vite";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { PasswordInput } from "./PasswordInput";

const text = m.components.PasswordInput.story;

const meta = {
  title: "Forms/PasswordInput",
  component: PasswordInput,
  parameters: docsParameters("PasswordInput", { layout: "centered" }),
  args: {
    variant: "outline",
    size: "md",
    colorScheme: "default",
    label: text.label,
    labelPlacement: "top",
    placeholder: text.placeholder,
    prependElement: <LockClosedIcon aria-hidden />,
    autoComplete: "current-password",
    defaultVisible: false,
    showLabel: "Show password",
    hideLabel: "Hide password",
    hideToggle: false,
    required: false,
    disabled: false,
    block: false,
  },
  argTypes: docsArgTypes(
    "PasswordInput",
    [
      "variant",
      "size",
      "colorScheme",
      "disabled",
      "block",
      "placeholder",
      { "aria-label": "ariaLabel" },
    ],
    {
      label: { control: "text" },
      labelPlacement: {
        control: "inline-radio",
        options: ["top", "left", "border"],
        table: { defaultValue: { summary: "top" } },
      },
      autoComplete: {
        control: "inline-radio",
        options: ["current-password", "new-password"],
        table: { defaultValue: { summary: "current-password" } },
      },
      defaultVisible: { table: { defaultValue: { summary: "false" } } },
      visible: { control: false },
      onVisibilityChange: { control: false },
      showLabel: { table: { defaultValue: { summary: "Show password" } } },
      hideLabel: { table: { defaultValue: { summary: "Hide password" } } },
      hideToggle: { table: { defaultValue: { summary: "false" } } },
      visibleIcon: {
        control: false,
        table: { defaultValue: { summary: "EyeOpenIcon" } },
      },
      hiddenIcon: {
        control: false,
        table: { defaultValue: { summary: "EyeClosedIcon" } },
      },
      required: { table: { defaultValue: { summary: "false" } } },
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
      prependElement: { control: false },
      appendElement: { control: false },
    },
  ),
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText(text.label);
    await userEvent.type(input, "secret");
    await expect(input).toHaveAttribute("type", "password");
    await userEvent.click(
      canvas.getByRole("button", { name: "Show password" }),
    );
    await expect(input).toHaveAttribute("type", "text");
    await expect(input).toHaveValue("secret");
    await userEvent.click(
      canvas.getByRole("button", { name: "Hide password" }),
    );
    await expect(input).toHaveAttribute("type", "password");
  },
};
