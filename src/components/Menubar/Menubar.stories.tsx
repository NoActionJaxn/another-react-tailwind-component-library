import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen } from "storybook/test";
import { playOpenMenu, playSelectItem } from "../_menu/playMenu";
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

const text = m.components.Menubar.story;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole("menubar")).toBeVisible();
    const file = canvas.getByRole("menuitem", { name: text.file });
    const edit = canvas.getByRole("menuitem", { name: text.edit });
    await userEvent.click(file);
    await expect(file).toHaveAttribute("aria-expanded", "true");
    await playOpenMenu();
    await expect(file).toHaveFocus();

    // Arrow keys move between the bar's menus.
    await userEvent.keyboard("{ArrowRight}");
    await expect(edit).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(
      await screen.findByRole("menuitem", { name: text.undo }),
    ).toBeVisible();
    // With a menu open, moving along the bar opens the next one.
    await userEvent.keyboard("{ArrowRight}");
    await expect(
      await screen.findByRole("menuitem", {
        name: (name) => name.startsWith(m.common.menu.profile),
      }),
    ).toBeVisible();
    await expect(
      screen.queryByRole("menuitem", { name: text.undo }),
    ).toBeNull();
    await playSelectItem();
  },
};
