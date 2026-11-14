import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { expect, fn, waitFor } from "storybook/test";
import { Radio, RadioGroup } from "./Radio";

const meta = {
  title: "Forms/Radio",
  component: RadioGroup,
  subcomponents: { Radio },
  parameters: docsParameters("Radio", { layout: "centered" }),
  args: {
    defaultValue: "email",
    size: "md",
    colorScheme: "default",
    orientation: "vertical",
    disabled: false,
    "aria-label": m.components.Radio.story.ariaLabel,
    onValueChange: fn(),
  },
  argTypes: docsArgTypes("Radio", ["colorScheme", "orientation", "disabled"], {
    icon: {
      control: false,
      table: { defaultValue: { summary: "DotFilledIcon" } },
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
    orientation: {
      table: { defaultValue: { summary: "vertical" } },
      control: "inline-radio",
      options: ["vertical", "horizontal"],
    },
    disabled: { table: { defaultValue: { summary: "false" } } },
  }),
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="email" label={m.components.Radio.story.email} />
      <Radio value="phone" label={m.components.Radio.story.phone} />
      <Radio value="mail" label={m.components.Radio.story.mail} />
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = m.components.Radio.story;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await expect(
      canvas.getByRole("radiogroup", { name: text.ariaLabel }),
    ).toBeVisible();
    const email = canvas.getByRole("radio", { name: text.email });
    const phone = canvas.getByRole("radio", { name: text.phone });
    const mail = canvas.getByRole("radio", { name: text.mail });
    await expect(email).toBeChecked();
    // Radios take the group's size.
    await expect(email.closest("[data-radio]")).toHaveAttribute(
      "data-size",
      "md",
    );
    await userEvent.click(phone);
    await expect(phone).toBeChecked();
    await expect(email).not.toBeChecked();
    await expect(args.onValueChange).toHaveBeenLastCalledWith("phone");
    // The label selects its radio.
    await userEvent.click(canvas.getByText(text.mail));
    await expect(mail).toBeChecked();
    // Arrow keys move the selection (Radix selects while the key is down).
    await expect(mail).toHaveFocus();
    await userEvent.keyboard("{ArrowUp>}");
    await waitFor(() => expect(phone).toBeChecked());
    await userEvent.keyboard("{/ArrowUp}");
    await expect(phone).toHaveFocus();
  },
};

// A disabled group ignores clicks on any radio.
export const Disabled: Story = {
  tags: ["!dev"],
  args: { disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const phone = canvas.getByRole("radio", { name: text.phone });
    await expect(phone).toBeDisabled();
    await userEvent.click(phone);
    await expect(phone).not.toBeChecked();
    await expect(args.onValueChange).not.toHaveBeenCalled();
  },
};

export const DisabledItem: Story = {
  tags: ["!dev"],
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="email" label={text.email} />
      <Radio value="phone" label={text.phone} disabled />
      <Radio value="mail" label={text.mail} />
    </RadioGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("radio", { name: text.email }));
    // Arrow keys skip the disabled radio.
    await userEvent.keyboard("{ArrowDown>}");
    await waitFor(() =>
      expect(canvas.getByRole("radio", { name: text.mail })).toBeChecked(),
    );
    await userEvent.keyboard("{/ArrowDown}");
  },
};

export const Size: Story = {
  tags: ["!dev"],
  args: { size: "lg" },
  play: async ({ canvasElement }) => {
    for (const radio of canvasElement.querySelectorAll("[data-radio]")) {
      await expect(radio).toHaveAttribute("data-size", "lg");
    }
  },
};
