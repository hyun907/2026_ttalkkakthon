import { useMemo, useRef, useState, type PointerEvent } from "react";

interface InvertedSwipeCarouselProps {
  items?: string[];
  compact?: boolean;
}

const DEFAULT_ITEMS = [
  "Slide 01. Swipe left to go right.",
  "Slide 02. The gesture contract has been renegotiated.",
  "Slide 03. Muscle memory is not supported.",
  "Slide 04. The carousel remains confident.",
];

/**
 * A swipe carousel that interprets directional intent in reverse.
 */
export function InvertedSwipeCarousel({
  items = DEFAULT_ITEMS,
  compact = false,
}: InvertedSwipeCarouselProps) {
  const [index, setIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const dragDelta = useRef(0);

  const clampedIndex = useMemo(
    () => Math.max(0, Math.min(items.length - 1, index)),
    [index, items.length]
  );

  function stepByGesture(delta: number) {
    if (Math.abs(delta) < 36) return;

    setIndex((current) => {
      if (delta < 0) return Math.max(0, current - 1);
      return Math.min(items.length - 1, current + 1);
    });
  }

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointerStart.current = e.clientX;
    dragDelta.current = 0;
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (pointerStart.current === null) return;
    dragDelta.current = e.clientX - pointerStart.current;
  }

  function handlePointerUp(e: PointerEvent<HTMLDivElement>) {
    if (pointerStart.current === null) return;

    const delta = dragDelta.current || e.clientX - pointerStart.current;
    pointerStart.current = null;
    dragDelta.current = 0;
    e.currentTarget.releasePointerCapture(e.pointerId);

    stepByGesture(delta);
  }

  function handlePointerCancel(e: PointerEvent<HTMLDivElement>) {
    pointerStart.current = null;
    dragDelta.current = 0;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  function goPrevious() {
    setIndex((current) => Math.min(items.length - 1, current + 1));
  }

  function goNext() {
    setIndex((current) => Math.max(0, current - 1));
  }

  return (
    <div className="w-full max-w-xl">
      <div
        className="rounded-lg border border-border bg-card overflow-hidden touch-pan-y select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${clampedIndex * 100}%)` }}
        >
          {items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className={[
                "w-full shrink-0 flex flex-col justify-between bg-gradient-to-br from-card to-surface",
                compact ? "min-h-32 p-4" : "min-h-44 p-6",
              ].join(" ")}
            >
              <span className="text-xs font-mono text-muted-foreground">
                {String(itemIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
              <p
                className={[
                  "font-semibold text-foreground max-w-sm leading-snug",
                  compact ? "text-base" : "text-lg",
                ].join(" ")}
              >
                {item}
              </p>
              <p className="text-xs text-muted-foreground">
                Swipe right for next. Swipe left for previous.
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mt-3 px-1">
        <p className="text-xs text-muted-foreground">
          Expected direction is inverted on touch and pointer drag.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={goPrevious}
            className="h-7 px-2 rounded-md border border-border bg-background text-xs text-foreground"
          >
            Prev
          </button>
          {items.map((_, dotIndex) => (
            <span
              key={dotIndex}
              className={[
                "w-2 h-2 rounded-full transition-colors",
                dotIndex === clampedIndex ? "bg-primary" : "bg-border",
              ].join(" ")}
            />
          ))}
          <button
            type="button"
            onClick={goNext}
            className="h-7 px-2 rounded-md border border-border bg-background text-xs text-foreground"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
