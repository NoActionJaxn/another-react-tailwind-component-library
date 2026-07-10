import { useState, type ReactNode } from "react";
import ReactPaginateImport from "react-paginate";
import Button from "./Button.tsx";
import GridContainer, { type GridContainerColumns } from "./GridContainer.tsx";
import cn from "../lib/cn.ts";

// react-paginate ships a UMD bundle; depending on how the bundler resolves
// the default export, we may get the component directly or a CJS-interop
// wrapper object with a `.default` property. Handle both.
const ReactPaginate =
  (ReactPaginateImport as unknown as { default?: typeof ReactPaginateImport })
    .default ?? ReactPaginateImport;

export type PaginationView = "list" | "grid";

export interface PaginationProps<T> {
  className?: string;
  columns?: GridContainerColumns;
  itemsPerPage?: number;
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  view?: PaginationView;
}

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
          <ReactPaginate
            pageCount={pageCount}
            forcePage={currentPage}
            onPageChange={({ selected }) => setPage(selected)}
            containerClassName="another-pagination-pages"
            pageClassName="another-pagination-page"
            pageLinkClassName="another-pagination-page-link"
            activeClassName="another-pagination-page-active"
            breakClassName="another-pagination-page"
            breakLinkClassName="another-pagination-page-link"
            previousClassName="hidden"
            nextClassName="hidden"
          />
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
