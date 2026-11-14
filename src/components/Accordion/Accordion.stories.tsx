import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

const meta = {
  title: "Data Display/Accordion",
  component: Accordion,
  parameters: docsParameters("Accordion", { layout: "centered" }),
  args: { type: "single", collapsible: true, colorScheme: "default" },
  argTypes: docsArgTypes("Accordion", ["colorScheme"], {
    collapsible: { table: { defaultValue: { summary: "false" } } },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
  }),
  render: (args) => (
    <Accordion {...args} className="w-80">
      <AccordionItem value="1">
        <AccordionTrigger>
          {m.components.Accordion.story.question1}
        </AccordionTrigger>
        <AccordionContent>
          {m.components.Accordion.story.answer1}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger>
          {m.components.Accordion.story.question2}
        </AccordionTrigger>
        <AccordionContent>
          {m.components.Accordion.story.answer2}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = m.components.Accordion.story;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const first = canvas.getByRole("button", { name: text.question1 });
    const second = canvas.getByRole("button", { name: text.question2 });
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.queryByText(text.answer1)).toBeNull();
    // Triggers sit in headings.
    await expect(canvas.getAllByRole("heading")).toHaveLength(2);

    await userEvent.click(first);
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await expect(
      canvas.getByRole("region", { name: text.question1 }),
    ).toHaveTextContent(text.answer1);
    // Single: opening another closes the first.
    await userEvent.click(second);
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(first).toHaveAttribute("aria-expanded", "false");
    // Collapsible: the open item closes again.
    await userEvent.click(second);
    await expect(second).toHaveAttribute("aria-expanded", "false");

    // Arrow keys move between triggers.
    await userEvent.keyboard("{ArrowUp}");
    await expect(first).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(first).toHaveAttribute("aria-expanded", "true");
  },
};

export const Multiple: Story = {
  tags: ["!dev"],
  args: { type: "multiple", defaultValue: ["1"] } as never,
  play: async ({ canvas, userEvent }) => {
    const first = canvas.getByRole("button", { name: text.question1 });
    const second = canvas.getByRole("button", { name: text.question2 });
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(second);
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await expect(second).toHaveAttribute("aria-expanded", "true");
  },
};

// Not collapsible: the open item stays open.
export const NotCollapsible: Story = {
  tags: ["!dev"],
  args: { collapsible: false, defaultValue: "1" } as never,
  play: async ({ canvas, userEvent }) => {
    const first = canvas.getByRole("button", { name: text.question1 });
    await userEvent.click(first);
    await expect(first).toHaveAttribute("aria-expanded", "true");
  },
};
