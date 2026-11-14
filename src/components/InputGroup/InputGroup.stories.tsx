import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
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

export const Default: Story = {};
