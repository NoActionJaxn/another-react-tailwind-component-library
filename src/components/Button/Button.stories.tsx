import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { expect, fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Actions/Button",
  component: Button,
  parameters: docsParameters("Button", { layout: "centered" }),
  args: {
    children: m.components.Button.story.children,
    variant: "solid",
    size: "md",
    colorScheme: "default",
    disabled: false,
    block: false,
    asChild: false,
    onClick: fn(),
  },
  argTypes: docsArgTypes(
    "Button",
    ["variant", "size", "colorScheme", "disabled", "block"],
    {
      variant: {
        control: "inline-radio",
        options: ["solid", "soft", "outline", "ghost"],
        table: { defaultValue: { summary: "solid" } },
      },
      size: {
        control: "inline-radio",
        options: ["sm", "md", "lg"],
        table: { defaultValue: { summary: "md" } },
      },
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
        table: { defaultValue: { summary: m.common.defaults.inherited } },
      },
      disabled: { table: { defaultValue: { summary: "false" } } },
      block: { table: { defaultValue: { summary: "false" } } },
      asChild: { table: { defaultValue: { summary: "false" } } },
    },
  ),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", {
      name: m.components.Button.story.children,
    });
    // Doesn't submit forms unless asked to.
    await expect(button).toHaveAttribute("type", "button");
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Disabled: Story = {
  tags: ["!dev"],
  args: { disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button");
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

// A link can't be `disabled`: it gets aria-disabled, leaves the tab order and ignores clicks.
export const DisabledAsChild: Story = {
  tags: ["!dev"],
  args: { asChild: true, disabled: true },
  render: (args) => (
    <Button {...args}>
      <a href="#disabled">{m.components.Button.story.children}</a>
    </Button>
  ),
  play: async ({ args, canvas, userEvent }) => {
    const link = canvas.getByRole("link");
    await expect(link).toHaveAttribute("aria-disabled", "true");
    await expect(link).toHaveAttribute("tabindex", "-1");
    await expect(link).not.toHaveAttribute("type");
    // Record whether the button blocked the link, then keep the test page from navigating.
    let prevented: boolean | undefined;
    const check = (event: Event) => {
      prevented = event.defaultPrevented;
      event.preventDefault();
    };
    window.addEventListener("click", check);
    try {
      await userEvent.click(link);
    } finally {
      window.removeEventListener("click", check);
    }
    await expect(prevented).toBe(true);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
