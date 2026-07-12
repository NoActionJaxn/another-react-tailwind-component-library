import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { cn } from "../lib/cn";

interface CnDemoProps {
  inputs: Parameters<typeof cn>;
}

const CnDemo = ({ inputs }: CnDemoProps) => {
  const result = cn(...inputs);

  return (
    <div className="flex flex-col gap-3 font-mono text-sm">
      <div>
        <span className="font-sans font-semibold">Input:</span>{" "}
        {JSON.stringify(inputs)}
      </div>
      <div>
        <span className="font-sans font-semibold">Output:</span> "{result}"
      </div>
      <div className={cn("rounded-sm border-2 border-default-300 p-4", result)}>
        Styled with the merged result
      </div>
    </div>
  );
};

const meta = {
  title: "Utilities/cn",
  component: CnDemo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Merges class names (via classnames) and resolves conflicting Tailwind utilities (via tailwind-merge), so a later conflicting class always wins instead of both being applied. Used throughout the library instead of hand-rolled class concatenation - see src/lib/cn.ts.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CnDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ConditionalClasses: Story = {
  args: {
    inputs: ["base-class", { "is-active": true, "is-disabled": false }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('"base-class is-active"')).toBeInTheDocument();
  },
};

export const ResolvesTailwindConflicts: Story = {
  args: {
    inputs: ["bg-red-500 p-2", "bg-blue-500"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Both inputs set a background color; tailwind-merge keeps only the
    // later one and drops the earlier conflicting "bg-red-500".
    expect(canvas.getByText('"p-2 bg-blue-500"')).toBeInTheDocument();
  },
};

export const IgnoresFalsyValues: Story = {
  args: {
    inputs: ["text-sm", undefined, false, "font-bold"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('"text-sm font-bold"')).toBeInTheDocument();
  },
};
