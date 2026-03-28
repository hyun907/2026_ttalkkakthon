import type { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
}

export function Section({ as: Tag = "section", className = "", children, ...props }: SectionProps) {
  return (
    <Tag className={["py-20", className].join(" ")} {...props}>
      {children}
    </Tag>
  );
}
