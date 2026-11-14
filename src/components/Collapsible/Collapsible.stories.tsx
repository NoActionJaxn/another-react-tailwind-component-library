import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./Collapsible";

const meta = {
  title: "Data Display/Collapsible",
  component: Collapsible,
  parameters: docsParameters("Collapsible", { layout: "centered" }),
  args: {},
  argTypes: docsArgTypes(
    "Collapsible",
    ["open", "defaultOpen", "onOpenChange", "disabled"],
    {
      disabled: { table: { defaultValue: { summary: "false" } } },
      defaultOpen: { table: { defaultValue: { summary: "false" } } },
    },
  ),
  render: (args) => (
    <Collapsible {...args} className="w-72">
      <CollapsibleTrigger asChild>
        <Button variant="ghost">
          {m.components.Collapsible.story.trigger}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="pt-2 text-sm">{m.components.Collapsible.story.content}</p>
      </CollapsibleContent>
    </Collapsible>
  ),
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = m.components.Collapsible.story;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: text.trigger });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.queryByText(text.content)).toBeNull();
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText(text.content)).toBeVisible();
    await expect(
      document.getElementById(trigger.getAttribute("aria-controls")!),
    ).toContainElement(canvas.getByText(text.content));
    await userEvent.click(trigger);
    await waitFor(() => expect(canvas.queryByText(text.content)).toBeNull());
  },
};

export const DefaultOpen: Story = {
  tags: ["!dev"],
  args: { defaultOpen: true, onOpenChange: fn() },
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByText(text.content)).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: text.trigger }));
    await expect(args.onOpenChange).toHaveBeenCalledWith(false);
  },
};

export const Disabled: Story = {
  tags: ["!dev"],
  args: { disabled: true },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: text.trigger });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  },
};
