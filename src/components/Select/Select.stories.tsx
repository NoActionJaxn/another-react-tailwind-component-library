import type { Meta, StoryObj } from "@storybook/react-vite";
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
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    variant: "outline",
    size: "md",
    colorScheme: "default",
    "aria-label": "Fruit",
  },
  argTypes: {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    variant: { control: "inline-radio", options: ["outline", "soft", "ghost"] },
  },
  render: (args) => (
    <div className="w-60">
      <Select>
        <SelectTrigger {...args}>
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruit</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectItem value="carrot" disabled>
            Carrot
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
} satisfies Meta<typeof SelectTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
