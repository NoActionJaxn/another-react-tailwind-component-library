import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Button } from "../components/Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `A flexible button component that can render as a native button, anchor, or custom element while preserving your shared styling API.

**States & classes** (see \`styles/components/button.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-button\` | root element, always | layout, typography, focus ring |
| \`.another-button:disabled\` | \`disabled\` | opacity |
| \`.another-button[data-variant="default"]\` | \`variant="default"\` | background, border, text color |
| \`.another-button[data-variant="default"]:not(:disabled):hover\` | hovering, not disabled | background |
| \`.another-button[data-variant="outline"]\` | \`variant="outline"\` | border, text color |
| \`.another-button[data-variant="outline"]:not(:disabled):hover\` | hovering, not disabled | background |
| \`.another-button[data-variant="ghost"]\` | \`variant="ghost"\` | text color |
| \`.another-button[data-variant="ghost"]:not(:disabled):hover\` | hovering, not disabled | background |
| \`.another-button[data-variant="link"]\` | \`variant="link"\` | text color, underline |
| \`.another-button[data-variant="link"]:not(:disabled):hover\` | hovering, not disabled | text color |
| \`.another-button[data-size="sm"\\|"md"\\|"lg"]\` | \`size\` prop | padding, height, text size |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    asChild: {
      control: false,
      description:
        "Forward the button styles and props onto a single child element instead of rendering a wrapper button.",
    },
    children: {
      control: "text",
      description: "The content rendered inside the button or link.",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "outline", "ghost", "link"],
      description: "Visual style variant of the component.",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the component.",
    },
    disabled: {
      control: "boolean",
      description: "Disables interaction for button-like rendering.",
    },
    block: {
      control: "boolean",
      description: "Makes the component full width.",
    },
    icon: {
      control: "boolean",
      description:
        "Renders the component as a square icon-like button when appropriate.",
    },
    className: {
      control: "text",
      description: "Additional Tailwind classes to append.",
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      description:
        "Native button type attribute. Only used when rendering a button.",
    },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "md",
    disabled: false,
    type: "button",
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultButton: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Button" });

    await userEvent.click(button);

    expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const DisabledButton: Story = {
  args: {
    disabled: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Button" });

    expect(button).toBeDisabled();

    await userEvent.click(button);

    expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const IconButton: Story = {
  args: {
    children: "🔥",
    icon: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "🔥" });

    expect(button).toHaveAttribute("data-size", "md");
  },
};

export const AnchorButton: Story = {
  args: {
    asChild: true,
    children: "Learn more",
    variant: "link",
  },
  render: ({ children, ...rest }) => {
    return (
      <Button {...rest}>
        <a href="https://google.com/" target="_blank">
          {children}
        </a>
      </Button>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Learn more" });

    expect(link).toHaveAttribute("href", "https://google.com/");
    expect(link.tagName).toBe("A");
  },
};
