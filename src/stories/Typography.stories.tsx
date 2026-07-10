import type { Meta, StoryObj } from "@storybook/react-vite";

import TypographyComponent from "../components/Typography";

const meta = {
  title: "Ui/Typography",
  component: TypographyComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A typography wrapper that applies default heading and paragraph sizing to its children, with selectable font families.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    font: {
      control: "radio",
      options: ["sans", "sans-serif", "mono", "accent"],
      description: "Font family applied to the typography scope.",
    },
    asChild: {
      control: "boolean",
      description: "Merge props onto the child element instead of a span.",
    },
  },
  args: {
    font: "sans",
    asChild: false,
  },
} satisfies Meta<typeof TypographyComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Typography: Story = {
  render: (args) => (
    <TypographyComponent {...args}>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      <p>
        The quick brown fox jumps over the lazy dog. This paragraph demonstrates
        the default body text styling.
      </p>
    </TypographyComponent>
  ),
};

export const SansSerif: Story = {
  args: {
    font: "sans-serif",
  },
  render: (args) => (
    <TypographyComponent {...args}>
      <h2>Sans Serif Heading</h2>
      <p>The quick brown fox jumps over the lazy dog.</p>
    </TypographyComponent>
  ),
};

export const Mono: Story = {
  args: {
    font: "mono",
  },
  render: (args) => (
    <TypographyComponent {...args}>
      <h2>Monospace Heading</h2>
      <p>The quick brown fox jumps over the lazy dog.</p>
    </TypographyComponent>
  ),
};

export const AsChild: Story = {
  args: {
    asChild: true,
  },
  render: (args) => (
    <TypographyComponent {...args}>
      <article>
        <h2>Rendered as an article</h2>
        <p>No extra span is added to the DOM when asChild is set.</p>
      </article>
    </TypographyComponent>
  ),
};
