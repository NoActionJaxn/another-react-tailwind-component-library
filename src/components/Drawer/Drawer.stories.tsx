import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor } from "storybook/test";
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
    await userEvent.click(canvas.getByRole("button", { name: text.trigger }));
    const drawer = await screen.findByRole("dialog", { name: text.title });
    await expect(drawer).toHaveAttribute("data-side", "right");
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  },
};
