import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { docsArgTypes, docsParameters, format, m } from "../../docs/i18n";
import { Separator } from "../Separator";
import { ScrollArea } from "./ScrollArea";

const meta = {
  title: "Containers/ScrollArea",
  component: ScrollArea,
  parameters: docsParameters("ScrollArea", { layout: "centered" }),
  args: { colorScheme: "default", scrollbars: "vertical" },
  argTypes: docsArgTypes("ScrollArea", ["colorScheme"], {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    scrollbars: {
      control: "inline-radio",
      options: ["vertical", "horizontal", "both"],
      table: { defaultValue: { summary: "vertical" } },
    },
  }),
  render: (args) => (
    <ScrollArea
      {...args}
      className="h-56 w-48 rounded-md border border-default-300"
    >
      <div className="p-4 text-sm">
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i}>
            <div className="py-1.5">
              {format(m.components.ScrollArea.story.item, { n: i + 1 })}
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const viewport = (canvasElement: HTMLElement) =>
  canvasElement.querySelector<HTMLElement>(
    "[data-radix-scroll-area-viewport]",
  )!;

export const Default: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    const area = viewport(canvasElement);
    // The content overflows and scrolls inside the area.
    await expect(area.scrollHeight).toBeGreaterThan(area.clientHeight);
    area.scrollTop = area.scrollHeight;
    await waitFor(() => expect(area.scrollTop).toBeGreaterThan(0));
    // The scrollbar shows on hover, vertical only.
    await userEvent.hover(area);
    await waitFor(() =>
      expect(
        canvasElement.querySelector('[data-orientation="vertical"]'),
      ).not.toBeNull(),
    );
    await expect(
      canvasElement.querySelector(
        '[data-radix-scroll-area-viewport] ~ [data-orientation="horizontal"]',
      ),
    ).toBeNull();
    await expect(canvas.getByText("Tag 30")).toBeInTheDocument();
  },
};
