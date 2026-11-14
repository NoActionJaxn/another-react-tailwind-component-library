import { useCallback, useState } from "react";

export type PaginationRangeItem = number | "ellipsis-start" | "ellipsis-end";

const range = (from: number, to: number) =>
  Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i);

/**
 * The page numbers to show, with ellipses for the gaps. The list keeps the same
 * length as the page changes (once there are enough pages), so the buttons
 * don't jump around: `boundaries` pages at each end, `siblings` on each side of
 * the current page.
 */
export function paginationRange(
  page: number,
  pageCount: number,
  siblings = 1,
  boundaries = 1,
): PaginationRangeItem[] {
  const startPages = range(1, Math.min(boundaries, pageCount));
  const endPages = range(
    Math.max(pageCount - boundaries + 1, boundaries + 1),
    pageCount,
  );
  const siblingsStart = Math.max(
    Math.min(page - siblings, pageCount - boundaries - siblings * 2 - 1),
    boundaries + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblings, boundaries + siblings * 2 + 2),
    (endPages[0] ?? pageCount + 1) - 2,
  );

  return [
    ...startPages,
    ...(siblingsStart > boundaries + 2
      ? (["ellipsis-start"] as const)
      : boundaries + 1 < pageCount - boundaries
        ? [boundaries + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < pageCount - boundaries - 1
      ? (["ellipsis-end"] as const)
      : pageCount - boundaries > boundaries
        ? [pageCount - boundaries]
        : []),
    ...endPages,
  ];
}

export interface UsePaginationOptions {
  /** Number of items; pageCount is worked out from it and pageSize. */
  total?: number;
  /** Number of pages, when there's no item count (e.g. from a server). */
  pageCount?: number;
  pageSize?: number;
  defaultPageSize?: number;
  onPageSizeChange?: (pageSize: number) => void;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
}

export function usePagination({
  total,
  pageCount: pageCountOption,
  pageSize: pageSizeProp,
  defaultPageSize = 10,
  onPageSizeChange,
  page: pageProp,
  defaultPage = 1,
  onPageChange,
}: UsePaginationOptions = {}) {
  const [pageState, setPageState] = useState(defaultPage);
  const [pageSizeState, setPageSizeState] = useState(defaultPageSize);
  const pageSize = Math.max(1, pageSizeProp ?? pageSizeState);
  const pageCount = Math.max(
    1,
    pageCountOption ?? Math.ceil((total ?? 0) / pageSize),
  );
  // Always a valid page, even if the data shrinks under it.
  const page = Math.min(Math.max(1, pageProp ?? pageState), pageCount);

  const setPage = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(1, Math.round(next)), pageCount);
      setPageState(clamped);
      onPageChange?.(clamped);
    },
    [pageCount, onPageChange],
  );

  const setPageSize = useCallback(
    (next: number) => {
      const size = Math.max(1, Math.round(next));
      // Keep the first item on screen in view.
      const firstItem = (page - 1) * pageSize;
      setPageSizeState(size);
      onPageSizeChange?.(size);
      const nextPage = Math.floor(firstItem / size) + 1;
      setPageState(nextPage);
      onPageChange?.(nextPage);
    },
    [page, pageSize, onPageChange, onPageSizeChange],
  );

  const start = (page - 1) * pageSize;
  const end =
    total == null ? start + pageSize : Math.min(start + pageSize, total);

  return {
    page,
    pageCount,
    pageSize,
    setPage,
    setPageSize,
    next: () => setPage(page + 1),
    previous: () => setPage(page - 1),
    first: () => setPage(1),
    last: () => setPage(pageCount),
    hasPrevious: page > 1,
    hasNext: page < pageCount,
    /** Index of the first item on the page (0-based). */
    start,
    /** Index after the last item on the page (0-based, exclusive). */
    end,
    /** The items on the current page. */
    paginate: <T>(items: readonly T[]) => items.slice(start, end),
    /** Spread onto Pagination. */
    paginationProps: { page, pageCount, onPageChange: setPage },
  };
}
