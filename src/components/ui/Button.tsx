import {
  forwardRef,
  Children,
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
} from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /**
   * When true, merges all button props (including className) onto its
   * single child element. Useful for rendering as a `<Link>` without
   * extra DOM nesting.
   */
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-sm hover:opacity-90 active:opacity-80",
  secondary:
    "bg-secondary text-secondary-foreground border border-border hover:bg-muted active:bg-surface-2",
  ghost: "text-foreground hover:bg-muted active:bg-surface-2",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-muted active:bg-surface-2",
  danger: "bg-danger text-white shadow-sm hover:opacity-90 active:opacity-80",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-9 px-4 text-sm gap-2",
  lg: "h-11 px-6 text-sm gap-2",
};

function buildClassName(variant: Variant, size: Size, extra: string) {
  return [
    "inline-flex items-center justify-center rounded-md font-medium",
    "transition-all duration-150 outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "select-none whitespace-nowrap",
    variantClasses[variant],
    sizeClasses[size],
    extra,
  ].join(" ");
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      asChild = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const resolvedClass = buildClassName(variant, size, className);

    if (asChild) {
      const child = Children.only(children);
      if (isValidElement(child)) {
        return cloneElement(child as ReactElement<Record<string, unknown>>, {
          ...props,
          className: [resolvedClass, (child.props as { className?: string }).className ?? ""]
            .join(" ")
            .trim(),
        });
      }
    }

    return (
      <button ref={ref} className={resolvedClass} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
