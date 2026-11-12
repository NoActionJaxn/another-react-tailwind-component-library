import type { Meta, StoryObj } from "@storybook/react-vite";
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
  title: "Components/Menubar",
  component: Menubar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { colorScheme: "default" },
  argTypes: {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
  },
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Account</MenubarLabel>
          <MenubarItem>
            Profile <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>Billing</MenubarItem>
          <MenubarSeparator />
          <MenubarCheckboxItem checked>Show toolbar</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value="md">
            <MenubarRadioItem value="sm">Small</MenubarRadioItem>
            <MenubarRadioItem value="md">Medium</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>More</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Settings</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
