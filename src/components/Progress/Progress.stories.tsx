import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Progress } from "./Progress";

const meta = {
  title: "Data Display/Progress",
  component: Progress,
  parameters: docsParameters("Progress", { layout: "centered" }),
  args: {
    max: 100,
    value: 60,
    size: "md",
    colorScheme: "default",
    "aria-label": m.components.Progress.story.ariaLabel,
  },
  argTypes: docsArgTypes(
    "Progress",
    ["size", "colorScheme", { "aria-label": "ariaLabel" }],
    {
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
      },
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
      value: { control: { type: "range", min: 0, max: 100 } },
    },
  ),
  render: (args) => (
    <div className="w-72">
      <Progress {...args} />
    </div>
  ),
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

const indicator = (canvasElement: HTMLElement) =>
  canvasElement.querySelector<HTMLElement>("[data-progress] > *")!;

export const Default: Story = {
  play: async ({ canvas, canvasElement }) => {
    const bar = canvas.getByRole("progressbar", {
      name: m.components.Progress.story.ariaLabel,
    });
    await expect(bar).toHaveAttribute("aria-valuenow", "60");
    await expect(bar).toHaveAttribute("aria-valuemax", "100");
    await expect(bar).toHaveAttribute("data-state", "loading");
    // The indicator fills 60% of the track.
    await expect(indicator(canvasElement).style.transform).toBe(
      "translateX(-40%)",
    );
  },
};

export const CustomMax: Story = {
  tags: ["!dev"],
  args: { value: 50, max: 200 },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole("progressbar")).toHaveAttribute(
      "aria-valuemax",
      "200",
    );
    await expect(indicator(canvasElement).style.transform).toBe(
      "translateX(-75%)",
    );
  },
};

export const Complete: Story = {
  tags: ["!dev"],
  args: { value: 100 },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole("progressbar")).toHaveAttribute(
      "data-state",
      "complete",
    );
    await expect(indicator(canvasElement).style.transform).toBe(
      "translateX(0%)",
    );
  },
};

// No value: indeterminate, and the indicator stays empty.
export const Indeterminate: Story = {
  tags: ["!dev"],
  args: { value: null },
  play: async ({ canvas, canvasElement }) => {
    const bar = canvas.getByRole("progressbar");
    await expect(bar).toHaveAttribute("data-state", "indeterminate");
    await expect(bar).not.toHaveAttribute("aria-valuenow");
    await expect(indicator(canvasElement).style.transform).toBe(
      "translateX(-100%)",
    );
  },
};
