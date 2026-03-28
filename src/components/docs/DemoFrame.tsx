import type { ReactNode } from "react";

interface DemoFrameProps {
  children: ReactNode;
  label?: string;
  className?: string;
  height?: string;
}

export function DemoFrame({ children, label, className = "", height = "h-60" }: DemoFrameProps) {
  return (
    <div className={["rounded-lg border border-border overflow-hidden", className].join(" ")}>
      {label && (
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
          </div>
          <span className="text-xs text-muted-foreground font-mono ml-1">{label}</span>
        </div>
      )}
      <div className={["flex items-center justify-center bg-surface relative overflow-hidden", height].join(" ")}>
        {children}
      </div>
    </div>
  );
}
