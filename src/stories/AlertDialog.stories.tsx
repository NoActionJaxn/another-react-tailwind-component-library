import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

import AlertDialogComponent from "../components/AlertDialog";
import Button from "../components/Button.tsx";

const meta = {
  title: "Dialogs/AlertDialog",
  component: AlertDialogComponent,
  parameters: {
    docs: {
      description: {
        component: `A modal dialog built on Radix's AlertDialog primitive, interrupting the user to confirm a destructive or otherwise significant action. Unlike a plain Dialog, it can only be dismissed via the Cancel or Action buttons.

**States & classes** (see \`styles/components/alert-dialog.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-alert-dialog-overlay\` | backdrop, always | background, fade animation |
| \`.another-alert-dialog-content\` | dialog panel, always | layout, position, show/hide animation |
| \`.another-alert-dialog-content[data-variant="default"]\` | \`variant="default"\` | background, border, text color |
| \`.another-alert-dialog-title\` | heading, always | typography |
| \`.another-alert-dialog-description\` | supporting copy, always | text color |
| \`.another-alert-dialog-body\` | children content, always | text color |
| \`.another-alert-dialog-footer\` | button row, always | layout |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the dialog styling.",
    },
    title: {
      control: "text",
      description: "The dialog's heading.",
    },
    description: {
      control: "text",
      description: "Supporting copy under the title.",
    },
    cancel: {
      control: false,
      description: "Element rendered as the dismissive button.",
    },
    action: {
      control: false,
      description: "Element rendered as the confirming button.",
    },
  },
  args: {
    className: "",
    variant: "default",
    title: "Delete this project?",
    description:
      "This will permanently delete the project and all of its data. This action cannot be undone.",
  },
} satisfies Meta<typeof AlertDialogComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlertDialog: Story = {
  render: (args) => (
    <AlertDialogComponent
      {...args}
      trigger={<Button variant="outline">Delete project</Button>}
      cancel={<Button variant="outline">Cancel</Button>}
      action={<Button variant="default">Delete</Button>}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Delete project" });

    await userEvent.click(trigger);

    // Radix renders alertdialog content into a portal outside canvasElement.
    const dialog = await screen.findByRole("alertdialog");
    expect(
      within(dialog).getByText("Delete this project?"),
    ).toBeInTheDocument();

    await userEvent.click(
      within(dialog).getByRole("button", { name: "Cancel" }),
    );

    // Radix's Presence keeps the dialog mounted until its CSS exit
    // transition finishes, so it doesn't disappear synchronously.
    await waitFor(() =>
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument(),
    );
  },
};

export const WithBody: Story = {
  args: {
    title: "Leave without saving?",
    description: "You have unsaved changes on this page.",
  },
  render: (args) => (
    <AlertDialogComponent
      {...args}
      trigger={<Button variant="outline">Leave page</Button>}
      cancel={<Button variant="outline">Stay</Button>}
      action={<Button variant="default">Leave</Button>}
    >
      Changes you made in the last 10 minutes will be lost.
    </AlertDialogComponent>
  ),
};
