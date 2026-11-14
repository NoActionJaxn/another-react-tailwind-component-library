import type { Meta, StoryObj } from "@storybook/react-vite";
import { CubeIcon } from "@radix-ui/react-icons";
import { expect, screen, waitFor } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Avatar, AvatarFallback } from "../Avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../NavigationMenu";
import {
  Header,
  HeaderLogo,
  HeaderNav,
  HeaderSearch,
  type HeaderProps,
} from "./Header";

// Story-only switches: the search and the avatar are optional parts.
type StoryArgs = HeaderProps & { withSearch: boolean; withAvatar: boolean };

const text = m.components.Header.story;

const meta = {
  title: "Blocks/Header",
  component: Header,
  parameters: docsParameters("Header", { layout: "fullscreen" }),
  args: {
    variant: "outline",
    sticky: false,
    block: false,
    colorScheme: "default",
    withSearch: true,
    withAvatar: true,
  },
  argTypes: docsArgTypes("Header", ["variant", "colorScheme", "block"], {
    withSearch: {
      control: "boolean",
      table: {
        category: text.storyCategory,
        defaultValue: { summary: "true" },
      },
    },
    withAvatar: {
      control: "boolean",
      table: {
        category: text.storyCategory,
        defaultValue: { summary: "true" },
      },
    },
    variant: {
      control: "inline-radio",
      options: ["outline", "soft", "solid", "ghost"],
      table: { defaultValue: { summary: "outline" } },
    },
    sticky: { table: { defaultValue: { summary: "false" } } },
    block: { table: { defaultValue: { summary: "false" } } },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
  }),
  render: ({ withSearch, withAvatar, ...args }) => (
    <div className="min-h-80">
      <Header {...args}>
        <HeaderLogo asChild>
          <a href="#">
            <span className="flex size-8 items-center justify-center rounded-lg bg-(--scheme-600) text-white">
              <CubeIcon aria-hidden />
            </span>
            {text.brand}
          </a>
        </HeaderLogo>
        {withSearch && <HeaderSearch placeholder={text.searchPlaceholder} />}
        <HeaderNav>
          <NavigationMenu aria-label={text.navLabel}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{text.products}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-56 gap-1">
                    {text.productLinks.map((link) => (
                      <li key={link}>
                        <NavigationMenuLink href="#">{link}</NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {text.links.map((link) => (
                <NavigationMenuItem key={link}>
                  <NavigationMenuLink href="#">{link}</NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {withAvatar && (
            <Avatar size="sm">
              <AvatarFallback>{text.initials}</AvatarFallback>
            </Avatar>
          )}
        </HeaderNav>
      </Header>
    </div>
  ),
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole("banner")).toBeVisible();
    await expect(
      canvas.getByRole("searchbox", { name: "Search" }),
    ).toBeVisible();
    // Below the md breakpoint the menu is a hamburger that opens a panel.
    const toggle = canvas.queryByRole("button", { name: "Open menu" });
    if (!toggle) {
      await expect(
        canvas.getByRole("link", { name: text.links[0] }),
      ).toBeVisible();
      return;
    }
    await userEvent.click(toggle);
    // The panel is portaled to <body>, outside the canvas.
    await expect(
      screen.getByRole("link", { name: text.links[0] }),
    ).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(canvas.getByRole("button", { name: "Open menu" })).toHaveAttribute(
        "aria-expanded",
        "false",
      ),
    );
  },
};
