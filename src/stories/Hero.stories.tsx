import type { Meta, StoryObj } from "@storybook/react";
import Hero from "../components/Hero";
import Button from "../components/Button";

const meta: Meta<typeof Hero> = {
  title: "Components/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    title: "Build something amazing",
    subtitle: "Create beautiful, responsive websites with our comprehensive component library built on React and Tailwind CSS.",
    actions: (
      <>
        <Button variant="primary" size="large">Get Started</Button>
        <Button variant="secondary" size="large">Learn More</Button>
      </>
    ),
  },
};

export const LeftAligned: Story = {
  args: {
    title: "Welcome to Our Platform",
    subtitle: "Discover powerful tools and resources to help you build better products faster.",
    alignment: "left",
    actions: (
      <>
        <Button variant="primary">Start Free Trial</Button>
        <Button variant="ghost">Watch Demo</Button>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    title: "Quick Announcement",
    subtitle: "We've just launched our new feature set. Check it out!",
    size: "small",
    actions: (
      <Button variant="primary" size="small">Learn More</Button>
    ),
  },
};

export const Large: Story = {
  args: {
    title: "Transform Your Workflow",
    subtitle: "Join thousands of teams who have revolutionized how they work with our cutting-edge solutions.",
    size: "large",
    actions: (
      <>
        <Button variant="primary" size="large">Get Started Free</Button>
        <Button variant="secondary" size="large">Contact Sales</Button>
      </>
    ),
  },
};

export const WithImageRight: Story = {
  args: {
    title: "Design with Confidence",
    subtitle: "Our intuitive tools help you create stunning designs without any technical expertise.",
    alignment: "left",
    image: {
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      alt: "Person working on laptop",
      position: "right",
    },
    actions: (
      <>
        <Button variant="primary">Try It Free</Button>
        <Button variant="ghost">See Examples</Button>
      </>
    ),
  },
};

export const WithImageLeft: Story = {
  args: {
    title: "Collaborate Seamlessly",
    subtitle: "Work together with your team in real-time, no matter where you are in the world.",
    alignment: "left",
    image: {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      alt: "Team collaboration",
      position: "left",
    },
    actions: (
      <>
        <Button variant="primary">Start Collaborating</Button>
        <Button variant="secondary">Learn More</Button>
      </>
    ),
  },
};

export const WithBackgroundImage: Story = {
  args: {
    title: "Adventure Awaits",
    subtitle: "Explore breathtaking destinations and create memories that last a lifetime.",
    image: {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600",
      alt: "Mountain landscape",
      position: "background",
    },
    actions: (
      <>
        <Button variant="primary" size="large">Explore Now</Button>
        <Button variant="secondary" size="large">View Gallery</Button>
      </>
    ),
  },
};

export const WithCustomBackground: Story = {
  render: () => (
    <Hero
      title="Launch Your Startup"
      subtitle="Everything you need to go from idea to product in record time."
      className="bg-linear-to-br from-primary-500 to-primary-700 text-white [&_h1]:text-white [&_p]:text-white/90"
      actions={
        <>
          <Button variant="secondary" size="large">Start Building</Button>
          <Button variant="ghost" size="large" className="text-white hover:text-white hover:bg-white/10">Watch Video</Button>
        </>
      }
    />
  ),
};

export const CustomContent: Story = {
  render: () => (
    <Hero className="bg-neutral-50">
      <div className="text-center">
        <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-700 rounded-full mb-4">
          New Release
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          Introducing Version 2.0
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
          A complete redesign with improved performance, new features, and better developer experience.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="primary" size="large">Upgrade Now</Button>
          <Button variant="secondary" size="large">View Changelog</Button>
        </div>
      </div>
    </Hero>
  ),
};

export const MinimalCentered: Story = {
  args: {
    title: "Simple. Elegant. Powerful.",
    subtitle: "Less is more. Build with purpose.",
    size: "large",
    actions: (
      <Button variant="primary">Get Started</Button>
    ),
  },
};
