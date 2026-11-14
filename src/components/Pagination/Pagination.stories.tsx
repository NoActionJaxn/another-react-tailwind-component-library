import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, format, m } from "../../docs/i18n";
import { Pagination } from "./Pagination";
import { usePagination } from "./usePagination";

const text = m.components.Pagination.story;

const items = Array.from({ length: 195 }, (_, i) =>
  format(text.item, { number: i + 1 }),
);

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  parameters: docsParameters("Pagination", { layout: "centered" }),
  args: {
    page: 1,
    pageCount: 20,
    siblings: 1,
    boundaries: 1,
    showFirstLast: false,
    variant: "ghost",
    size: "md",
    colorScheme: "default",
    previousLabel: "Previous page",
    nextLabel: "Next page",
    firstLabel: "First page",
    lastLabel: "Last page",
    "aria-label": "Pagination",
  },
  argTypes: docsArgTypes(
    "Pagination",
    ["variant", "size", "colorScheme", { "aria-label": "ariaLabel" }],
    {
      page: { control: false },
      pageCount: { control: false },
      onPageChange: { control: false },
      getHref: { control: false },
      siblings: {
        control: { type: "number", min: 0, max: 3 },
        table: { defaultValue: { summary: "1" } },
      },
      boundaries: {
        control: { type: "number", min: 0, max: 3 },
        table: { defaultValue: { summary: "1" } },
      },
      showFirstLast: { table: { defaultValue: { summary: "false" } } },
      variant: {
        control: "inline-radio",
        options: ["ghost", "outline", "soft"],
        table: { defaultValue: { summary: "ghost" } },
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
      previousLabel: { table: { defaultValue: { summary: "Previous page" } } },
      nextLabel: { table: { defaultValue: { summary: "Next page" } } },
      firstLabel: { table: { defaultValue: { summary: "First page" } } },
      lastLabel: { table: { defaultValue: { summary: "Last page" } } },
      pageLabel: {
        control: false,
        table: { defaultValue: { summary: text.pageLabelDefault } },
      },
      "aria-label": { table: { defaultValue: { summary: "Pagination" } } },
    },
  ),
  // usePagination holds the page and slices the list; its props go on Pagination.
  render: function Render(args) {
    const pagination = usePagination({ total: items.length });
    return (
      <div className="flex w-full max-w-xl flex-col items-center gap-4">
        <ul className="grid w-full grid-cols-2 gap-2 text-sm">
          {pagination.paginate(items).map((item) => (
            <li
              key={item}
              className="rounded-md border border-stone-200 px-3 py-2"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-stone-600" aria-live="polite">
          {format(text.summary, {
            from: pagination.start + 1,
            to: pagination.end,
            total: items.length,
          })}
        </p>
        <Pagination {...args} {...pagination.paginationProps} />
      </div>
    );
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const current = () =>
      canvas
        .getAllByRole("button")
        .find((b) => b.getAttribute("aria-current") === "page");
    await expect(current()).toHaveAccessibleName("Page 1");
    await expect(
      canvas.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
    await expect(canvas.getByText(items[0]!)).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Next page" }));
    await expect(current()).toHaveAccessibleName("Page 2");
    await expect(canvas.getByText(items[10]!)).toBeVisible();
    await expect(canvas.queryByText(items[0]!)).toBeNull();

    await userEvent.click(canvas.getByRole("button", { name: "Page 20" }));
    await expect(current()).toHaveAccessibleName("Page 20");
    await expect(canvas.getByText(items[194]!)).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Next page" }),
    ).toBeDisabled();
  },
};
