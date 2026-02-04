import type { Meta, StoryObj } from "@storybook/react";
import Carousel from "../components/Carousel";
import Card from "../components/Card";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const images = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    alt: "Mountain landscape",
    title: "Mountain Adventure",
  },
  {
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800",
    alt: "Ocean view",
    title: "Ocean Serenity",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
    alt: "Foggy forest",
    title: "Forest Mystery",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    alt: "Lake view",
    title: "Lake Tranquility",
  },
];

export const Default: Story = {
  render: () => (
    <Carousel>
      <Carousel.Content>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <div className="p-1">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full aspect-video object-cover"
                />
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
    </Carousel>
  ),
};

export const WithCards: Story = {
  render: () => (
    <Carousel>
      <Carousel.Content>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <Card
              image={{ src: image.src, alt: image.alt }}
              title={image.title}
              description="Explore this beautiful destination"
            />
          </Carousel.Item>
        ))}
      </Carousel.Content>
    </Carousel>
  ),
};

export const MultipleSlides: Story = {
  render: () => (
    <Carousel opts={{ align: "start" }}>
      <Carousel.Content>
        {images.map((image, index) => (
          <Carousel.Item key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card
                image={{ src: image.src, alt: image.alt, ratio: 1 }}
                title={image.title}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
    </Carousel>
  ),
};

export const Autoplay: Story = {
  render: () => (
    <Carousel autoplay autoplayDelay={3000}>
      <Carousel.Content>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <div className="p-1">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full aspect-video object-cover"
                />
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
    </Carousel>
  ),
};

export const WithoutArrows: Story = {
  render: () => (
    <Carousel showArrows={false}>
      <Carousel.Content>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <div className="p-1">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full aspect-video object-cover"
                />
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
    </Carousel>
  ),
};

export const WithoutDots: Story = {
  render: () => (
    <Carousel showDots={false}>
      <Carousel.Content>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <div className="p-1">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full aspect-video object-cover"
                />
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
    </Carousel>
  ),
};

export const Loop: Story = {
  render: () => (
    <Carousel opts={{ loop: true }}>
      <Carousel.Content>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <div className="p-1">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full aspect-video object-cover"
                />
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
    </Carousel>
  ),
};

export const Vertical: Story = {
  decorators: [
    (Story) => (
      <div className="h-[400px] w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Carousel orientation="vertical" className="h-full">
      <Carousel.Content className="h-[400px]">
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <div className="p-1 h-full">
              <div className="overflow-hidden rounded-xl h-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
    </Carousel>
  ),
};

export const Testimonials: Story = {
  render: () => (
    <Carousel opts={{ loop: true }} autoplay autoplayDelay={5000}>
      <Carousel.Content>
        {[
          {
            quote: "This component library has transformed our development workflow. Highly recommended!",
            author: "Sarah Chen",
            role: "Lead Developer",
          },
          {
            quote: "Beautiful, accessible, and easy to customize. Everything we needed.",
            author: "Marcus Johnson",
            role: "Product Designer",
          },
          {
            quote: "The best React component library I've used. The documentation is excellent.",
            author: "Emily Rodriguez",
            role: "Frontend Engineer",
          },
        ].map((testimonial, index) => (
          <Carousel.Item key={index}>
            <div className="p-8 text-center">
              <blockquote className="text-xl text-neutral-700 mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="font-semibold text-neutral-900">{testimonial.author}</div>
              <div className="text-sm text-neutral-500">{testimonial.role}</div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
    </Carousel>
  ),
};
