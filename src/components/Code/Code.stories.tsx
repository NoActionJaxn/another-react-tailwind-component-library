import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, spyOn, waitFor } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Code } from "./Code";

const meta = {
  title: "Typography/Code",
  component: Code,
  parameters: docsParameters("Code", { layout: "centered" }),
  args: {
    children: m.components.Code.story.children,
    variant: "soft",
    size: "md",
    colorScheme: "default",
    copyable: true,
    copyLabel: "Copy",
    copiedLabel: "Copied",
  },
  argTypes: docsArgTypes("Code", ["variant", "size", "colorScheme"], {
    variant: {
      control: "inline-radio",
      options: ["soft", "outline"],
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
    copyable: { table: { defaultValue: { summary: "false" } } },
    copyLabel: { table: { defaultValue: { summary: "Copy" } } },
    copiedLabel: { table: { defaultValue: { summary: "Copied" } } },
  }),
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

const children = m.components.Code.story.children;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const writeText = spyOn(
      navigator.clipboard,
      "writeText",
    ).mockResolvedValue();
    try {
      await userEvent.click(canvas.getByRole("button", { name: "Copy" }));
      // Copies the code's text only.
      await expect(writeText).toHaveBeenCalledWith(children);
      await expect(
        canvas.getByRole("button", { name: "Copied" }),
      ).toBeInTheDocument();
    } finally {
      writeText.mockRestore();
    }
  },
};

// If the clipboard refuses, the button doesn't claim it copied.
export const CopyFails: Story = {
  tags: ["!dev"],
  play: async ({ canvas, userEvent }) => {
    const writeText = spyOn(navigator.clipboard, "writeText").mockRejectedValue(
      new Error("denied"),
    );
    try {
      await userEvent.click(canvas.getByRole("button", { name: "Copy" }));
      await expect(writeText).toHaveBeenCalled();
      await expect(canvas.getByRole("button", { name: "Copy" })).toBeVisible();
    } finally {
      writeText.mockRestore();
    }
  },
};

// "Copied" reverts once the timeout passes.
export const CopiedResets: Story = {
  tags: ["!dev"],
  args: { copyLabel: "Copy code", copiedLabel: "Code copied" },
  play: async ({ canvas, userEvent }) => {
    const writeText = spyOn(
      navigator.clipboard,
      "writeText",
    ).mockResolvedValue();
    try {
      await userEvent.click(canvas.getByRole("button", { name: "Copy code" }));
      await expect(
        canvas.getByRole("button", { name: "Code copied" }),
      ).toBeInTheDocument();
      await waitFor(
        () =>
          expect(
            canvas.getByRole("button", { name: "Copy code" }),
          ).toBeInTheDocument(),
        { timeout: 3000 },
      );
    } finally {
      writeText.mockRestore();
    }
  },
};

export const NotCopyable: Story = {
  tags: ["!dev"],
  args: { copyable: false },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(children)).toBeVisible();
    await expect(canvas.queryByRole("button")).toBeNull();
  },
};
