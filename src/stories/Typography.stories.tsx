import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import TypographyComponent from "../components/Typography";

const meta = {
  title: "Components/Typography",
  component: TypographyComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `A typography component that applies default sizing for the element it renders as, with selectable font families.

**States & classes** (see \`styles/components/typography.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-typography\` | root element, always | text color |
| \`.another-typography[data-font="sans"\\|"sans-serif"\\|"mono"\\|"accent"]\` | \`font\` prop | font family |
| \`h1.another-typography\` .. \`h6.another-typography\`, \`p.another-typography\` | rendered as that tag via \`as\` | type size, weight, leading |
| \`.another-typography code\` | inline \`<code>\` inside, always | background |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["span", "p", "h1", "h2", "h3", "h4", "h5", "h6"],
      description: "The element rendered.",
    },
    font: {
      control: "radio",
      options: ["sans", "sans-serif", "mono", "accent"],
      description: "Font family applied to the typography scope.",
    },
    children: {
      control: "text",
      description: "The text content.",
    },
  },
  args: {
    as: "span",
    font: "sans",
    children: "The quick brown fox jumps over the lazy dog.",
  },
} satisfies Meta<typeof TypographyComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = canvas.getByText(
      "The quick brown fox jumps over the lazy dog.",
    );

    expect(text.tagName).toBe("SPAN");
    expect(text).toHaveAttribute("data-font", "sans");
  },
};

export const Titles: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <TypographyComponent as="h1">Heading 1</TypographyComponent>
      <TypographyComponent as="h2">Heading 2</TypographyComponent>
      <TypographyComponent as="h3">Heading 3</TypographyComponent>
      <TypographyComponent as="h4">Heading 4</TypographyComponent>
      <TypographyComponent as="h5">Heading 5</TypographyComponent>
      <TypographyComponent as="h6">Heading 6</TypographyComponent>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (let level = 1; level <= 6; level++) {
      expect(
        canvas.getByRole("heading", { level, name: `Heading ${level}` }),
      ).toBeInTheDocument();
    }
  },
};

export const Sans: Story = {
  args: {
    as: "h2",
    font: "sans",
    children: "Sans Heading",
  },
};

export const SansSerif: Story = {
  args: {
    as: "h2",
    font: "sans-serif",
    children: "Sans Serif Heading",
  },
};

export const Mono: Story = {
  args: {
    as: "h2",
    font: "mono",
    children: "Monospace Heading",
  },
};

export const Accent: Story = {
  args: {
    as: "h2",
    font: "accent",
    children: "Accent Heading",
  },
};

export const InlineFormatting: Story = {
  render: () => (
    <TypographyComponent as="p">
      This paragraph has <strong>strong</strong>, <b>bold</b>, <u>underlined</u>
      , <i>italic</i>, and <code>inline code</code> text.
    </TypographyComponent>
  ),
};
