import type { Meta, StoryObj } from "@storybook/react-vite";
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
  title: "Components/Toast",
  component: Toast,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { colorScheme: "default" },
  argTypes: {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
  },
  render: function Render(args: ToastProps) {
    const [open, setOpen] = useState(false);
    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)}>Show toast</Button>
        <Toast {...args} open={open} onOpenChange={setOpen}>
          <ToastTitle>Saved</ToastTitle>
          <ToastDescription>Your changes were saved.</ToastDescription>
          <ToastAction altText="Undo the save">Undo</ToastAction>
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
