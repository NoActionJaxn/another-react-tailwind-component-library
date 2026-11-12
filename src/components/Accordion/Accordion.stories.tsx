import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: docsParameters("Accordion", { layout: "centered" }),
  args: { type: "single", collapsible: true, colorScheme: "default" },
  argTypes: docsArgTypes("Accordion", ["colorScheme"], {
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

export const Default: Story = {};
