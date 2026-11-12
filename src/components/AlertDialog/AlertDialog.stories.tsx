import type { Meta, StoryObj } from "@storybook/react-vite";
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
    {},
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

export const Default: Story = {};
