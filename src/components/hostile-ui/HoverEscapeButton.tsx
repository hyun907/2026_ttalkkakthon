import {
  useRef,
  useState,
  useCallback,
  type MouseEvent,
  type PointerEvent,
  type ButtonHTMLAttributes,
} from "react";
import { trackChaosInteraction } from "@/lib/analytics";

interface HoverEscapeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Text label rendered inside the button */
  label?: string;
  /**
   * How aggressively the button evades. 1 = mild, 3 = relentless.
   * @default 1.4
   */
  evadeStrength?: number;
  /**
   * Whether the button is constrained within its parent container.
   * @default true
   */
  bounded?: boolean;
  /**
   * Disable the escape behavior (renders a normal button).
   * @default false
   */
  disabledEscape?: boolean;
}

interface Position {
  x: number;
  y: number;
}

/**
 * HoverEscapeButton
 *
 * A production-quality primary button that evades pointer interaction.
 * Position is absolute within a `position: relative` container — the
 * parent DemoFrame or any `relative overflow-hidden` div provides bounds.
 *
 * @example
 * <div className="relative w-full h-48 overflow-hidden">
 *   <HoverEscapeButton label="Submit" />
 * </div>
 */
export function HoverEscapeButton({
  label = "Submit",
  evadeStrength = 1.4,
  bounded = true,
  disabledEscape = false,
  className = "",
  onClick,
  ...props
}: HoverEscapeButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState<Position>({ x: 50, y: 50 }); // percent
  const [isEvading, setIsEvading] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const evade = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (disabledEscape || !containerRef.current || !btnRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const btn = btnRef.current.getBoundingClientRect();

      // Pointer position relative to container (0–1)
      const px = (e.clientX - container.left) / container.width;
      const py = (e.clientY - container.top) / container.height;

      // Current button center in percent
      const cx = pos.x / 100;
      const cy = pos.y / 100;

      // Vector from pointer to button center
      const dx = cx - px;
      const dy = cy - py;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;

      // Minimum trigger distance — only evade if pointer is within 20% of container
      const triggerRadius = 0.22;
      if (dist > triggerRadius) return;

      // Flee direction (normalized, away from pointer)
      const nx = dx / dist;
      const ny = dy / dist;

      // Step size in percent of container
      const stepX = nx * evadeStrength * 14;
      const stepY = ny * evadeStrength * 14;

      // Button half-size in percent of container
      const halfW = bounded ? ((btn.width / container.width) * 100) / 2 : 0;
      const halfH = bounded ? ((btn.height / container.height) * 100) / 2 : 0;

      const padding = 4; // extra breathing room (%)
      const minX = halfW + padding;
      const maxX = 100 - halfW - padding;
      const minY = halfH + padding;
      const maxY = 100 - halfH - padding;

      let newX = pos.x + stepX;
      let newY = pos.y + stepY;

      // Bounce off walls instead of clamping flat
      if (newX < minX) newX = minX + (minX - newX) * 0.3;
      if (newX > maxX) newX = maxX - (newX - maxX) * 0.3;
      if (newY < minY) newY = minY + (minY - newY) * 0.3;
      if (newY > maxY) newY = maxY - (newY - maxY) * 0.3;

      // Hard clamp as a safety net
      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));

      setPos({ x: newX, y: newY });
      setIsEvading(true);
    },
    [pos, evadeStrength, bounded, disabledEscape]
  );

  function handlePointerLeave() {
    setIsEvading(false);
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    // The button is essentially never actually clickable during hover,
    // but if someone manages to click it, acknowledge their triumph.
    setClickCount((c) => c + 1);
    trackChaosInteraction("HoverEscapeButton", "click_success", {
      click_count: clickCount + 1,
    });
    onClick?.(e);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onPointerMove={evade}
      onPointerLeave={handlePointerLeave}
    >
      <button
        ref={btnRef}
        onClick={handleClick}
        style={{
          position: "absolute",
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: "translate(-50%, -50%)",
          transition: isEvading
            ? "left 160ms cubic-bezier(0.25, 1.4, 0.5, 1), top 160ms cubic-bezier(0.25, 1.4, 0.5, 1)"
            : "left 400ms cubic-bezier(0.34, 1.56, 0.64, 1), top 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
        className={[
          "inline-flex items-center justify-center",
          "h-9 px-4 rounded-md text-sm font-medium",
          "bg-primary text-primary-foreground shadow-md",
          "select-none whitespace-nowrap cursor-default",
          "outline-none",
          className,
        ].join(" ")}
        {...props}
      >
        {clickCount > 0 ? `Impressive. (×${clickCount})` : label}
      </button>
    </div>
  );
}
