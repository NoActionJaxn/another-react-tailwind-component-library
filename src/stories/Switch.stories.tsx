import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import SwitchComponent from "../components/Switch";

const meta = {
  title: "Components/Switch",
  component: SwitchComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `An accessible toggle switch with an optional label.

**States & classes** (see \`styles/components/switch.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-switch\` | root track, always | shape, border, focus ring |
| \`.another-switch:disabled\` | disabled | opacity |
| \`.another-switch-thumb\` | the sliding knob, always | background |
| \`.another-switch[data-variant="default"]\` | \`variant="default"\`, off | border, background |
| \`.another-switch[data-variant="default"]:not(:disabled):hover\` | hovering, off, not disabled | background |
| \`.another-switch[data-variant="default"][data-state="checked"]\` | on | background |
| \`.another-switch[data-variant="default"][data-state="checked"]:not(:disabled):hover\` | hovering, on, not disabled | background |
| \`.another-switch[data-variant="default"] .another-switch-thumb\` | \`variant="default"\` | thumb border |
| \`.another-switch[data-size="sm"\\|"md"\\|"lg"]\` | \`size\` prop | track and thumb size, thumb travel distance |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label rendered alongside the switch.",
    },
    reverse: {
      control: "boolean",
      description: "Reverses the flex direction of the switch and label.",
    },
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the switch styling.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "The size of the switch.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the switch.",
    },
    defaultChecked: {
      control: "boolean",
      description: "Whether the switch is on by default.",
    },
  },
  args: {
    label: "Airplane mode",
    reverse: false,
    variant: "default",
    size: "md",
    disabled: false,
    defaultChecked: false,
  },
} satisfies Meta<typeof SwitchComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Switch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch", { name: "Airplane mode" });

    await expect(toggle).not.toBeChecked();

    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
  },
};
