import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen, waitFor, within } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import { TextInput } from "../TextInput";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";

const meta = {
  title: "Dialogs/Dialog",
  component: Dialog,
  parameters: docsParameters("Dialog", { layout: "centered" }),
  args: {},
  argTypes: docsArgTypes(
    "Dialog",
    ["open", "defaultOpen", "onOpenChange", "modal"],
    {
      modal: { table: { defaultValue: { summary: "true" } } },
      defaultOpen: { table: { defaultValue: { summary: "false" } } },
    },
  ),
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>{m.components.Dialog.story.trigger}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{m.components.Dialog.story.title}</DialogTitle>
          <DialogDescription>
            {m.components.Dialog.story.description}
          </DialogDescription>
        </DialogHeader>
        <TextInput
          block
          aria-label={m.components.Dialog.story.namePlaceholder}
          placeholder={m.components.Dialog.story.namePlaceholder}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              {m.components.Dialog.story.cancel}
            </Button>
          </DialogClose>
          <Button>{m.components.Dialog.story.save}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = m.components.Dialog.story;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: text.trigger });
    await userEvent.click(trigger);
    // Portaled to <body>, named and described by its title and description.
    const dialog = await screen.findByRole("dialog", { name: text.title });
    await expect(dialog).toHaveAccessibleDescription(text.description);
    await expect(
      document.querySelector("[data-dialog-overlay]"),
    ).not.toBeNull();
    // Focus moves into the dialog and stays there.
    const name = within(dialog).getByRole("textbox", {
      name: text.namePlaceholder,
    });
    await expect(name).toHaveFocus();
    await userEvent.type(name, "Ada");
    for (let i = 0; i < 4; i++) await userEvent.tab();
    await expect(dialog).toContainElement(
      document.activeElement as HTMLElement,
    );

    // Escape closes it and returns focus to the trigger.
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await expect(trigger).toHaveFocus();

    // DialogClose closes it.
    await userEvent.click(trigger);
    await userEvent.click(
      await screen.findByRole("button", { name: text.cancel }),
    );
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

    // So does the close button.
    await userEvent.click(trigger);
    await userEvent.click(await screen.findByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

    // And a click on the overlay.
    await userEvent.click(trigger);
    await screen.findByRole("dialog");
    await userEvent.click(document.querySelector("[data-dialog-overlay]")!);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  },
};

export const OpenChange: Story = {
  tags: ["!dev"],
  args: { onOpenChange: fn() },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: text.trigger }));
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(true);
    await userEvent.keyboard("{Escape}");
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(false);
  },
};
