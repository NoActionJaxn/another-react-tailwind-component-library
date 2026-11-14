import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
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

const text = m.components.NavigationMenu.story;

// Collapses into a menu button below the md breakpoint, so either form can show.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("navigation")).toBeInTheDocument();
  },
};

export const Inline: Story = {
  tags: ["!dev"],
  args: { collapse: "never" },
  play: async ({ canvas, userEvent }) => {
    await expect(
      canvas.queryByRole("button", { name: "Open menu" }),
    ).toBeNull();
    await expect(
      canvas.getByRole("link", { name: text.pricing }),
    ).toBeVisible();
    const products = canvas.getByRole("button", { name: text.products });
    await expect(products).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(products);
    await expect(products).toHaveAttribute("aria-expanded", "true");
    await expect(
      await canvas.findByRole("link", { name: text.analytics }),
    ).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(products).toHaveAttribute("aria-expanded", "false"),
    );
  },
};

export const Collapsed: Story = {
  tags: ["!dev"],
  args: { collapse: "always", onMenuOpenChange: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Open menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    // The panel is portaled to <body> and stays mounted (hidden) while closed.
    const panel = document.getElementById(
      toggle.getAttribute("aria-controls")!,
    )!;
    await expect(panel).not.toBeVisible();

    await userEvent.click(toggle);
    await expect(args.onMenuOpenChange).toHaveBeenLastCalledWith(true);
    await expect(panel).toBeVisible();
    // The page behind can't scroll while the panel is open.
    await expect(document.body.style.overflow).toBe("hidden");
    // With nothing above it, the panel covers the toggle and has its own close button, which takes focus.
    const close = within(panel).getByRole("button", { name: "Close menu" });
    await waitFor(() => expect(close).toHaveFocus());

    // Submenus open in place.
    await userEvent.click(
      within(panel).getByRole("button", { name: text.products }),
    );
    await expect(
      await within(panel).findByRole("link", { name: text.analytics }),
    ).toBeVisible();

    // Escape closes it and returns focus to the toggle.
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(panel).not.toBeVisible());
    await expect(args.onMenuOpenChange).toHaveBeenLastCalledWith(false);
    await expect(toggle).toHaveFocus();
    await expect(document.body.style.overflow).toBe("");

    // Following a link closes it (the story's links go nowhere: keep the test page).
    const stay = (event: Event) => event.preventDefault();
    window.addEventListener("click", stay, true);
    await userEvent.click(toggle);
    await userEvent.click(
      within(panel).getByRole("link", { name: text.pricing }),
    );
    window.removeEventListener("click", stay, true);
    await waitFor(() => expect(panel).not.toBeVisible());

    await userEvent.click(toggle);
    await userEvent.click(close);
    await waitFor(() => expect(panel).not.toBeVisible());
  },
};
