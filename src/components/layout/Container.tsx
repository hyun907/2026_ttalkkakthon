import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeClasses = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  full: "max-w-none",
};

export function Container({ size = "xl", className = "", children, ...props }: ContainerProps) {
  return (
    <div
      className={["mx-auto w-full px-6", sizeClasses[size], className].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
