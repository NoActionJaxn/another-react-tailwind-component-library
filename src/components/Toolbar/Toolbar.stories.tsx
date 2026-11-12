import type { Meta, StoryObj } from "@storybook/react-vite";
import { FontBoldIcon, FontItalicIcon, Link2Icon } from "@radix-ui/react-icons";
import {
  Toolbar,
  ToolbarButton,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from "./Toolbar";

const meta = {
  title: "Components/Toolbar",
  component: Toolbar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { size: "sm", colorScheme: "default", "aria-label": "Formatting" },
  argTypes: {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarToggleGroup type="multiple" aria-label="Text style">
        <ToolbarToggleItem value="bold" aria-label="Bold">
          <FontBoldIcon />
        </ToolbarToggleItem>
        <ToolbarToggleItem value="italic" aria-label="Italic">
          <FontItalicIcon />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Insert link">
        <Link2Icon />
      </ToolbarButton>
      <ToolbarSeparator />
      <ToolbarLink href="#">Edited 2m ago</ToolbarLink>
    </Toolbar>
  ),
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
