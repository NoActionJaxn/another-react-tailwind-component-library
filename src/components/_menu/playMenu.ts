import { expect, screen, userEvent, waitFor } from "storybook/test";
import { m } from "../../docs/i18n";

const text = m.common.menu;

/**
 * Checks the shared story menu (label, items, disabled item, checkbox, radio
 * group and submenu) once it's open, then closes it with Escape.
 */
export async function playOpenMenu() {
  const menu = await screen.findByRole("menu");
  await expect(menu).toHaveAttribute("data-menu-content");
  await expect(screen.getByText(text.account)).toBeVisible();
  await expect(
    screen.getByRole("menuitem", {
      name: (name) => name.startsWith(text.profile),
    }),
  ).toBeVisible();
  await expect(
    screen.getByRole("menuitem", { name: text.billing }),
  ).toHaveAttribute("aria-disabled", "true");
  await expect(
    screen.getByRole("menuitemcheckbox", { name: text.showToolbar }),
  ).toBeChecked();
  await expect(
    screen.getByRole("menuitemradio", { name: text.medium }),
  ).toBeChecked();
  await expect(
    screen.getByRole("menuitemradio", { name: text.small }),
  ).not.toBeChecked();

  // The submenu opens from the keyboard.
  const more = screen.getByRole("menuitem", { name: text.more });
  more.focus();
  await userEvent.keyboard("{ArrowRight}");
  await expect(
    await screen.findByRole("menuitem", { name: text.settings }),
  ).toBeVisible();
  await userEvent.keyboard("{ArrowLeft}");
  await waitFor(() =>
    expect(screen.queryByRole("menuitem", { name: text.settings })).toBeNull(),
  );
  await expect(more).toHaveFocus();

  await userEvent.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
}

/** Choosing an item closes the menu. */
export async function playSelectItem() {
  await userEvent.click(
    await screen.findByRole("menuitem", {
      name: (name) => name.startsWith(text.profile),
    }),
  );
  await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
}
