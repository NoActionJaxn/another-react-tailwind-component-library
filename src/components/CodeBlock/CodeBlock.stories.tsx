import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, spyOn } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { CodeBlock } from "./CodeBlock";

const meta = {
  title: "Components/CodeBlock",
  component: CodeBlock,
  parameters: docsParameters("CodeBlock", { layout: "padded" }),
  args: {
    children: m.components.CodeBlock.story.children,
    variant: "soft",
    size: "md",
    colorScheme: "default",
    copyable: true,
    copyLabel: "Copy",
    copiedLabel: "Copied",
  },
  argTypes: docsArgTypes("CodeBlock", ["variant", "size", "colorScheme"], {
    variant: {
      control: "inline-radio",
      options: ["solid", "soft", "outline"],
      table: { defaultValue: { summary: "soft" } },
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
    copyable: { table: { defaultValue: { summary: "true" } } },
    copyLabel: { table: { defaultValue: { summary: "Copy" } } },
    copiedLabel: { table: { defaultValue: { summary: "Copied" } } },
  }),
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const writeText = spyOn(
      navigator.clipboard,
      "writeText",
    ).mockResolvedValue();
    try {
      await userEvent.click(canvas.getByRole("button", { name: "Copy" }));
      await expect(writeText).toHaveBeenCalledWith(
        m.components.CodeBlock.story.children,
      );
      await expect(
        canvas.getByRole("button", { name: "Copied" }),
      ).toBeInTheDocument();
    } finally {
      writeText.mockRestore();
    }
  },
};
