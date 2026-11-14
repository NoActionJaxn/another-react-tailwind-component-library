import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Sponsors, SponsorsLogo } from "./Sponsors";

const text = m.components.Sponsors.story;

// Inline placeholder logos so the story needs no network or image file.
const logo = (name: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48"><circle cx="20" cy="24" r="14" fill="#78716c"/><text x="42" y="31" font-family="sans-serif" font-size="20" font-weight="700" fill="#44403c">${name}</text></svg>`,
  )}`;

const meta = {
  title: "Blocks/Sponsors",
  component: Sponsors,
  parameters: docsParameters("Sponsors", { layout: "padded" }),
  args: {
    delay: 3000,
    loop: true,
    colorScheme: "default",
    pauseLabel: "Pause",
    playLabel: "Play",
    "aria-label": text.label,
  },
  argTypes: docsArgTypes(
    "Sponsors",
    ["colorScheme", { "aria-label": "ariaLabel" }],
    {
      children: { control: false },
      delay: { table: { defaultValue: { summary: "3000" } } },
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
    <Sponsors {...args}>
      {text.names.map((name) => (
        <SponsorsLogo
          key={name}
          href={`https://example.com/${name.toLowerCase()}`}
          target="_blank"
          rel="noreferrer"
          src={logo(name)}
          alt={name}
        />
      ))}
    </Sponsors>
  ),
} satisfies Meta<typeof Sponsors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    // Each logo is a link named by its alt text.
    await expect(
      canvas.getByRole("link", { name: text.names[0] }),
    ).toHaveAttribute("href", "https://example.com/acme");
    await userEvent.click(canvas.getByRole("button", { name: "Pause" }));
    await expect(canvas.getByRole("button", { name: "Play" })).toBeVisible();
  },
};
