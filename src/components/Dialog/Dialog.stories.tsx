import type { Meta, StoryObj } from "@storybook/react-vite";
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
  title: "Components/Dialog",
  component: Dialog,
  parameters: docsParameters("Dialog", { layout: "centered" }),
  args: {},
  argTypes: docsArgTypes(
    "Dialog",
    ["open", "defaultOpen", "onOpenChange", "modal"],
    {},
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

export const Default: Story = {};
