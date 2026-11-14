import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { playOpenMenu, playSelectItem } from "../_menu/playMenu";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./DropdownMenu";

const meta = {
  title: "Navigation/DropdownMenu",
  component: DropdownMenu,
  parameters: docsParameters("DropdownMenu", { layout: "centered" }),
  args: {},
  argTypes: docsArgTypes(
    "DropdownMenu",
    ["open", "defaultOpen", "onOpenChange", "modal"],
    {
      modal: { table: { defaultValue: { summary: "true" } } },
      defaultOpen: { table: { defaultValue: { summary: "false" } } },
    },
  ),
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {m.components.DropdownMenu.story.trigger}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{m.common.menu.account}</DropdownMenuLabel>
        <DropdownMenuItem>
          {m.common.menu.profile}{" "}
          <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>{m.common.menu.billing}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>
          {m.common.menu.showToolbar}
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="md">
          <DropdownMenuRadioItem value="sm">
            {m.common.menu.small}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="md">
            {m.common.menu.medium}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>{m.common.menu.more}</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>{m.common.menu.settings}</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const trigger = m.components.DropdownMenu.story.trigger;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: trigger });
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(button);
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await playOpenMenu();
    // Closing returns focus to the trigger.
    await expect(button).toHaveFocus();

    // The keyboard opens it too.
    await userEvent.keyboard("{Enter}");
    await playSelectItem();
    await expect(button).toHaveAttribute("aria-expanded", "false");
  },
};

export const OpenChange: Story = {
  tags: ["!dev"],
  args: { onOpenChange: fn() },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: trigger }));
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(true);
    await userEvent.keyboard("{Escape}");
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(false);
  },
};
