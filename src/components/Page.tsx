import type { ReactNode } from "react";
import classNames from "classnames";
import { usePageWrapper } from "./PageWrapper";

export interface PageProps {
  children: ReactNode;
  className?: string;
  accountForHeader?: boolean;
  id?: string;
}

function Page({ children, className, accountForHeader, id }: PageProps) {
  const { hasFixedHeader } = usePageWrapper();

  const shouldAccountForHeader = accountForHeader ?? hasFixedHeader;

  const pageStyles = classNames(
    "w-screen snap-start",
    {
      "min-h-screen": !shouldAccountForHeader,
      "min-h-[calc(100vh-var(--height-header))]": shouldAccountForHeader,
    },
    className
  );

  return <section id={id} className={pageStyles}>{children}</section>;
}

Page.displayName = "Page";

export default Page;
