import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Video } from "./Video";
import poster from "./sample-poster.jpg?url";
import sample from "./sample.webm?url";

const meta = {
  title: "Data Display/Video",
  component: Video,
  parameters: docsParameters("Video", { layout: "centered" }),
  args: {
    src: sample,
    poster,
    label: m.components.Video.story.label,
    variant: "ghost",
    fit: "cover",
    aspectRatio: "16 / 9",
    colorScheme: "default",
    className: "w-96",
    controls: true,
    muted: true,
    loop: false,
    zoomOnHover: false,
    openInDialog: false,
    openLabel: "Play video",
    closeLabel: "Close",
  },
  argTypes: docsArgTypes("Video", ["variant", "colorScheme", "className"], {
    src: { control: "text" },
    poster: { control: "text" },
    dialogSrc: { control: "text" },
    variant: {
      control: "inline-radio",
      options: ["ghost", "outline"],
      table: { defaultValue: { summary: "ghost" } },
    },
    fit: {
      control: "inline-radio",
      options: ["cover", "contain", "fill", "none", "scale-down"],
      table: { defaultValue: { summary: "cover" } },
    },
    aspectRatio: { control: "text" },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
    controls: { table: { defaultValue: { summary: "true" } } },
    muted: { table: { defaultValue: { summary: "false" } } },
    loop: { table: { defaultValue: { summary: "false" } } },
    zoomOnHover: { table: { defaultValue: { summary: "false" } } },
    openInDialog: { table: { defaultValue: { summary: "false" } } },
    openLabel: { table: { defaultValue: { summary: "Play video" } } },
    closeLabel: { table: { defaultValue: { summary: "Close" } } },
    fallback: {
      control: false,
      table: { defaultValue: { summary: "VideoIcon" } },
    },
    children: { control: false },
  }),
} satisfies Meta<typeof Video>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
