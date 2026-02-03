import { createContext, useContext, type ReactNode } from "react";
import classNames from "classnames";

interface PageWrapperContextValue {
  hasFixedHeader: boolean;
}

const PageWrapperContext = createContext<PageWrapperContextValue>({
  hasFixedHeader: false,
});

export const usePageWrapper = () => useContext(PageWrapperContext);

export interface PageWrapperProps {
  children: ReactNode;
  snap?: boolean;
  hasFixedHeader?: boolean;
  className?: string;
}

function PageWrapper({
  children,
  snap = false,
  hasFixedHeader = false,
  className,
}: PageWrapperProps) {
  const wrapperStyles = classNames(
    "w-screen",
    {
      "snap-y snap-mandatory overflow-y-scroll h-screen": snap,
    },
    className
  );

  return (
    <PageWrapperContext.Provider value={{ hasFixedHeader }}>
      <div className={wrapperStyles}>{children}</div>
    </PageWrapperContext.Provider>
  );
}

PageWrapper.displayName = "PageWrapper";

export default PageWrapper;
