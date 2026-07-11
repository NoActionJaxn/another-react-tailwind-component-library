import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import Container from "./Container.tsx";
import cn from "../lib/cn.ts";

export type FooterVariant = "default" | string;

export interface FooterLink {
  href?: string;
  label: ReactNode;
}

export interface FooterColumn {
  links: FooterLink[];
  title: ReactNode;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  bottom?: ReactNode;
  columns?: FooterColumn[];
  description?: ReactNode;
  logo?: ReactNode;
  variant?: FooterVariant;
}

const Footer = ({
  as = "footer",
  bottom,
  className,
  columns = [],
  description,
  logo,
  variant = "default",
  ...rest
}: FooterProps) => {
  return (
    <Container
      as={as}
      className={cn("another-footer", className)}
      data-variant={variant}
      {...rest}
    >
      <div className="another-footer-inner">
        <div className="another-footer-top">
          {(logo || description) && (
            <div className="another-footer-brand">
              {logo && <div className="another-footer-logo">{logo}</div>}
              {description && (
                <p className="another-footer-description">{description}</p>
              )}
            </div>
          )}
          {columns.length > 0 && (
            <div className="another-footer-columns">
              {columns.map((column, index) => (
                <div className="another-footer-column" key={index}>
                  <p className="another-footer-column-title">{column.title}</p>
                  <ul className="another-footer-column-links">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a className="another-footer-link" href={link.href}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        {bottom && <div className="another-footer-bottom">{bottom}</div>}
      </div>
    </Container>
  );
};

Footer.displayName = "Footer";

export default Footer;
