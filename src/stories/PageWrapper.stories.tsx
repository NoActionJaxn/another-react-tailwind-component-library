import type { Meta, StoryObj } from "@storybook/react";
import PageWrapper from "../components/PageWrapper";
import Page from "../components/Page";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import Text from "../components/Text";
import Button from "../components/Button";

const meta: Meta<typeof PageWrapper> = {
  title: "Components/PageWrapper",
  component: PageWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof PageWrapper>;

const Logo = () => (
  <a href="#" className="flex items-center gap-2">
    <div className="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center">
      <span className="text-white font-bold text-sm">A</span>
    </div>
    <span className="font-semibold text-lg text-neutral-900">Acme</span>
  </a>
);

export const Default: Story = {
  render: () => (
    <PageWrapper>
      <Page className="bg-primary-50 flex items-center justify-center">
        <div className="text-center">
          <Heading level={1} size="2xl">Welcome</Heading>
          <Text size="large" className="mt-4 text-neutral-600">
            This is the first page section
          </Text>
        </div>
      </Page>
      <Page className="bg-success-50 flex items-center justify-center">
        <div className="text-center">
          <Heading level={2} size="xl">About Us</Heading>
          <Text size="large" className="mt-4 text-neutral-600">
            This is the second page section
          </Text>
        </div>
      </Page>
      <Page className="bg-warning-50 flex items-center justify-center">
        <div className="text-center">
          <Heading level={2} size="xl">Contact</Heading>
          <Text size="large" className="mt-4 text-neutral-600">
            This is the third page section
          </Text>
        </div>
      </Page>
    </PageWrapper>
  ),
};

export const WithSnap: Story = {
  render: () => (
    <PageWrapper snap>
      <Page className="bg-primary-100 flex items-center justify-center">
        <div className="text-center">
          <Heading level={1} size="2xl">Page 1</Heading>
          <Text size="large" className="mt-4 text-neutral-600">
            Scroll down - pages will snap to top
          </Text>
        </div>
      </Page>
      <Page className="bg-secondary-100 flex items-center justify-center">
        <div className="text-center">
          <Heading level={2} size="xl">Page 2</Heading>
          <Text size="large" className="mt-4 text-neutral-600">
            Snapping enabled
          </Text>
        </div>
      </Page>
      <Page className="bg-success-100 flex items-center justify-center">
        <div className="text-center">
          <Heading level={2} size="xl">Page 3</Heading>
          <Text size="large" className="mt-4 text-neutral-600">
            Last page section
          </Text>
        </div>
      </Page>
    </PageWrapper>
  ),
};

export const WithFixedHeader: Story = {
  render: () => (
    <>
      <Navbar
        logo={<Logo />}
        items={[
          { label: "Home", href: "#" },
          { label: "About", href: "#about" },
          { label: "Contact", href: "#contact" },
        ]}
        actions={<Button variant="primary" size="small">Sign In</Button>}
        fixed
      />
      <PageWrapper hasFixedHeader>
        <Page className="bg-primary-50 flex items-center justify-center pt-header">
          <div className="text-center">
            <Heading level={1} size="2xl">Hero Section</Heading>
            <Text size="large" className="mt-4 text-neutral-600">
              This page accounts for the fixed header height
            </Text>
          </div>
        </Page>
        <Page className="bg-success-50 flex items-center justify-center">
          <div className="text-center">
            <Heading level={2} size="xl">Features</Heading>
            <Text size="large" className="mt-4 text-neutral-600">
              Second section with proper height calculation
            </Text>
          </div>
        </Page>
        <Page className="bg-warning-50 flex items-center justify-center">
          <div className="text-center">
            <Heading level={2} size="xl">Footer Section</Heading>
            <Text size="large" className="mt-4 text-neutral-600">
              Final section
            </Text>
          </div>
        </Page>
      </PageWrapper>
    </>
  ),
};

export const WithFixedHeaderAndSnap: Story = {
  render: () => (
    <>
      <Navbar
        logo={<Logo />}
        items={[
          { label: "Home", href: "#" },
          { label: "About", href: "#about" },
        ]}
        fixed
      />
      <div className="h-header" /> {/* Spacer for fixed header */}
      <PageWrapper hasFixedHeader snap>
        <Page className="bg-linear-to-b from-primary-500 to-primary-600 flex items-center justify-center text-white">
          <div className="text-center">
            <Heading level={1} size="2xl" className="text-white">Welcome</Heading>
            <Text size="large" className="mt-4 text-primary-100">
              Scroll to snap between sections
            </Text>
            <Button variant="secondary" className="mt-6">Get Started</Button>
          </div>
        </Page>
        <Page className="bg-white flex items-center justify-center">
          <div className="text-center max-w-2xl px-6">
            <Heading level={2} size="xl">Our Mission</Heading>
            <Text size="large" className="mt-4 text-neutral-600">
              Building beautiful, accessible components for modern web applications.
            </Text>
          </div>
        </Page>
        <Page className="bg-neutral-900 flex items-center justify-center text-white">
          <div className="text-center">
            <Heading level={2} size="xl" className="text-white">Contact Us</Heading>
            <Text size="large" className="mt-4 text-neutral-400">
              Get in touch with our team
            </Text>
            <Button variant="primary" className="mt-6">Send Message</Button>
          </div>
        </Page>
      </PageWrapper>
    </>
  ),
};

export const LandingPage: Story = {
  render: () => (
    <>
      <Navbar
        logo={<Logo />}
        items={[
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "About", href: "#about" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="small">Log In</Button>
            <Button variant="primary" size="small">Sign Up</Button>
          </div>
        }
        fixed
        bordered={false}
        className="bg-white/80 backdrop-blur-sm"
      />
      <PageWrapper hasFixedHeader>
        <Page className="bg-linear-to-br from-primary-50 via-white to-success-50 flex items-center justify-center pt-header">
          <div className="text-center max-w-3xl px-6">
            <Heading level={1} size="2xl">
              Build faster with our component library
            </Heading>
            <Text size="x-large" className="mt-6 text-neutral-600">
              A comprehensive collection of accessible, customizable React components
              built with Tailwind CSS.
            </Text>
            <div className="flex gap-4 justify-center mt-8">
              <Button variant="primary" size="large">Get Started</Button>
              <Button variant="secondary" size="large">View Docs</Button>
            </div>
          </div>
        </Page>
        <Page className="bg-white flex items-center justify-center" id="features">
          <div className="text-center max-w-4xl px-6">
            <Heading level={2} size="xl">Powerful Features</Heading>
            <Text size="large" className="mt-4 text-neutral-600">
              Everything you need to build modern web applications
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {["Accessible", "Customizable", "Responsive"].map((feature) => (
                <div key={feature} className="p-6 rounded-xl bg-neutral-50">
                  <Heading level={3} size="xl">{feature}</Heading>
                  <Text className="mt-2 text-neutral-600">
                    Built with accessibility and flexibility in mind.
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </Page>
      </PageWrapper>
    </>
  ),
};
