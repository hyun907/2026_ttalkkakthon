import type { ReactNode, HTMLAttributes } from "react";

// ── Semantic doc content primitives ──────────────────────────────────────────
// These are NOT generic UI components — they are page-level typography helpers
// for the docs experience only. They apply the correct prose rhythm without
// introducing a heavy prose plugin dependency.

interface DocHeadingProps {
  level: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}

const headingClasses = {
  1: "text-3xl font-bold text-foreground tracking-tight mb-4",
  2: "text-xl font-semibold text-foreground tracking-tight mt-2 mb-3",
  3: "text-base font-semibold text-foreground tracking-tight mt-1 mb-2",
  4: "text-sm font-semibold text-foreground tracking-tight mb-1.5",
};

export function DocHeading({ level, children, className = "" }: DocHeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return (
    <Tag className={[headingClasses[level], className].join(" ")}>{children}</Tag>
  );
}

interface DocParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export function DocParagraph({ children, className = "", ...props }: DocParagraphProps) {
  return (
    <p
      className={["text-sm text-foreground leading-relaxed mb-4", className].join(" ")}
      {...props}
    >
      {children}
    </p>
  );
}

interface DocListProps {
  items: ReactNode[];
  ordered?: boolean;
  className?: string;
}

export function DocList({ items, ordered = false, className = "" }: DocListProps) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={[
        "mb-4 pl-5 text-sm text-foreground leading-relaxed space-y-1.5",
        ordered ? "list-decimal" : "list-disc",
        className,
      ].join(" ")}
    >
      {items.map((item, i) => (
        <li key={i} className="pl-1">{item}</li>
      ))}
    </Tag>
  );
}

interface DocSectionProps {
  children: ReactNode;
  className?: string;
}

export function DocSection({ children, className = "" }: DocSectionProps) {
  return (
    <section className={["mt-10", className].join(" ")}>
      {children}
    </section>
  );
}

export function DocDivider() {
  return <hr className="border-border my-8" />;
}

interface DocCalloutProps {
  variant?: "info" | "warning" | "tip";
  children: ReactNode;
}

const calloutStyles = {
  info: "border-ring/30 bg-accent text-accent-foreground",
  warning: "border-warning/30 bg-warning/10 text-foreground",
  tip: "border-success/30 bg-success/10 text-foreground",
};

const calloutLabels = {
  info: "Note",
  warning: "Warning",
  tip: "Tip",
};

export function DocCallout({ variant = "info", children }: DocCalloutProps) {
  return (
    <div
      className={[
        "rounded-lg border px-4 py-3.5 my-5 text-sm leading-relaxed",
        calloutStyles[variant],
      ].join(" ")}
    >
      <span className="font-semibold mr-2">{calloutLabels[variant]}:</span>
      {children}
    </div>
  );
}
