import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select";
import { TextInput } from "../TextInput";
import { InputGroup } from "./InputGroup";

const text = m.components.InputGroup.story;

const meta = {
  title: "Forms/InputGroup",
  component: InputGroup,
  parameters: docsParameters("InputGroup", { layout: "centered" }),
  args: {
    size: "md",
    colorScheme: "default",
    block: false,
    "aria-label": text.label,
  },
  argTypes: docsArgTypes(
    "InputGroup",
    ["size", "colorScheme", "block", { "aria-label": "ariaLabel" }],
    {
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
      block: { table: { defaultValue: { summary: "false" } } },
    },
  ),
  render: (args) => (
    <InputGroup {...args} className="w-[32rem] max-w-full">
      <Select defaultValue="all">
        <SelectTrigger aria-label={text.categoryLabel}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(text.categories).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <TextInput
        aria-label={text.searchLabel}
        placeholder={text.searchPlaceholder}
        prependElement={<MagnifyingGlassIcon aria-hidden />}
      />
      <Button>{text.button}</Button>
    </InputGroup>
  ),
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const group = canvas.getByRole("group", { name: text.label });
    const category = canvas.getByRole("combobox", { name: text.categoryLabel });
    const search = canvas.getByRole("textbox", { name: text.searchLabel });
    const button = canvas.getByRole("button", { name: text.button });
    for (const control of [category, search, button]) {
      await expect(group).toContainElement(control);
    }
    // Each control still works on its own inside the group.
    await expect(category).toHaveTextContent(text.categories.all);
    await userEvent.click(category);
    await userEvent.click(
      await screen.findByRole("option", { name: text.categories.music }),
    );
    await expect(category).toHaveTextContent(text.categories.music);
    await userEvent.type(search, "jazz");
    await expect(search).toHaveValue("jazz");
  },
};

// The group's size applies to every control in it.
export const Size: Story = {
  tags: ["!dev"],
  args: { size: "lg" },
  play: async ({ canvas, canvasElement }) => {
    await expect(
      canvas.getByRole("combobox", { name: text.categoryLabel }),
    ).toHaveAttribute("data-size", "lg");
    await expect(
      canvasElement.querySelector("[data-text-input]"),
    ).toHaveAttribute("data-size", "lg");
    await expect(
      canvas.getByRole("button", { name: text.button }),
    ).toHaveAttribute("data-size", "lg");
  },
};
