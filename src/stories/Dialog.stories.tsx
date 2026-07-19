import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

import DialogComponent from "../components/Dialog";
import Button from "../components/Button.tsx";
import TextInput from "../components/TextInput.tsx";

const meta = {
  title: "Dialogs/Dialog",
  component: DialogComponent,
  parameters: {
    docs: {
      description: {
        component: `A modal dialog built on Radix's Dialog primitive. Unlike AlertDialog, it can be dismissed by clicking the overlay, pressing Escape, or the close button, making it suited to general-purpose content rather than a required confirmation.

**States & classes** (see \`styles/components/dialog.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-dialog-overlay\` | backdrop, always | background, fade animation |
| \`.another-dialog-content\` | dialog panel, always | layout, position, show/hide animation |
| \`.another-dialog-content[data-variant="default"]\` | \`variant="default"\` | background, border, text color |
| \`.another-dialog-close\` | close button, always | position |
| \`.another-dialog-title\` | heading, always | typography |
| \`.another-dialog-description\` | supporting copy, always | text color |
| \`.another-dialog-body\` | children content, always | text color |
| \`.another-dialog-footer\` | button row, always | layout |`,
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
  },
  args: {
    variant: "default",
    title: "Edit profile",
    description: "Update your profile details below.",
  },
} satisfies Meta<typeof DialogComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Dialog: Story = {
  render: (args) => (
    <DialogComponent
      {...args}
      trigger={<Button variant="default">Edit profile</Button>}
      footer={
        <>
          <Button variant="outline">Cancel</Button>
          <Button variant="default">Save changes</Button>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <TextInput label="Name" defaultValue="Jackson Hermitt" />
        <TextInput label="Email" defaultValue="jahermitt@gmail.com" />
      </div>
    </DialogComponent>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Edit profile" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.click(trigger);

    // Radix renders dialog content into a portal outside canvasElement.
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText("Edit profile")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Close" }));

    // Radix's Presence keeps the dialog mounted until its CSS exit
    // transition finishes, so it doesn't disappear synchronously.
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  },
};

export const WithoutFooter: Story = {
  args: {
    title: "Release notes",
    description: "What changed in this version.",
  },
  render: (args) => (
    <DialogComponent
      {...args}
      trigger={<Button variant="outline">View release notes</Button>}
    >
      Added the Dialog and AlertDialog components, both built on Radix
      primitives.
    </DialogComponent>
  ),
};
