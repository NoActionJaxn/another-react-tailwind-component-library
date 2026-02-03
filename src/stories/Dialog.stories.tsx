import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Dialog from "../components/Dialog";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    title: "Dialog Title",
    description: "This is a description of the dialog content.",
    trigger: <Button>Open Dialog</Button>,
    children: <p>This is the main content of the dialog.</p>,
  },
};

export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog
        open={open}
        onOpenChange={setOpen}
        trigger={<Button>Open Dialog</Button>}
        title="Save Changes"
        description="Are you sure you want to save these changes?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Save
            </Button>
          </>
        }
      >
        <p>Your changes will be saved to the database.</p>
      </Dialog>
    );
  },
};

export const FormDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog
        open={open}
        onOpenChange={setOpen}
        trigger={<Button>Edit Profile</Button>}
        title="Edit Profile"
        description="Make changes to your profile here."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Save Changes
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <TextInput label="Name" placeholder="Enter your name" />
          <TextInput label="Email" placeholder="Enter your email" type="email" />
        </div>
      </Dialog>
    );
  },
};

export const NoTitle: Story = {
  args: {
    trigger: <Button>Open Dialog</Button>,
    children: (
      <div className="text-center py-4">
        <p className="text-lg font-medium">Custom Content</p>
        <p className="text-neutral-600 mt-2">
          This dialog has no title or description, just custom content.
        </p>
      </div>
    ),
  },
};

export const LongContent: Story = {
  args: {
    title: "Terms and Conditions",
    trigger: <Button>View Terms</Button>,
    children: (
      <div className="max-h-64 overflow-y-auto space-y-4 text-sm text-neutral-600">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
          veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
          quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
      </div>
    ),
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open Programmatically</Button>
        </div>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="Controlled Dialog"
          description="This dialog is controlled externally."
        >
          <p>You can close this dialog by clicking the X, the overlay, or pressing Escape.</p>
        </Dialog>
        <p className="text-sm text-neutral-600">State: {open ? "Open" : "Closed"}</p>
      </div>
    );
  },
};
