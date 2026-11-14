import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./Select";

const meta = {
  title: "Forms/Select",
  component: SelectTrigger,
  parameters: docsParameters("Select", { layout: "centered" }),
  args: {
    variant: "outline",
    size: "md",
    colorScheme: "default",
    "aria-label": m.components.Select.story.ariaLabel,
  },
  argTypes: docsArgTypes(
    "Select",
    ["variant", "size", "colorScheme", { "aria-label": "ariaLabel" }],
    {
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
      },
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
      variant: {
        control: "inline-radio",
        options: ["outline", "soft", "ghost"],
      },
    },
  ),
  render: (args) => (
    <div className="w-60">
      <Select>
        <SelectTrigger {...args}>
          <SelectValue placeholder={m.components.Select.story.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{m.components.Select.story.ariaLabel}</SelectLabel>
            <SelectItem value="apple">
              {m.components.Select.story.apple}
            </SelectItem>
            <SelectItem value="banana">
              {m.components.Select.story.banana}
            </SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectItem value="carrot" disabled>
            {m.components.Select.story.carrot}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
} satisfies Meta<typeof SelectTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = m.components.Select.story;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("combobox", { name: text.ariaLabel });
    await expect(trigger).toHaveTextContent(text.placeholder);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(trigger);
    // The list is portaled to <body>, outside the canvas.
    const listbox = await screen.findByRole("listbox");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(
      screen.getByRole("option", { name: text.apple }),
    ).toBeVisible();
    await expect(
      screen.getByRole("option", { name: text.carrot }),
    ).toHaveAttribute("aria-disabled", "true");
    await expect(listbox).toHaveAttribute("data-menu-content");

    await userEvent.click(screen.getByRole("option", { name: text.banana }));
    await waitFor(() => expect(screen.queryByRole("listbox")).toBeNull());
    await expect(trigger).toHaveTextContent(text.banana);

    // Keyboard: open, move to the next item, pick it.
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    await screen.findByRole("listbox");
    await expect(
      screen.getByRole("option", { name: text.banana }),
    ).toHaveAttribute("aria-selected", "true");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("listbox")).toBeNull());
    await expect(trigger).toHaveTextContent(text.banana);
  },
};
