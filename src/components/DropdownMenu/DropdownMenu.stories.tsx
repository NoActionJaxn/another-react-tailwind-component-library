import type { Meta, StoryObj } from "@storybook/react-vite";
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
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  parameters: docsParameters("DropdownMenu", { layout: "centered" }),
  args: {},
  argTypes: docsArgTypes(
    "DropdownMenu",
    ["open", "defaultOpen", "onOpenChange", "modal"],
    {},
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

export const Default: Story = {};
