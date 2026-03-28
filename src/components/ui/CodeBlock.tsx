import { useState, type HTMLAttributes } from "react";

interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
  showCopy?: boolean;
}

export function CodeBlock({ code, language = "tsx", showCopy = true, className = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div className={["relative group rounded-lg border border-border bg-surface overflow-hidden", className].join(" ")}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface-2">
        <span className="text-xs text-muted-foreground font-mono tracking-wide">{language}</span>
        {showCopy && (
          <button
            onClick={handleCopy}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150 font-mono"
          >
            {copied ? "copied" : "copy"}
          </button>
        )}
      </div>
      <pre className="overflow-x-auto p-4 text-sm text-foreground font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

interface CommandChipProps {
  command: string;
  className?: string;
}

export function CommandChip({ command, className = "" }: CommandChipProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div
      className={[
        "flex items-center justify-between gap-4 rounded-md border border-border bg-surface px-4 py-2.5",
        "group cursor-pointer hover:border-ring/40 transition-colors duration-150",
        className,
      ].join(" ")}
      onClick={handleCopy}
    >
      <span className="font-mono text-sm text-foreground">{command}</span>
      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-150 shrink-0">
        {copied ? "copied" : "copy"}
      </span>
    </div>
  );
}
