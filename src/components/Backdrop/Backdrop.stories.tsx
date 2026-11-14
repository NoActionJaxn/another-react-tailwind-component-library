import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, waitFor } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import { Backdrop } from "./Backdrop";

const text = m.components.Backdrop.story;

const meta = {
  title: "Overlays/Backdrop",
  component: Backdrop,
  parameters: docsParameters("Backdrop", { layout: "centered" }),
  args: {
    blur: true,
    // Covers only the example box, not the whole docs page.
    contained: true,
    colorScheme: "default",
    asChild: false,
  },
  argTypes: docsArgTypes("Backdrop", ["colorScheme"], {
    open: {
      control: false,
      table: { defaultValue: { summary: "true" } },
    },
    blur: { table: { defaultValue: { summary: "false" } } },
    contained: { table: { defaultValue: { summary: "false" } } },
    asChild: { table: { defaultValue: { summary: "false" } } },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
  }),
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative flex w-80 flex-col items-start gap-3 rounded-lg border border-stone-300 p-5">
        <p className="text-sm text-stone-700">{text.content}</p>
        <Button onClick={() => setOpen(true)}>{text.show}</Button>
        <Backdrop
          {...args}
          open={open}
          onClick={() => setOpen(false)}
          className="rounded-lg"
        />
      </div>
    );
  },
} satisfies Meta<typeof Backdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    const find = () => canvasElement.querySelector("[data-backdrop]");
    await expect(find()).toBeNull();
    await userEvent.click(canvas.getByRole("button", { name: text.show }));
    const backdrop = find();
    await expect(backdrop).toHaveAttribute("data-state", "open");
    await userEvent.click(backdrop!);
    // Unmounts once the fade-out ends.
    await waitFor(() => expect(find()).toBeNull());
  },
};
