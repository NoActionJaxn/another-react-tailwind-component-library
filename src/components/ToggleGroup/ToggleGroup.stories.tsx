import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const meta = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  parameters: docsParameters("ToggleGroup", { layout: "centered" }),
  args: {
    type: "single",
    defaultValue: "left",
    variant: "ghost",
    size: "md",
    colorScheme: "default",
    "aria-label": m.components.ToggleGroup.story.ariaLabel,
  },
  argTypes: docsArgTypes(
    "ToggleGroup",
    ["variant", "size", "colorScheme", { "aria-label": "ariaLabel" }],
    {
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
      },
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
      variant: { control: "inline-radio", options: ["ghost", "outline"] },
    },
  ),
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem
        value="left"
        aria-label={m.components.ToggleGroup.story.left}
      >
        <TextAlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="center"
        aria-label={m.components.ToggleGroup.story.center}
      >
        <TextAlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="right"
        aria-label={m.components.ToggleGroup.story.right}
      >
        <TextAlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
