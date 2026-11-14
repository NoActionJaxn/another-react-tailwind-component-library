import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarMenu,
  MenubarTrigger,
} from "./Menubar";

const meta = {
  title: "Navigation/Menubar",
  component: Menubar,
  parameters: docsParameters("Menubar", { layout: "centered" }),
  args: { colorScheme: "default" },
  argTypes: docsArgTypes("Menubar", ["colorScheme"], {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
  }),
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>{m.components.Menubar.story.file}</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>{m.common.menu.account}</MenubarLabel>
          <MenubarItem>
            {m.common.menu.profile} <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>{m.common.menu.billing}</MenubarItem>
          <MenubarSeparator />
          <MenubarCheckboxItem checked>
            {m.common.menu.showToolbar}
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value="md">
            <MenubarRadioItem value="sm">
              {m.common.menu.small}
            </MenubarRadioItem>
            <MenubarRadioItem value="md">
              {m.common.menu.medium}
            </MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>{m.common.menu.more}</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>{m.common.menu.settings}</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>{m.components.Menubar.story.edit}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>{m.components.Menubar.story.undo}</MenubarItem>
          <MenubarItem>{m.components.Menubar.story.redo}</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
