import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const meta = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    type: "single",
    defaultValue: "left",
    variant: "ghost",
    size: "md",
    colorScheme: "default",
    "aria-label": "Text alignment",
  },
  argTypes: {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    variant: { control: "inline-radio", options: ["ghost", "outline"] },
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="left" aria-label="Left">
        <TextAlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Center">
        <TextAlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right">
        <TextAlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
