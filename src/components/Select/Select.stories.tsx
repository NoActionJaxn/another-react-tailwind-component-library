import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./Select";

const meta = {
  title: "Components/Select",
  component: SelectTrigger,
  parameters: docsParameters("Select", { layout: "centered" }),
  args: {
    variant: "outline",
    size: "md",
    colorScheme: "default",
    "aria-label": m.components.Select.story.ariaLabel,
  },
  argTypes: docsArgTypes(
    "Select",
    ["variant", "size", "colorScheme", { "aria-label": "ariaLabel" }],
    {
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
      },
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
      variant: {
        control: "inline-radio",
        options: ["outline", "soft", "ghost"],
      },
    },
  ),
  render: (args) => (
    <div className="w-60">
      <Select>
        <SelectTrigger {...args}>
          <SelectValue placeholder={m.components.Select.story.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{m.components.Select.story.ariaLabel}</SelectLabel>
            <SelectItem value="apple">
              {m.components.Select.story.apple}
            </SelectItem>
            <SelectItem value="banana">
              {m.components.Select.story.banana}
            </SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectItem value="carrot" disabled>
            {m.components.Select.story.carrot}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
} satisfies Meta<typeof SelectTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
