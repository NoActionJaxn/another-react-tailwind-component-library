import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

const meta = {
  title: "Components/Popover",
  component: Popover,
  parameters: docsParameters("Popover", { layout: "centered" }),
  args: {},
  argTypes: docsArgTypes(
    "Popover",
    ["open", "defaultOpen", "onOpenChange", "modal"],
    {
      modal: { table: { defaultValue: { summary: "false" } } },
      defaultOpen: { table: { defaultValue: { summary: "false" } } },
    },
  ),
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline">{m.components.Popover.story.trigger}</Button>
      </PopoverTrigger>
      <PopoverContent>{m.components.Popover.story.content}</PopoverContent>
    </Popover>
  ),
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
