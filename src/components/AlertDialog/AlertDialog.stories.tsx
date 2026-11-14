import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor, within } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./AlertDialog";

const meta = {
  title: "Dialogs/AlertDialog",
  component: AlertDialog,
  parameters: docsParameters("AlertDialog", { layout: "centered" }),
  args: {},
  argTypes: docsArgTypes(
    "AlertDialog",
    ["open", "defaultOpen", "onOpenChange"],
    {
      defaultOpen: { table: { defaultValue: { summary: "false" } } },
    },
  ),
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          {m.components.AlertDialog.story.trigger}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {m.components.AlertDialog.story.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {m.components.AlertDialog.story.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {m.components.AlertDialog.story.cancel}
          </AlertDialogCancel>
          <AlertDialogAction>
            {m.components.AlertDialog.story.action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = m.components.AlertDialog.story;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: text.trigger });
    await userEvent.click(trigger);
    const dialog = await screen.findByRole("alertdialog", { name: text.title });
    await expect(dialog).toHaveAccessibleDescription(text.description);
    // The safe choice takes focus.
    await expect(
      within(dialog).getByRole("button", { name: text.cancel }),
    ).toHaveFocus();

    // A click outside doesn't dismiss it: the user has to choose.
    await userEvent.click(document.querySelector("[data-dialog-overlay]")!);
    await expect(screen.getByRole("alertdialog")).toBeVisible();

    await userEvent.click(
      within(dialog).getByRole("button", { name: text.cancel }),
    );
    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
    await expect(trigger).toHaveFocus();

    // The action closes it too, and Escape cancels.
    await userEvent.click(trigger);
    await userEvent.click(
      await screen.findByRole("button", { name: text.action }),
    );
    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
    await userEvent.click(trigger);
    await screen.findByRole("alertdialog");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
  },
};
