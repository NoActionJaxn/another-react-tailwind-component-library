import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const meta = {
  title: "Actions/ToggleGroup",
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

const text = m.components.ToggleGroup.story;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const left = canvas.getByRole("radio", { name: text.left });
    const center = canvas.getByRole("radio", { name: text.center });
    const right = canvas.getByRole("radio", { name: text.right });
    await expect(left).toBeChecked();
    // Items take the group's variant and size.
    await expect(center).toHaveAttribute("data-variant", "ghost");
    await expect(center).toHaveAttribute("data-size", "md");

    // Single: pressing another item releases the first.
    await userEvent.click(center);
    await expect(center).toBeChecked();
    await expect(left).not.toBeChecked();

    // Arrow keys move focus between items.
    await userEvent.keyboard("{ArrowRight}");
    await expect(right).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(right).toBeChecked();
  },
};

export const Multiple: Story = {
  tags: ["!dev"],
  args: { type: "multiple", defaultValue: ["left"] },
  play: async ({ canvas, userEvent }) => {
    const left = canvas.getByRole("button", { name: text.left });
    const right = canvas.getByRole("button", { name: text.right });
    await userEvent.click(right);
    await expect(left).toHaveAttribute("aria-pressed", "true");
    await expect(right).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(left);
    await expect(left).toHaveAttribute("aria-pressed", "false");
  },
};
