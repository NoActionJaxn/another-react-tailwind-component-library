import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { cnWhitelisted } from "../lib/cn";

interface CnWhitelistedDemoProps {
  whitelist: string[];
  inputs: Parameters<typeof cnWhitelisted>[1][];
}

const CnWhitelistedDemo = ({ whitelist, inputs }: CnWhitelistedDemoProps) => {
  const result = cnWhitelisted(whitelist, ...inputs);

  return (
    <div className="flex flex-col gap-3 font-mono text-sm">
      <div>
        <span className="font-sans font-semibold">Whitelist:</span>{" "}
        {JSON.stringify(whitelist)}
      </div>
      <div>
        <span className="font-sans font-semibold">Input:</span>{" "}
        {JSON.stringify(inputs)}
      </div>
      <div>
        <span className="font-sans font-semibold">Output:</span> "{result}"
      </div>
    </div>
  );
};

const meta = {
  title: "Utilities/cnWhitelisted",
  component: CnWhitelistedDemo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Merges class names like cn(), then drops any class that isn't in the given whitelist (matched by exact name or `<allowed>-` prefix) - except another- prefixed classes, which are always allowed. Used to sanitize a caller-supplied className prop down to a safe subset (e.g. only allowing width utilities), rather than accepting arbitrary classes that could break a component's layout.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CnWhitelistedDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FiltersToWhitelist: Story = {
  args: {
    whitelist: ["text"],
    inputs: ["another-button", "text-lg", "bg-red-500"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // "bg-red-500" is dropped - "bg" isn't in the whitelist - while the
    // another- prefixed class is always kept regardless of the whitelist.
    expect(canvas.getByText('"another-button text-lg"')).toBeInTheDocument();
  },
};

export const AllowsOnlyWidthUtilities: Story = {
  args: {
    whitelist: ["w"],
    inputs: ["another-input", "w-full", "h-10", "p-2"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('"another-input w-full"')).toBeInTheDocument();
  },
};
