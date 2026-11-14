import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import { Alert, AlertDescription, AlertTitle } from "./Alert";

const text = m.components.Alert.story;

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  parameters: docsParameters("Alert", { layout: "centered" }),
  args: {
    variant: "soft",
    status: "info",
    colorScheme: undefined,
    dismissLabel: "Dismiss",
  },
  argTypes: docsArgTypes("Alert", ["colorScheme"], {
    variant: {
      control: "inline-radio",
      options: ["soft", "solid", "outline"],
      table: { defaultValue: { summary: "soft" } },
    },
    status: {
      control: "inline-radio",
      options: ["info", "success", "warning", "danger"],
    },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: text.schemeDefault } },
    },
    icon: {
      control: false,
      table: { defaultValue: { summary: text.iconDefault } },
    },
    onDismiss: { control: false },
    dismissLabel: { table: { defaultValue: { summary: "Dismiss" } } },
    role: {
      control: false,
      table: { defaultValue: { summary: text.roleDefault } },
    },
  }),
  render: function Render(args) {
    const [open, setOpen] = useState(true);
    if (!open) {
      return <Button onClick={() => setOpen(true)}>{text.showAgain}</Button>;
    }
    return (
      <Alert
        {...args}
        onDismiss={() => setOpen(false)}
        className="w-md max-w-full"
      >
        <AlertTitle>{text.title}</AlertTitle>
        <AlertDescription>{text.description}</AlertDescription>
      </Alert>
    );
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    // info and success wait their turn: role="status".
    const alert = canvas.getByRole("status");
    await expect(alert).toHaveTextContent(text.title);
    await expect(alert).toHaveTextContent(text.description);
    await expect(
      canvasElement.querySelector("[data-status-icon]"),
    ).toHaveAttribute("aria-hidden", "true");
    await userEvent.click(canvas.getByRole("button", { name: "Dismiss" }));
    await expect(canvas.queryByRole("status")).toBeNull();
    await userEvent.click(canvas.getByRole("button", { name: text.showAgain }));
    await expect(canvas.getByRole("status")).toBeVisible();
  },
};

// warning and danger interrupt screen readers: role="alert".
export const Urgent: Story = {
  tags: ["!dev"],
  args: { status: "danger" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toHaveTextContent(text.title);
  },
};

// Without onDismiss there's no dismiss button; role and icon can be overridden.
export const Static: Story = {
  tags: ["!dev"],
  args: { status: "warning", role: "note", icon: false },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>{text.title}</AlertTitle>
    </Alert>
  ),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole("note")).toHaveTextContent(text.title);
    await expect(canvas.queryByRole("button")).toBeNull();
    await expect(canvasElement.querySelector("[data-status-icon]")).toBeNull();
  },
};

export const DismissCallback: Story = {
  tags: ["!dev"],
  args: { onDismiss: fn(), dismissLabel: "Close alert" },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>{text.title}</AlertTitle>
    </Alert>
  ),
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Close alert" }));
    await expect(args.onDismiss).toHaveBeenCalledTimes(1);
  },
};
