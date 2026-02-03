import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SaveDialog from "../components/SaveDialog";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

const meta: Meta<typeof SaveDialog> = {
  title: "Components/SaveDialog",
  component: SaveDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SaveDialog>;

export const Default: Story = {
  args: {
    title: "Save Changes",
    description: "Are you sure you want to save these changes?",
    trigger: <Button>Open Save Dialog</Button>,
    children: <p>Your changes will be saved to the database.</p>,
  },
};

export const EditProfile: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <SaveDialog
        open={open}
        onOpenChange={setOpen}
        trigger={<Button variant="primary">Edit Profile</Button>}
        title="Edit Profile"
        description="Make changes to your profile here."
        onSave={() => console.log("Saved!")}
      >
        <div className="space-y-4">
          <TextInput label="Name" placeholder="Enter your name" />
          <TextInput label="Email" placeholder="Enter your email" type="email" />
        </div>
      </SaveDialog>
    );
  },
};

export const CustomButtonText: Story = {
  args: {
    title: "Publish Document",
    description: "This will make your document visible to everyone.",
    trigger: <Button variant="primary">Publish</Button>,
    children: <p>Are you ready to publish this document?</p>,
    saveText: "Publish",
  },
};

export const WithCallbacks: Story = {
  render: () => {
    const [result, setResult] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    return (
      <div className="space-y-4">
        <SaveDialog
          open={open}
          onOpenChange={setOpen}
          trigger={<Button>Open Dialog</Button>}
          title="Confirm Save"
          description="Click save to see the callback result."
          onSave={() => setResult("Changes saved!")}
        >
          <p>Your changes are ready to be saved.</p>
        </SaveDialog>
        {result && (
          <p className="text-sm text-neutral-600">
            Result: <span className="font-medium">{result}</span>
          </p>
        )}
      </div>
    );
  },
};

export const SaveDisabled: Story = {
  render: () => {
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    return (
      <SaveDialog
        open={open}
        onOpenChange={setOpen}
        trigger={<Button>Edit Settings</Button>}
        title="Edit Settings"
        description="Fill in all required fields to save."
        saveDisabled={!name.trim()}
      >
        <TextInput
          label="Name (required)"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </SaveDialog>
    );
  },
};

export const FormSubmission: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [saved, setSaved] = useState(false);
    return (
      <div className="space-y-4">
        <SaveDialog
          open={open}
          onOpenChange={setOpen}
          trigger={<Button variant="success">Create New Item</Button>}
          title="Create New Item"
          saveText="Create"
          onSave={() => setSaved(true)}
        >
          <div className="space-y-4">
            <TextInput label="Title" placeholder="Enter title" />
            <TextInput label="Description" placeholder="Enter description" />
          </div>
        </SaveDialog>
        {saved && (
          <div className="p-3 rounded-md bg-success-50 text-success-700 text-sm">
            Item created successfully!
            <button
              onClick={() => setSaved(false)}
              className="ml-2 underline"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    );
  },
};
