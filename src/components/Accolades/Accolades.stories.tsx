import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { docsArgTypes, docsParameters, format, m } from "../../docs/i18n";
import {
  Accolades,
  AccoladesImage,
  AccoladesItem,
  AccoladesLink,
  AccoladesQuote,
} from "./Accolades";

const text = m.components.Accolades.story;

// Inline placeholder logo so the story needs no network or image file.
const logo = (n: number) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="12" fill="#e7e5e4"/><text x="40" y="45" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#44403c">Logo ${n}</text></svg>`,
  )}`;

const meta = {
  title: "Blocks/Accolades",
  component: Accolades,
  parameters: docsParameters("Accolades", { layout: "padded" }),
  args: {
    animation: "none",
    delay: 4000,
    loop: true,
    colorScheme: "default",
    pauseLabel: "Pause",
    playLabel: "Play",
    "aria-label": text.label,
  },
  argTypes: docsArgTypes(
    "Accolades",
    ["colorScheme", { "aria-label": "ariaLabel" }],
    {
      children: { control: false },
      animation: {
        control: "inline-radio",
        options: ["none", "fade", "pop"],
        table: { defaultValue: { summary: "none" } },
      },
      delay: { table: { defaultValue: { summary: "4000" } } },
      loop: { table: { defaultValue: { summary: "true" } } },
      pauseLabel: { table: { defaultValue: { summary: "Pause" } } },
      playLabel: { table: { defaultValue: { summary: "Play" } } },
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
        table: { defaultValue: { summary: m.common.defaults.inherited } },
      },
    },
  ),
  render: (args) => (
    <Accolades {...args}>
      {text.quotes.map((quote, index) => (
        <AccoladesItem key={index}>
          <AccoladesImage
            src={logo(index + 1)}
            alt={format(text.logoAlt, { n: index + 1 })}
          />
          <AccoladesQuote>{quote}</AccoladesQuote>
          <AccoladesLink href="#">{text.link}</AccoladesLink>
        </AccoladesItem>
      ))}
    </Accolades>
  ),
} satisfies Meta<typeof Accolades>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Pause" }));
    await expect(canvas.getByRole("button", { name: "Play" })).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Play" }));
    await expect(canvas.getByRole("button", { name: "Pause" })).toBeVisible();
  },
};

// Each quote is a slide, named by its position.
export const Slides: Story = {
  tags: ["!dev"],
  play: async ({ canvas }) => {
    const total = text.quotes.length;
    for (let i = 1; i <= total; i++) {
      await expect(
        canvas.getByRole("group", { name: `${i} of ${total}`, hidden: true }),
      ).toHaveTextContent(text.quotes[i - 1]!);
    }
    await expect(
      canvas.getByRole("region", { name: text.label }),
    ).toHaveAttribute("aria-roledescription", "carousel");
  },
};

// With an animation, slides on screen are marked in view.
export const Animated: Story = {
  tags: ["!dev"],
  args: { animation: "fade" },
  play: async ({ canvasElement }) => {
    await waitFor(() =>
      expect(
        canvasElement.querySelector("[data-accolades-slide][data-in-view]"),
      ).not.toBeNull(),
    );
  },
};
