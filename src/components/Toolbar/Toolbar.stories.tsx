import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
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
  parameters: docsParameters("Toolbar", { layout: "centered" }),
  args: {
    size: "sm",
    colorScheme: "default",
    "aria-label": m.components.Toolbar.story.ariaLabel,
  },
  argTypes: docsArgTypes(
    "Toolbar",
    ["colorScheme", { "aria-label": "ariaLabel" }],
    {
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
      },
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    },
  ),
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarToggleGroup
        type="multiple"
        aria-label={m.components.Toolbar.story.textStyle}
      >
        <ToolbarToggleItem
          value="bold"
          aria-label={m.components.Toolbar.story.bold}
        >
          <FontBoldIcon />
        </ToolbarToggleItem>
        <ToolbarToggleItem
          value="italic"
          aria-label={m.components.Toolbar.story.italic}
        >
          <FontItalicIcon />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label={m.components.Toolbar.story.insertLink}>
        <Link2Icon />
      </ToolbarButton>
      <ToolbarSeparator />
      <ToolbarLink href="#">{m.components.Toolbar.story.edited}</ToolbarLink>
    </Toolbar>
  ),
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
