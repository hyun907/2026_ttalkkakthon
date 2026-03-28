import { useState, useEffect, useCallback, useMemo, useRef } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface MarkSenseGridProps {
  length: number;
  label?: string;
  description?: string;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  segmented?: boolean;
  segmentPattern?: number[];
  strictMode?: boolean;
  /** Digits to show per column. Defaults to [0…9]. */
  digits?: number[];
  disabled?: boolean;
  className?: string;
}

// ── Bubble ────────────────────────────────────────────────────────────────────

function Bubble({
  digit,
  selected,
  onClick,
  disabled,
  ariaLabel,
}: {
  digit: number;
  selected: boolean;
  onClick: () => void;
  disabled: boolean;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={[
        "w-6 h-6 rounded-full text-[11px] font-medium tabular-nums",
        "flex items-center justify-center shrink-0",
        "border transition-all duration-120",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        selected
          ? "bg-primary border-primary text-primary-foreground shadow-sm scale-110"
          : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
        disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "cursor-pointer",
      ].join(" ")}
    >
      {digit}
    </button>
  );
}

// ── GridColumn ────────────────────────────────────────────────────────────────

function GridColumn({
  index,
  selected,
  onSelect,
  locked,
  disabled,
  digits,
}: {
  index: number;
  selected: number | null;
  onSelect: (digit: number) => void;
  locked: boolean;
  disabled: boolean;
  digits: number[];
}) {
  return (
    <div
      className={[
        "flex flex-col items-center gap-[3px]",
        locked ? "opacity-30 pointer-events-none" : "",
      ].join(" ")}
    >
      <span className="text-[9px] font-semibold text-muted-foreground/60 mb-0.5 tabular-nums select-none">
        {index + 1}
      </span>
      {digits.map((d) => (
        <Bubble
          key={d}
          digit={d}
          selected={selected === d}
          onClick={() => onSelect(d)}
          disabled={disabled || locked}
          ariaLabel={`Digit ${d} for position ${index + 1}`}
        />
      ))}
    </div>
  );
}

// ── MarkSenseGrid ───────────────────────────────────────────────────────────────

export function MarkSenseGrid({
  length,
  label,
  description,
  value,
  onChange,
  onComplete,
  segmented = false,
  segmentPattern,
  strictMode = false,
  digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  disabled = false,
  className = "",
}: MarkSenseGridProps) {
  const [selections, setSelections] = useState<(number | null)[]>(() =>
    Array(length).fill(null)
  );

  const prevCompletedRef = useRef(false);

  // Sync controlled value
  useEffect(() => {
    if (value === undefined) return;
    const parsed = value.split("").map((c) => {
      const n = parseInt(c, 10);
      return isNaN(n) ? null : n;
    });
    const padded = [
      ...parsed,
      ...Array(Math.max(0, length - parsed.length)).fill(null),
    ].slice(0, length) as (number | null)[];
    setSelections(padded);
  }, [value, length]);

  const isComplete = useMemo(
    () => selections.every((s) => s !== null),
    [selections]
  );

  const filledCount = useMemo(
    () => selections.filter((s) => s !== null).length,
    [selections]
  );

  // Completion side-effects
  useEffect(() => {
    const wasComplete = prevCompletedRef.current;
    prevCompletedRef.current = isComplete;
    if (isComplete && !wasComplete) {
      const full = (selections as number[]).join("");
      onChange?.(full);
      onComplete?.(full);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete]);

  // strictMode: column i is locked if any column before it is unfilled
  const strictBarrier = useMemo(() => {
    if (!strictMode) return Infinity;
    const firstEmpty = selections.findIndex((s) => s === null);
    return firstEmpty === -1 ? Infinity : firstEmpty;
  }, [strictMode, selections]);

  const handleSelect = useCallback(
    (colIndex: number, digit: number) => {
      if (disabled) return;
      if (colIndex > strictBarrier) return;
      setSelections((prev) => {
        const next = [...prev];
        next[colIndex] = prev[colIndex] === digit ? null : digit;
        return next;
      });
    },
    [disabled, strictBarrier]
  );

  // Segment groups
  const segments = useMemo(() => {
    if (!segmented) return [Array.from({ length }, (_, i) => i)];
    const pattern =
      segmentPattern && segmentPattern.length > 0 ? segmentPattern : [length];
    const groups: number[][] = [];
    let cursor = 0;
    for (const size of pattern) {
      const end = Math.min(cursor + size, length);
      groups.push(Array.from({ length: end - cursor }, (_, i) => cursor + i));
      cursor = end;
      if (cursor >= length) break;
    }
    if (cursor < length)
      groups.push(Array.from({ length: length - cursor }, (_, i) => cursor + i));
    return groups;
  }, [segmented, segmentPattern, length]);

  return (
    <div className={["w-full", className].join(" ")}>
      {(label || description) && (
        <div className="mb-3">
          {label && (
            <p className="text-sm font-semibold text-foreground mb-0.5">{label}</p>
          )}
          {description && (
            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
          )}
        </div>
      )}

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground select-none">
            Mark one response per column
          </span>
          <span className="text-[10px] tabular-nums text-muted-foreground font-mono">
            {filledCount}&thinsp;/&thinsp;{length}
          </span>
        </div>

        {/* Bubble grid */}
        <div className="overflow-x-auto">
          <div className="flex items-start px-4 py-4 gap-1 min-w-fit">
            {segments.map((group, gi) => (
              <div key={gi} className="flex items-start gap-1">
                {group.map((colIndex) => (
                  <GridColumn
                    key={colIndex}
                    index={colIndex}
                    selected={selections[colIndex]}
                    onSelect={(d) => handleSelect(colIndex, d)}
                    locked={colIndex > strictBarrier}
                    disabled={disabled}
                    digits={digits}
                  />
                ))}
                {gi < segments.length - 1 && (
                  <div className="flex flex-col pt-5 px-1 self-stretch">
                    <span className="text-muted-foreground/30 text-xs select-none leading-none mt-1">
                      ·
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Value preview strip */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-surface">
          <div className="flex items-center gap-px font-mono">
            {segments.map((group, gi) => (
              <span key={gi} className="flex items-center gap-px">
                {group.map((colIndex) => (
                  <span
                    key={colIndex}
                    className={[
                      "text-sm tabular-nums w-[18px] text-center transition-colors duration-100",
                      selections[colIndex] !== null
                        ? "text-foreground font-semibold"
                        : "text-border",
                    ].join(" ")}
                  >
                    {selections[colIndex] !== null ? selections[colIndex] : "·"}
                  </span>
                ))}
                {gi < segments.length - 1 && (
                  <span className="text-muted-foreground/40 mx-0.5 text-xs">–</span>
                )}
              </span>
            ))}
          </div>
          {isComplete && (
            <span className="text-xs font-medium text-emerald-600">Complete</span>
          )}
        </div>
      </div>

      <p className="mt-1.5 text-[11px] text-muted-foreground/70">
        Fill carefully. Mark one bubble per column.
      </p>
    </div>
  );
}
