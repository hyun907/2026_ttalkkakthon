import {
  useRef,
  useState,
  useCallback,
  type MouseEvent,
  type PointerEvent,
  type ButtonHTMLAttributes,
} from "react";

interface ShrinkOnApproachButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  shrinkStrength?: number;
  disabledShrink?: boolean;
}

/**
 * A button that becomes physically less actionable as the pointer approaches.
 */
export function ShrinkOnApproachButton({
  label = "Continue",
  shrinkStrength = 1.2,
  disabledShrink = false,
  className = "",
  onClick,
  ...props
}: ShrinkOnApproachButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [scale, setScale] = useState(1);
  const [clickCount, setClickCount] = useState(0);

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (disabledShrink || !containerRef.current || !btnRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const button = btnRef.current.getBoundingClientRect();

      const px = e.clientX - container.left;
      const py = e.clientY - container.top;

      const cx = button.left - container.left + button.width / 2;
      const cy = button.top - container.top + button.height / 2;

      const dx = px - cx;
      const dy = py - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = Math.max(container.width, container.height) * 0.55;
      const proximity = Math.max(0, 1 - distance / maxDistance);

      const minScale = Math.max(0.28, 0.72 - shrinkStrength * 0.22);
      const nextScale = 1 - proximity * (1 - minScale);

      setScale(Number(nextScale.toFixed(3)));
    },
    [disabledShrink, shrinkStrength]
  );

  function handlePointerLeave() {
    setScale(1);
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    setClickCount((count) => count + 1);
    onClick?.(e);
  }

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-full"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <button
        ref={btnRef}
        onClick={handleClick}
        style={{
          transform: `scale(${scale})`,
          transition:
            "transform 110ms cubic-bezier(0.22, 1, 0.36, 1), opacity 110ms ease",
          opacity: 0.72 + scale * 0.28,
        }}
        className={[
          "inline-flex items-center justify-center",
          "h-10 px-5 rounded-md text-sm font-medium",
          "bg-primary text-primary-foreground shadow-md",
          "outline-none select-none whitespace-nowrap",
          className,
        ].join(" ")}
        {...props}
      >
        {clickCount > 0 ? `Technically clicked. (${clickCount})` : label}
      </button>
    </div>
  );
}
