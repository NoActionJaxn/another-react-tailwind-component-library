import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { docsArgTypes, docsParameters, format, m } from "../../docs/i18n";
import { Pagination } from "./Pagination";
import { paginationRange, usePagination } from "./usePagination";

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

const pageNumbers = (canvasElement: HTMLElement) =>
  [...canvasElement.querySelectorAll("li")].map((li) =>
    li.getAttribute("aria-hidden") ? "…" : li.textContent,
  );

// Plain Pagination, driven by its props.
export const Controlled: Story = {
  tags: ["!dev"],
  args: { page: 5, pageCount: 20, onPageChange: fn() },
  render: (args) => <Pagination {...args} />,
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    // Previous, 1, …, 4 5 6, …, 20, Next
    await expect(pageNumbers(canvasElement)).toEqual([
      "",
      "1",
      "…",
      "4",
      "5",
      "6",
      "…",
      "20",
      "",
    ]);
    await expect(
      canvas.getByRole("button", { name: "Page 5" }),
    ).toHaveAttribute("aria-current", "page");
    await userEvent.click(canvas.getByRole("button", { name: "Next page" }));
    await expect(args.onPageChange).toHaveBeenLastCalledWith(6);
    await userEvent.click(
      canvas.getByRole("button", { name: "Previous page" }),
    );
    await expect(args.onPageChange).toHaveBeenLastCalledWith(4);
    await userEvent.click(canvas.getByRole("button", { name: "Page 20" }));
    await expect(args.onPageChange).toHaveBeenLastCalledWith(20);
    // The current page does nothing.
    await userEvent.click(canvas.getByRole("button", { name: "Page 5" }));
    await expect(args.onPageChange).toHaveBeenCalledTimes(3);
  },
};

// An out-of-range page is clamped.
export const PageOutOfRange: Story = {
  tags: ["!dev"],
  args: { page: 99, pageCount: 3, onPageChange: fn() },
  render: (args) => <Pagination {...args} />,
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Page 3" }),
    ).toHaveAttribute("aria-current", "page");
    await expect(
      canvas.getByRole("button", { name: "Next page" }),
    ).toBeDisabled();
  },
};

export const FirstLast: Story = {
  tags: ["!dev"],
  args: { page: 1, pageCount: 10, showFirstLast: true, onPageChange: fn() },
  render: (args) => <Pagination {...args} />,
  play: async ({ args, canvas, userEvent }) => {
    await expect(
      canvas.getByRole("button", { name: "First page" }),
    ).toBeDisabled();
    await userEvent.click(canvas.getByRole("button", { name: "Last page" }));
    await expect(args.onPageChange).toHaveBeenCalledWith(10);
  },
};

// With getHref, pages are links; disabled ends stay buttons.
export const Links: Story = {
  tags: ["!dev"],
  args: { page: 1, pageCount: 3, getHref: (page: number) => `#page-${page}` },
  render: (args) => <Pagination {...args} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Page 2" })).toHaveAttribute(
      "href",
      "#page-2",
    );
    await expect(
      canvas.getByRole("link", { name: "Next page" }),
    ).toHaveAttribute("href", "#page-2");
    await expect(canvas.getByRole("link", { name: "Page 1" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(
      canvas.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
  },
};

export const CustomLabels: Story = {
  tags: ["!dev"],
  args: {
    page: 1,
    pageCount: 2,
    pageLabel: (page: number) => `Go to ${page}`,
    nextLabel: "Forward",
  },
  render: (args) => <Pagination {...args} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Go to 2" })).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Forward" })).toBeVisible();
  },
};

// The page list keeps the same length as the page moves, so buttons don't jump.
export const PageRange: Story = {
  tags: ["!dev"],
  args: { page: 1, pageCount: 1 },
  render: (args) => <Pagination {...args} />,
  play: async ({ canvas }) => {
    // A single page: no ellipsis, both arrows disabled.
    await expect(paginationRange(1, 1)).toEqual([1]);
    await expect(
      canvas.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
    await expect(
      canvas.getByRole("button", { name: "Next page" }),
    ).toBeDisabled();

    await expect(paginationRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
    await expect(paginationRange(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    await expect(paginationRange(1, 10)).toEqual([
      1,
      2,
      3,
      4,
      5,
      "ellipsis-end",
      10,
    ]);
    await expect(paginationRange(5, 10)).toEqual([
      1,
      "ellipsis-start",
      4,
      5,
      6,
      "ellipsis-end",
      10,
    ]);
    await expect(paginationRange(10, 10)).toEqual([
      1,
      "ellipsis-start",
      6,
      7,
      8,
      9,
      10,
    ]);
    for (let page = 1; page <= 20; page++) {
      await expect(paginationRange(page, 20)).toHaveLength(7);
      await expect(paginationRange(page, 20)).toContain(page);
    }
    await expect(paginationRange(10, 20, 2, 2)).toEqual([
      1,
      2,
      "ellipsis-start",
      8,
      9,
      10,
      11,
      12,
      "ellipsis-end",
      19,
      20,
    ]);
    await expect(paginationRange(5, 10, 0, 0)).toEqual([
      "ellipsis-start",
      5,
      "ellipsis-end",
    ]);
  },
};
