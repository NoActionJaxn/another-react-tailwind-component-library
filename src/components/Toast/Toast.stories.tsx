import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { useState } from "react";
import { Button } from "../Button";
import {
  Toast,
  type ToastProps,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./Toast";

const meta = {
  title: "Overlays/Toast",
  component: Toast,
  parameters: docsParameters("Toast", { layout: "centered" }),
  args: { colorScheme: "default" },
  argTypes: docsArgTypes("Toast", ["colorScheme"], {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
  }),
  render: function Render(args: ToastProps) {
    const [open, setOpen] = useState(false);
    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)}>
          {m.components.Toast.story.trigger}
        </Button>
        <Toast {...args} open={open} onOpenChange={setOpen}>
          <ToastTitle>{m.components.Toast.story.title}</ToastTitle>
          <ToastDescription>
            {m.components.Toast.story.description}
          </ToastDescription>
          <ToastAction altText={m.components.Toast.story.actionAltText}>
            {m.components.Toast.story.action}
          </ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
