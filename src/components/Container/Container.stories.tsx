import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Container } from "./Container";

const meta = {
  title: "Containers/Container",
  component: Container,
  parameters: docsParameters("Container", { layout: "fullscreen" }),
  args: {
    colorScheme: "default",
    asChild: false,
    block: false,
  },
  argTypes: docsArgTypes(
    "Container",
    ["colorScheme", { asChild: "layoutAsChild" }, "block"],
    {
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
        table: { defaultValue: { summary: m.common.defaults.inherited } },
      },
      asChild: { table: { defaultValue: { summary: "false" } } },
      block: { table: { defaultValue: { summary: "false" } } },
    },
  ),
  render: (args) => (
    <div className="bg-default-100 py-6">
      <Container {...args}>
        <div className="rounded-md border border-dashed border-default-400 bg-white p-4 text-sm text-default-900">
          {m.components.Container.story.children}
        </div>
      </Container>
    </div>
  ),
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = m.components.Container.story;

// Centered, and stops growing at its maximum width.
export const Default: Story = {
  play: async ({ canvas, canvasElement }) => {
    const container =
      canvasElement.querySelector<HTMLElement>("[data-container]")!;
    await expect(container).toContainElement(canvas.getByText(text.children));
    const max = getComputedStyle(container).maxWidth;
    await expect(max).not.toBe("none");
    const box = container.getBoundingClientRect();
    const parent = container.parentElement!.getBoundingClientRect();
    await expect(
      Math.abs(box.left - parent.left - (parent.right - box.right)),
    ).toBeLessThanOrEqual(1);
  },
};

// block drops the maximum width.
export const Block: Story = {
  tags: ["!dev"],
  args: { block: true },
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector("[data-container]")!;
    await expect(getComputedStyle(container).maxWidth).toBe("none");
  },
};

// asChild renders the child element, e.g. a landmark.
export const AsChild: Story = {
  tags: ["!dev"],
  args: { asChild: true },
  render: (args) => (
    <Container {...args}>
      <main>{text.children}</main>
    </Container>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("main")).toHaveAttribute("data-container");
  },
};
