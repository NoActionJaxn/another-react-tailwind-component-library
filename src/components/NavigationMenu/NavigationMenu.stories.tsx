import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./NavigationMenu";

const meta = {
  title: "Navigation/NavigationMenu",
  component: NavigationMenu,
  parameters: docsParameters("NavigationMenu", { layout: "padded" }),
  args: {
    defaultMenuOpen: false,
    colorScheme: "default",
    collapse: "md",
    openMenuLabel: "Open menu",
    closeMenuLabel: "Close menu",
  },
  argTypes: docsArgTypes("NavigationMenu", ["colorScheme"], {
    collapse: {
      control: "inline-radio",
      options: ["sm", "md", "lg", "xl", "always", "never"],
      table: { defaultValue: { summary: "md" } },
    },
    menuOpen: { control: false },
    defaultMenuOpen: { table: { defaultValue: { summary: "false" } } },
    onMenuOpenChange: { control: false },
    openMenuLabel: { table: { defaultValue: { summary: "Open menu" } } },
    closeMenuLabel: { table: { defaultValue: { summary: "Close menu" } } },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
  }),
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {m.components.NavigationMenu.story.products}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-64 gap-1">
              <li>
                <NavigationMenuLink href="#">
                  {m.components.NavigationMenu.story.analytics}
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  {m.components.NavigationMenu.story.automation}
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">
            {m.components.NavigationMenu.story.pricing}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
