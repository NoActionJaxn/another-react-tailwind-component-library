import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import {
  Carousel,
  CarouselActions,
  CarouselCaption,
  CarouselDescription,
  CarouselImage,
  CarouselSlide,
  CarouselTitle,
} from "./Carousel";

const text = m.components.Carousel.story;

// Inline illustrations so the story needs no network or image files.
const scene = (sky: string, hill: string, sun: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 160 90"><rect width="160" height="90" fill="${sky}"/><circle cx="120" cy="25" r="10" fill="${sun}"/><path d="M0 65 Q40 40 80 60 T160 55 V90 H0 Z" fill="${hill}"/></svg>`,
  )}`;

const images = [
  scene("#bae6fd", "#4d7c0f", "#fde68a"),
  scene("#fed7aa", "#9a3412", "#fef3c7"),
  scene("#1e1b4b", "#312e81", "#e0e7ff"),
];

const meta = {
  title: "Blocks/Carousel",
  component: Carousel,
  parameters: docsParameters("Carousel", { layout: "padded" }),
  args: {
    loop: true,
    autoplay: false,
    delay: 5000,
    showArrows: true,
    showPager: true,
    colorScheme: "default",
    previousLabel: "Previous slide",
    nextLabel: "Next slide",
    pauseLabel: "Pause",
    playLabel: "Play",
    "aria-label": text.label,
  },
  argTypes: docsArgTypes(
    "Carousel",
    ["colorScheme", { "aria-label": "ariaLabel" }],
    {
      aspectRatio: {
        control: "text",
        table: { defaultValue: { summary: text.aspectRatioDefault } },
      },
      loop: { table: { defaultValue: { summary: "true" } } },
      autoplay: { table: { defaultValue: { summary: "false" } } },
      delay: {
        control: { type: "number", step: 500 },
        table: { defaultValue: { summary: "5000" } },
      },
      showArrows: { table: { defaultValue: { summary: "true" } } },
      showPager: { table: { defaultValue: { summary: "true" } } },
      previousLabel: { table: { defaultValue: { summary: "Previous slide" } } },
      nextLabel: { table: { defaultValue: { summary: "Next slide" } } },
      pauseLabel: { table: { defaultValue: { summary: "Pause" } } },
      playLabel: { table: { defaultValue: { summary: "Play" } } },
      slideLabel: {
        control: false,
        table: { defaultValue: { summary: text.slideLabelDefault } },
      },
      pagerLabel: {
        control: false,
        table: { defaultValue: { summary: text.pagerLabelDefault } },
      },
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
        table: { defaultValue: { summary: m.common.defaults.inherited } },
      },
    },
  ),
  render: (args) => (
    <Carousel {...args} className="mx-auto max-w-4xl">
      <CarouselSlide>
        <CarouselImage src={images[0]} alt={text.alts[0]} />
        <CarouselCaption>
          <CarouselTitle>{text.slides[0]!.title}</CarouselTitle>
          <CarouselDescription>
            {text.slides[0]!.description}
          </CarouselDescription>
          <CarouselActions>
            <Button variant="soft">{text.primary}</Button>
          </CarouselActions>
        </CarouselCaption>
      </CarouselSlide>
      <CarouselSlide>
        <CarouselImage src={images[1]} alt={text.alts[1]} />
        <CarouselCaption position="center">
          <CarouselTitle>{text.slides[1]!.title}</CarouselTitle>
          <CarouselDescription>
            {text.slides[1]!.description}
          </CarouselDescription>
          <CarouselActions>
            <Button variant="soft">{text.primary}</Button>
            <Button
              variant="outline"
              className="text-white hover:text-stone-900"
            >
              {text.secondary}
            </Button>
          </CarouselActions>
        </CarouselCaption>
      </CarouselSlide>
      <CarouselSlide>
        <CarouselImage src={images[2]} alt={text.alts[2]} />
        <CarouselCaption>
          <CarouselTitle>{text.slides[2]!.title}</CarouselTitle>
        </CarouselCaption>
      </CarouselSlide>
    </Carousel>
  ),
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const dot = (n: number) =>
      canvas.getByRole("button", { name: `Go to slide ${n}` });
    await waitFor(() => expect(dot(1)).toHaveAttribute("aria-current", "true"));
    await userEvent.click(canvas.getByRole("button", { name: "Next slide" }));
    await waitFor(() => expect(dot(2)).toHaveAttribute("aria-current", "true"));
    await userEvent.click(dot(3));
    await waitFor(() => expect(dot(3)).toHaveAttribute("aria-current", "true"));
    // Loops back to the start.
    await userEvent.click(canvas.getByRole("button", { name: "Next slide" }));
    await waitFor(() => expect(dot(1)).toHaveAttribute("aria-current", "true"));
    // Only the current slide's content can be reached.
    await expect(
      canvas.getByRole("group", { name: "1 of 3" }),
    ).not.toHaveAttribute("inert");
    await expect(
      canvas.getByRole("group", { name: "2 of 3", hidden: true }),
    ).toHaveAttribute("inert");
  },
};
