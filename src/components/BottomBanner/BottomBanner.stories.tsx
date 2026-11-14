import type { Meta, StoryObj } from "@storybook/react-vite";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { expect, waitFor } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import { InputGroup } from "../InputGroup";
import { TextInput } from "../TextInput";
import {
  BottomBanner,
  BottomBannerActions,
  BottomBannerContent,
  BottomBannerDescription,
  BottomBannerTitle,
} from "./BottomBanner";

const text = m.components.BottomBanner.story;

const meta = {
  title: "Blocks/BottomBanner",
  component: BottomBanner,
  parameters: docsParameters("BottomBanner", { layout: "fullscreen" }),
  args: {
    variant: "solid",
    defaultOpen: true,
    fixed: true,
    block: false,
    dismissLabel: "Dismiss",
    colorScheme: "default",
  },
  argTypes: docsArgTypes("BottomBanner", ["variant", "colorScheme", "block"], {
    variant: {
      control: "inline-radio",
      options: ["solid", "soft", "outline"],
      table: { defaultValue: { summary: "solid" } },
    },
    open: { control: false },
    defaultOpen: { table: { defaultValue: { summary: "true" } } },
    onOpenChange: { control: false },
    storageKey: { control: "text" },
    fixed: { table: { defaultValue: { summary: "true" } } },
    block: { table: { defaultValue: { summary: "false" } } },
    dismissLabel: { table: { defaultValue: { summary: "Dismiss" } } },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
  }),
  render: function Render(args) {
    const [subscribed, setSubscribed] = useState(false);
    // Remount (and so reopen) after a dismissal, to try it again.
    const [round, setRound] = useState(0);
    const [open, setOpen] = useState(true);
    return (
      <div className="relative min-h-72 p-6">
        <p className="max-w-prose text-sm text-stone-600">{text.page}</p>
        {!open && (
          <Button
            className="mt-4"
            onClick={() => {
              // Forget a remembered dismissal, so storageKey can be tried again.
              if (args.storageKey) localStorage.removeItem(args.storageKey);
              setOpen(true);
              setSubscribed(false);
              setRound(round + 1);
            }}
          >
            {text.showAgain}
          </Button>
        )}
        <BottomBanner key={round} {...args} onOpenChange={setOpen}>
          <BottomBannerContent>
            <BottomBannerTitle>{text.title}</BottomBannerTitle>
            <BottomBannerDescription>
              {text.description}
            </BottomBannerDescription>
          </BottomBannerContent>
          <BottomBannerActions>
            {subscribed ? (
              <p role="status" className="text-sm font-medium">
                {text.thanks}
              </p>
            ) : (
              <form
                className="w-full md:w-auto"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubscribed(true);
                }}
              >
                <InputGroup block>
                  <TextInput
                    type="email"
                    required
                    aria-label={text.emailLabel}
                    placeholder={text.emailPlaceholder}
                    prependElement={<EnvelopeClosedIcon aria-hidden />}
                    className="md:w-64"
                  />
                  <Button type="submit">{text.subscribe}</Button>
                </InputGroup>
              </form>
            )}
          </BottomBannerActions>
        </BottomBanner>
      </div>
    );
  },
} satisfies Meta<typeof BottomBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const banner = canvas.getByRole("region", { name: text.title });
    await expect(banner).toBeVisible();
    await userEvent.type(
      canvas.getByRole("textbox", { name: text.emailLabel }),
      "ada@example.com",
    );
    await userEvent.click(canvas.getByRole("button", { name: text.subscribe }));
    await expect(canvas.getByRole("status")).toHaveTextContent(text.thanks);
    await userEvent.click(canvas.getByRole("button", { name: "Dismiss" }));
    // Unmounts once it has slid out.
    await waitFor(() =>
      expect(canvas.queryByRole("region", { name: text.title })).toBeNull(),
    );
    await userEvent.click(canvas.getByRole("button", { name: text.showAgain }));
    await expect(
      canvas.getByRole("region", { name: text.title }),
    ).toBeVisible();
  },
};
