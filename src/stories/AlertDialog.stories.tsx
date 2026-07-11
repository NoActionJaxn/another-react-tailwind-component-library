import type { Meta, StoryObj } from "@storybook/react-vite";

import AlertDialogComponent from "../components/AlertDialog";
import Button from "../components/Button.tsx";

const meta = {
  title: "Dialogs/AlertDialog",
  component: AlertDialogComponent,
  parameters: {
    docs: {
      description: {
        component:
          "A modal dialog built on Radix's AlertDialog primitive, interrupting the user to confirm a destructive or otherwise significant action. Unlike a plain Dialog, it can only be dismissed via the Cancel or Action buttons.",
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
