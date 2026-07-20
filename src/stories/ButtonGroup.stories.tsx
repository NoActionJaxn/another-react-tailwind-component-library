import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Button } from "../components/Button";
import ButtonGroupComponent from "../components/ButtonGroup";

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroupComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Groups Button components edge-to-edge into a single connected control.

**States & classes** (see \`styles/components/button-group.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-button-group\` | root element, always | layout |
| \`.another-button-group > .another-button\` | each child button, always | border, corner radius |
| \`.another-button-group > .another-button:first-child\\|:last-child\` | first/last child | outer corner radius, outer border |
| \`.another-button-group > .another-button:focus\` | a child button focused | stacking order |`,
      },
    },
  },
  tags: ["autodocs"],
  args: {
    className: "",
    block: false,
    icon: false,
    size: "md",
    variant: "outline",
  },
  argTypes: {
    children: {
      control: false,
      description:
        "One or more Button elements to group. Each child's block, icon, size, and variant are overridden by the group's own props unless the child sets its own.",
    },
    block: {
      control: "boolean",
      description: "Makes the group full width.",
    },
    icon: {
      control: "boolean",
      description: "Renders every child as a square icon-like button.",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size applied to every child button.",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "outline", "ghost", "link"],
      description: "Visual style variant applied to every child button.",
    },
  },
} satisfies Meta<typeof ButtonGroupComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonGroup: Story = {
  args: {
    block: false,
    children: [
      <Button key="first">First</Button>,
      <Button key="second">Second</Button>,
      <Button key="third" variant="default">
        third
      </Button>,
      <Button key="fourth" variant="default">
        Fourth
      </Button>,
      <Button key="fifth" variant="default">
        Fifth
      </Button>,
    ],
    icon: false,
    size: "md",
    variant: "outline",
  },
  render: (args) => (
    <ButtonGroupComponent {...args}>{args.children}</ButtonGroupComponent>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Buttons that don't specify their own variant inherit the group's.
    expect(canvas.getByRole("button", { name: "First" })).toHaveAttribute(
      "data-variant",
      "outline",
    );
    // "third"/"Fourth"/"Fifth" pass their own variant="default", which
    // overrides the group's variant="outline".
    expect(canvas.getByRole("button", { name: "third" })).toHaveAttribute(
      "data-variant",
      "default",
    );
  },
};
