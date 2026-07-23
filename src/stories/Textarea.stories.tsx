import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import TextareaComponent from "../components/Textarea";

const meta = {
  title: "Components/Textarea",
  component: TextareaComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `A multi-line text input with an optional label, sized like \`TextInput\` but for longer-form content.

**States & classes** (see \`styles/components/textarea.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-textarea-group\` | wrapper around label + textarea, always | layout |
| \`.another-textarea-group[data-orientation="horizontal"]\` | \`orientation="horizontal"\` | flex direction |
| \`.another-textarea\` | the textarea element, always | shape, border, min size, focus ring |
| \`.another-textarea[data-variant="default"]\` | \`variant="default"\` | border, background, text color |
| \`.another-textarea[data-variant="default"]:not(:disabled):hover\` | hovering, not disabled | background |
| \`.another-textarea[data-variant="default"]:focus\` | focused | background, focus ring |
| \`.another-textarea[data-size="sm"\\|"md"\\|"lg"]\` | \`size\` prop | font size |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label rendered above (or beside) the textarea.",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Layout of the textarea relative to its label.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "The size of the textarea.",
    },
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the textarea styling.",
    },
    block: {
      control: "boolean",
      description: "Stretches the textarea to fill its container's width.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the textarea.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when empty.",
    },
  },
  args: {
    label: "Message",
    orientation: "vertical",
    size: "md",
    variant: "default",
    block: false,
    disabled: false,
    placeholder: "Tell us what you think...",
  },
} satisfies Meta<typeof TextareaComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Textarea: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByLabelText("Message");

    await userEvent.type(textarea, "Hello there");
    await expect(textarea).toHaveValue("Hello there");
  },
};
