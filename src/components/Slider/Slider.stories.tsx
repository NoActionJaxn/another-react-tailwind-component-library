import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Slider } from "./Slider";

const meta = {
  title: "Forms/Slider",
  component: Slider,
  parameters: docsParameters("Slider", { layout: "centered" }),
  args: {
    min: 0,
    defaultValue: [40],
    max: 100,
    step: 1,
    size: "md",
    colorScheme: "default",
    disabled: false,
    "aria-label": m.components.Slider.story.ariaLabel,
  },
  argTypes: docsArgTypes("Slider", ["size", "colorScheme", "disabled"], {
    disabled: { table: { defaultValue: { summary: "false" } } },
    step: { table: { defaultValue: { summary: "1" } } },
    max: { table: { defaultValue: { summary: "100" } } },
    min: { table: { defaultValue: { summary: "0" } } },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  }),
  render: (args) => (
    <div className="w-72">
      <Slider {...args} />
    </div>
  ),
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

const label = m.components.Slider.story.ariaLabel;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const thumb = canvas.getByRole("slider", { name: label });
    await expect(thumb).toHaveAttribute("aria-valuenow", "40");
    await expect(thumb).toHaveAttribute("aria-valuemin", "0");
    await expect(thumb).toHaveAttribute("aria-valuemax", "100");
    thumb.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(thumb).toHaveAttribute("aria-valuenow", "41");
    await userEvent.keyboard("{ArrowLeft}{ArrowLeft}");
    await expect(thumb).toHaveAttribute("aria-valuenow", "39");
    await userEvent.keyboard("{End}");
    await expect(thumb).toHaveAttribute("aria-valuenow", "100");
    await userEvent.keyboard("{ArrowRight}");
    await expect(thumb).toHaveAttribute("aria-valuenow", "100");
    await userEvent.keyboard("{Home}");
    await expect(thumb).toHaveAttribute("aria-valuenow", "0");
  },
};

// One thumb per value, each named by the slider's aria-label.
export const Range: Story = {
  tags: ["!dev"],
  args: { defaultValue: [20, 80], step: 10, onValueChange: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const thumbs = canvas.getAllByRole("slider", { name: label });
    await expect(thumbs).toHaveLength(2);
    thumbs[0]!.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(args.onValueChange).toHaveBeenLastCalledWith([30, 80]);
  },
};

// With no value, one thumb starts at min.
export const NoValue: Story = {
  tags: ["!dev"],
  args: { defaultValue: undefined, min: 10 },
  play: async ({ canvas }) => {
    const thumbs = canvas.getAllByRole("slider");
    await expect(thumbs).toHaveLength(1);
    await expect(thumbs[0]).toHaveAttribute("aria-valuenow", "10");
  },
};

export const Disabled: Story = {
  tags: ["!dev"],
  args: { disabled: true },
  play: async ({ canvas, userEvent }) => {
    const thumb = canvas.getByRole("slider");
    thumb.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(thumb).toHaveAttribute("aria-valuenow", "40");
  },
};
