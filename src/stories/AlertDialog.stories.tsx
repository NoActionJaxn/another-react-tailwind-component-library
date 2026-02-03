import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import AlertDialog from "../components/AlertDialog";
import Button from "../components/Button";

const meta: Meta<typeof AlertDialog> = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  args: {
    title: "Are you sure?",
    description: "This action cannot be undone.",
    trigger: <Button>Open Alert</Button>,
  },
};

export const DeleteConfirmation: Story = {
  args: {
    title: "Delete Item",
    description: "Are you sure you want to delete this item? This action cannot be undone.",
    trigger: <Button variant="danger">Delete</Button>,
    variant: "danger",
    confirmText: "Delete",
    cancelText: "Cancel",
  },
};

export const SaveConfirmation: Story = {
  args: {
    title: "Save Changes",
    description: "Do you want to save the changes you made to this document?",
    trigger: <Button variant="primary">Save</Button>,
    variant: "default",
    confirmText: "Save",
    cancelText: "Don't Save",
  },
};

export const LogoutConfirmation: Story = {
  args: {
    title: "Log Out",
    description: "Are you sure you want to log out? You will need to sign in again to access your account.",
    trigger: <Button variant="secondary">Log Out</Button>,
    confirmText: "Log Out",
    cancelText: "Stay Signed In",
  },
};

export const WithCallbacks: Story = {
  render: () => {
    const [result, setResult] = useState<string | null>(null);
    return (
      <div className="space-y-4">
        <AlertDialog
          title="Confirm Action"
          description="Click confirm or cancel to see the callback result."
          trigger={<Button>Open Alert</Button>}
          onConfirm={() => setResult("Confirmed!")}
          onCancel={() => setResult("Cancelled!")}
        />
        {result && (
          <p className="text-sm text-neutral-600">
            Result: <span className="font-medium">{result}</span>
          </p>
        )}
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button variant="danger" onClick={() => setOpen(true)} disabled={deleted}>
            {deleted ? "Deleted" : "Delete Account"}
          </Button>
          {deleted && (
            <Button variant="secondary" onClick={() => setDeleted(false)}>
              Reset
            </Button>
          )}
        </div>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          title="Delete Account"
          description="This will permanently delete your account and all associated data. This action cannot be undone."
          variant="danger"
          confirmText="Delete Account"
          onConfirm={() => {
            setDeleted(true);
            setOpen(false);
          }}
        />
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <AlertDialog
        title="Default Variant"
        description="This uses the default styling."
        trigger={<Button>Default</Button>}
        variant="default"
      />
      <AlertDialog
        title="Danger Variant"
        description="This uses the danger styling for destructive actions."
        trigger={<Button variant="danger">Danger</Button>}
        variant="danger"
        confirmText="Delete"
      />
    </div>
  ),
};

export const CustomButtonText: Story = {
  args: {
    title: "Discard Changes?",
    description: "You have unsaved changes. Are you sure you want to discard them?",
    trigger: <Button variant="secondary">Close Editor</Button>,
    cancelText: "Keep Editing",
    confirmText: "Discard",
    variant: "danger",
  },
};
