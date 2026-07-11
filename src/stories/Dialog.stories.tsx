import type { Meta, StoryObj } from "@storybook/react-vite";

import DialogComponent from "../components/Dialog";
import Button from "../components/Button.tsx";
import TextInput from "../components/TextInput.tsx";

const meta = {
  title: "Dialogs/Dialog",
  component: DialogComponent,
  parameters: {
    docs: {
      description: {
        component:
          "A modal dialog built on Radix's Dialog primitive. Unlike AlertDialog, it can be dismissed by clicking the overlay, pressing Escape, or the close button, making it suited to general-purpose content rather than a required confirmation.",
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
