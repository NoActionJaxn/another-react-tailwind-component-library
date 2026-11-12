import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { type: "single", collapsible: true, colorScheme: "default" },
  argTypes: {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
  },
  render: (args) => (
    <Accordion {...args} className="w-80">
      <AccordionItem value="1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It follows the WAI-ARIA pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger>Is it themeable?</AccordionTrigger>
        <AccordionContent>
          Yes, through the --accordion-* variables.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
