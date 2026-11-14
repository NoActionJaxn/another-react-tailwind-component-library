import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import type { HTMLAttributes, ReactNode } from "react";
import { schemeStyle, type ColorScheme } from "../../utils";
import { IconButton } from "../IconButton";
import { paginationRange } from "./usePagination";

export type PaginationVariant = "ghost" | "outline" | "soft";
export type PaginationSize = "sm" | "md" | "lg";
export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  getHref?: (page: number) => string;
  siblings?: number;
  boundaries?: number;
  showFirstLast?: boolean;
  variant?: PaginationVariant;
  size?: PaginationSize;
  colorScheme?: ColorScheme;
  previousLabel?: string;
  nextLabel?: string;
  firstLabel?: string;
  lastLabel?: string;
  pageLabel?: (page: number) => string;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  getHref,
  siblings = 1,
  boundaries = 1,
  showFirstLast = false,
  variant = "ghost",
  size = "md",
  colorScheme,
  previousLabel = "Previous page",
  nextLabel = "Next page",
  firstLabel = "First page",
  lastLabel = "Last page",
  pageLabel = (page) => `Page ${page}`,
  "aria-label": ariaLabel = "Pagination",
  className,
  style,
  ...props
}: PaginationProps) {
  const count = Math.max(1, pageCount);
  const current = Math.min(Math.max(1, page), count);

  // A link when getHref is given (and the page exists), otherwise a button.
  const control = (
    target: number,
    label: string,
    content: ReactNode,
    options: { current?: boolean; disabled?: boolean } = {},
  ) => {
    const disabled = options.disabled ?? false;
    return (
      <IconButton
        variant={options.current ? "solid" : variant}
        size={size}
        aria-label={label}
        aria-current={options.current ? "page" : undefined}
        disabled={disabled}
        asChild={getHref != null && !disabled}
        onClick={() => {
          if (!options.current) onPageChange?.(target);
        }}
        // Square, but wide enough for long page numbers.
        className="w-auto min-w-(--_size) px-2 tabular-nums"
      >
        {getHref != null && !disabled ? (
          <a href={getHref(target)}>{content}</a>
        ) : (
          content
        )}
      </IconButton>
    );
  };

  return (
    <nav
      data-pagination
      data-size={size}
      aria-label={ariaLabel}
      style={schemeStyle(colorScheme, style)}
      className={className}
      {...props}
    >
      <ul className="flex flex-wrap items-center gap-(--_gap)">
        {showFirstLast && (
          <li>
            {control(1, firstLabel, <DoubleArrowLeftIcon aria-hidden />, {
              disabled: current === 1,
            })}
          </li>
        )}
        <li>
          {control(
            current - 1,
            previousLabel,
            <ChevronLeftIcon aria-hidden />,
            {
              disabled: current === 1,
            },
          )}
        </li>
        {paginationRange(current, count, siblings, boundaries).map((item) =>
          typeof item === "number" ? (
            <li key={item}>
              {control(item, pageLabel(item), item, {
                current: item === current,
              })}
            </li>
          ) : (
            <li
              key={item}
              aria-hidden
              className="flex size-(--_ellipsis-size) items-center justify-center text-(--_ellipsis)"
            >
              <DotsHorizontalIcon />
            </li>
          ),
        )}
        <li>
          {control(current + 1, nextLabel, <ChevronRightIcon aria-hidden />, {
            disabled: current === count,
          })}
        </li>
        {showFirstLast && (
          <li>
            {control(count, lastLabel, <DoubleArrowRightIcon aria-hidden />, {
              disabled: current === count,
            })}
          </li>
        )}
      </ul>
    </nav>
  );
}
