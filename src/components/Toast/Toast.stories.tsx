import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor, within } from "storybook/test";
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
  title: "Feedback/Toast",
  component: Toast,
  parameters: docsParameters("Toast", { layout: "centered" }),
  args: { status: "success", colorScheme: undefined },
  argTypes: docsArgTypes("Toast", ["colorScheme"], {
    status: {
      control: "inline-radio",
      options: ["info", "success", "warning", "danger"],
    },
    icon: {
      control: false,
      table: {
        defaultValue: { summary: m.components.Alert.story.iconDefault },
      },
    },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: {
        defaultValue: { summary: m.components.Alert.story.schemeDefault },
      },
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

const text = m.components.Toast.story;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(screen.queryByText(text.title)).toBeNull();
    await userEvent.click(canvas.getByRole("button", { name: text.trigger }));
    // Toasts render in the viewport, a labelled landmark.
    const region = screen.getByRole("region", { name: /Notifications/ });
    await waitFor(() =>
      expect(region.querySelector("[data-toast]")).not.toBeNull(),
    );
    const toast = region.querySelector<HTMLElement>("[data-toast]")!;
    await expect(toast).toHaveAttribute("data-state", "open");
    await expect(toast).toHaveTextContent(text.title);
    await expect(toast).toHaveTextContent(text.description);
    await expect(toast).toHaveAttribute("data-status", "success");

    await userEvent.click(within(toast).getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByText(text.title)).toBeNull());

    // The action closes it too.
    await userEvent.click(canvas.getByRole("button", { name: text.trigger }));
    await userEvent.click(
      await screen.findByRole("button", { name: text.action }),
    );
    await waitFor(() => expect(screen.queryByText(text.title)).toBeNull());
  },
};

// Closes on its own once its duration passes.
export const Duration: Story = {
  tags: ["!dev"],
  args: { duration: 300 },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: text.trigger }));
    await expect(await screen.findByText(text.title)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(text.title)).toBeNull(), {
      timeout: 2000,
    });
  },
};

// Escape closes the toast once focus is in the viewport.
export const KeyboardDismiss: Story = {
  tags: ["!dev"],
  args: { status: "danger" },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: text.trigger }));
    const action = await screen.findByRole("button", { name: text.action });
    action.focus();
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByText(text.title)).toBeNull());
  },
};
