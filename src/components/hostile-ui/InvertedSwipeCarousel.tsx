import { useMemo, useRef, useState, type PointerEvent } from "react";

interface InvertedSwipeCarouselProps {
  items?: string[];
  compact?: boolean;
}

const DEFAULT_ITEMS = [
  "슬라이드 01. 왼쪽으로 스와이프하면 오른쪽으로 이동합니다.",
  "슬라이드 02. 제스처 계약이 재협상되었습니다.",
  "슬라이드 03. 근육 기억은 지원되지 않습니다.",
  "슬라이드 04. 캐러셀은 확신에 차 있습니다.",
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
                다음: 왼쪽으로 스와이프. 이전: 오른쪽으로 스와이프.
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mt-3 px-1">
        <p className="text-xs text-muted-foreground">
          터치 및 포인터 드래그의 방향이 반전되어 있습니다.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={goPrevious}
            className="h-7 px-2 rounded-md border border-border bg-background text-xs text-foreground"
          >
            이전
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
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
