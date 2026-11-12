import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ContextMenu";

const meta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  parameters: docsParameters("ContextMenu", { layout: "centered" }),
  args: {},
  argTypes: docsArgTypes("ContextMenu", ["onOpenChange", "modal"], {}),
  render: (args) => (
    <ContextMenu {...args}>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed border-default-400 text-sm text-default-700">
        {m.components.ContextMenu.story.trigger}
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>{m.common.menu.account}</ContextMenuLabel>
        <ContextMenuItem>
          {m.common.menu.profile} <ContextMenuShortcut>⌘P</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>{m.common.menu.billing}</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          {m.common.menu.showToolbar}
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="md">
          <ContextMenuRadioItem value="sm">
            {m.common.menu.small}
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="md">
            {m.common.menu.medium}
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>{m.common.menu.more}</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>{m.common.menu.settings}</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
