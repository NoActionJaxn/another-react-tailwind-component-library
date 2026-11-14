import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor, within } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import { TextInput } from "../TextInput";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./Drawer";

const text = m.components.Drawer.story;

const meta = {
  title: "Dialogs/Drawer",
  component: DrawerContent,
  parameters: docsParameters("Drawer", { layout: "centered" }),
  args: {
    side: "right",
    size: "md",
    colorScheme: "default",
    showClose: true,
    closeLabel: "Close",
  },
  argTypes: docsArgTypes("Drawer", ["size", "colorScheme"], {
    side: {
      control: "inline-radio",
      options: ["left", "right", "top", "bottom"],
      table: { defaultValue: { summary: "right" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    showClose: { table: { defaultValue: { summary: "true" } } },
    closeLabel: { table: { defaultValue: { summary: "Close" } } },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
  }),
  render: (args) => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>{text.trigger}</Button>
      </DrawerTrigger>
      <DrawerContent {...args}>
        <DrawerHeader>
          <DrawerTitle>{text.title}</DrawerTitle>
          <DrawerDescription>{text.description}</DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="flex flex-col gap-4">
          <TextInput block label={text.name} />
          <TextInput block type="email" label={text.email} />
          <p className="text-sm">{text.body}</p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">{text.cancel}</Button>
          </DrawerClose>
          <Button>{text.save}</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
} satisfies Meta<typeof DrawerContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: text.trigger });
    await userEvent.click(trigger);
    const drawer = await screen.findByRole("dialog", { name: text.title });
    await expect(drawer).toHaveAttribute("data-side", "right");
    await expect(drawer).toHaveAccessibleDescription(text.description);
    await expect(
      document.querySelector("[data-drawer-overlay]"),
    ).not.toBeNull();
    // Focus moves into the drawer.
    await expect(
      within(drawer).getByRole("textbox", { name: text.name }),
    ).toHaveFocus();
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await expect(trigger).toHaveFocus();

    await userEvent.click(trigger);
    await userEvent.click(
      await screen.findByRole("button", { name: text.cancel }),
    );
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

    await userEvent.click(trigger);
    await screen.findByRole("dialog");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  },
};

export const Left: Story = {
  tags: ["!dev"],
  args: { side: "left", size: "lg", showClose: false },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: text.trigger }));
    const drawer = await screen.findByRole("dialog", { name: text.title });
    await expect(drawer).toHaveAttribute("data-side", "left");
    await expect(drawer).toHaveAttribute("data-size", "lg");
    await expect(
      within(drawer).queryByRole("button", { name: "Close" }),
    ).toBeNull();
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  },
};

export const CloseLabel: Story = {
  tags: ["!dev"],
  args: { closeLabel: "Close drawer" },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: text.trigger }));
    await userEvent.click(
      await screen.findByRole("button", { name: "Close drawer" }),
    );
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  },
};
