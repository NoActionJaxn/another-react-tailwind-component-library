import { Suspense, createElement, use, useState, type ReactNode } from "react";
import type ReactPaginateType from "react-paginate";
import Button from "./Button.tsx";
import GridContainer, { type GridContainerColumns } from "./GridContainer.tsx";
import cn from "../lib/cn.ts";

export type PaginationView = "list" | "grid";

export interface PaginationProps<T> {
  className?: string;
  columns?: GridContainerColumns;
  itemsPerPage?: number;
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  view?: PaginationView;
}

// react-paginate is an optional peer dependency - only Pagination needs it,
// so it's loaded lazily instead of via a static import. A static import
// would force every consumer's bundler to resolve "react-paginate" as soon
// as this file is reachable, even if they never render Pagination. The
// ignore comments stop Vite/webpack from pre-resolving the specifier so the
// real module lookup (and any failure) happens at runtime, only when used.
//
// __STORYBOOK__ is only defined by this repo's own vite.config.ts (not
// vite.lib.config.ts, which builds the published package). Storybook's own
// site always has react-paginate installed, but the ignored dynamic import
// above compiles to a raw, unresolved specifier in a static production
// build - it works under `storybook dev` only because Vite's dev server
// resolves bare specifiers live. A plain import lets Storybook's build
// bundle it into a real, servable chunk instead.
declare const __STORYBOOK__: boolean | undefined;
let reactPaginateModulePromise: Promise<typeof ReactPaginateType> | null = null;

const loadReactPaginate = () => {
  const promise = (reactPaginateModulePromise ??= (
    typeof __STORYBOOK__ !== "undefined" && __STORYBOOK__
      ? import("react-paginate")
      : import(
          /* webpackIgnore: true */
          /* @vite-ignore */
          "react-paginate"
        )
  ).then(
    (module) => {
      // react-paginate ships a UMD bundle, so CJS/ESM interop can wrap the
      // component in a `.default` one or two levels deep depending on the
      // bundler. Unwrap until we land on something that isn't itself
      // wrapped in a `.default`.
      let resolved: unknown = module;
      while (
        resolved &&
        typeof resolved === "object" &&
        "default" in resolved
      ) {
        resolved = (resolved as { default: unknown }).default;
      }
      return resolved as typeof ReactPaginateType;
    },
    () => {
      throw new Error(
        'Pagination requires the "react-paginate" package, which is an ' +
          "optional peer dependency. Install it with `npm install " +
          "react-paginate` (or your package manager's equivalent) to use " +
          "Pagination.",
      );
    },
  ));

  return promise;
};

interface PageLinksProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageCount: number;
}

// Rendered via createElement rather than JSX so this doesn't read as a
// component defined during render - reactPaginate is always the same
// value once loadReactPaginate()'s cached promise resolves.
const PageLinks = ({
  currentPage,
  onPageChange,
  pageCount,
}: PageLinksProps) => {
  const reactPaginate = use(loadReactPaginate());

  return createElement(reactPaginate, {
    pageCount,
    forcePage: currentPage,
    onPageChange: ({ selected }: { selected: number }) =>
      onPageChange(selected),
    containerClassName: "another-pagination-pages",
    pageClassName: "another-pagination-page",
    pageLinkClassName: "another-pagination-page-link",
    activeClassName: "another-pagination-page-active",
    breakClassName: "another-pagination-page",
    breakLinkClassName: "another-pagination-page-link",
    previousClassName: "hidden",
    nextClassName: "hidden",
  });
};

const Pagination = <T,>({
  className,
  columns = 3,
  itemsPerPage = 6,
  items,
  renderItem,
  view = "grid",
}: PaginationProps<T>) => {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const currentPage = Math.min(page, pageCount - 1);
  const pageItems = items.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage,
  );

  return (
    <div className={cn("another-pagination", className)} data-view={view}>
      {view === "grid" ? (
        <GridContainer columns={columns}>
          {pageItems.map((item, index) => renderItem(item, index))}
        </GridContainer>
      ) : (
        <div className="another-pagination-list">
          {pageItems.map((item, index) => renderItem(item, index))}
        </div>
      )}
      {pageCount > 1 && (
        <div className="another-pagination-controls">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 0}
            onClick={() => setPage((current) => Math.max(0, current - 1))}
          >
            Previous
          </Button>
          <Suspense fallback={null}>
            <PageLinks
              currentPage={currentPage}
              pageCount={pageCount}
              onPageChange={setPage}
            />
          </Suspense>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === pageCount - 1}
            onClick={() =>
              setPage((current) => Math.min(pageCount - 1, current + 1))
            }
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

Pagination.displayName = "Pagination";

export default Pagination;
