import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
} from "./Card";

const text = m.components.Card.story;

// Inline gradient so the story needs no network or image file.
const cover = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#a8a29e"/><stop offset="1" stop-color="#44403c"/></linearGradient></defs><rect width="16" height="9" fill="url(#g)"/></svg>',
)}`;

const meta = {
  title: "Cards/Card",
  component: Card,
  parameters: docsParameters("Card", { layout: "centered" }),
  args: {
    variant: "outline",
    size: "md",
    colorScheme: "default",
  },
  argTypes: docsArgTypes("Card", ["variant", "size", "colorScheme"], {
    variant: {
      control: "inline-radio",
      options: ["outline", "soft", "ghost"],
      table: { defaultValue: { summary: "outline" } },
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
  }),
  render: (args) => (
    <Card {...args} className="w-80">
      <CardImage src={cover} alt={text.imageAlt} />
      <CardHeader asChild>
        <h3>{text.header}</h3>
      </CardHeader>
      <CardDescription>{text.description}</CardDescription>
      <CardFooter className="justify-end">
        <Button variant="outline" size="sm">
          {text.cancel}
        </Button>
        <Button size="sm">{text.confirm}</Button>
      </CardFooter>
    </Card>
  ),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
