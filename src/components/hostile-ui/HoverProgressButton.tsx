import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type HoverProgressVariant = "fill" | "circle";

export interface HoverProgressButtonProps {
  children: ReactNode;
  variant?: HoverProgressVariant;
  /** ms to hold before button unlocks. @default 1800 */
  holdDuration?: number;
  onClick?: () => void;
  disabled?: boolean;
  /** Reset progress when pointer leaves. @default true */
  resetOnLeave?: boolean;
  /** Auto-reset progress after click fires. @default true */
  autoResetAfterClick?: boolean;
  className?: string;
}

// ── useHoverProgress ──────────────────────────────────────────────────────────

function useHoverProgress(holdDuration: number, resetOnLeave: boolean) {
  const [progress, setProgress] = useState(0);   // 0 → 1
  const [unlocked, setUnlocked] = useState(false);

  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hoveringRef = useRef(false);

  const tick = useCallback(
    (now: number) => {
      if (!hoveringRef.current) return;
      if (startTimeRef.current === null) startTimeRef.current = now;

      const elapsed = now - startTimeRef.current;
      const p = Math.min(elapsed / holdDuration, 1);
      setProgress(p);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setUnlocked(true);
        rafRef.current = null;
      }
    },
    [holdDuration]
  );

  const startProgress = useCallback(() => {
    if (unlocked) return;
    hoveringRef.current = true;
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [unlocked, tick]);

  const stopProgress = useCallback(() => {
    hoveringRef.current = false;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (resetOnLeave) {
      startTimeRef.current = null;
      setProgress(0);
      setUnlocked(false);
    }
  }, [resetOnLeave]);

  const reset = useCallback(() => {
    hoveringRef.current = false;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    startTimeRef.current = null;
    setProgress(0);
    setUnlocked(false);
  }, []);

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { progress, unlocked, startProgress, stopProgress, reset };
}

// ── Status text ───────────────────────────────────────────────────────────────

function StatusText({ progress, unlocked }: { progress: number; unlocked: boolean }) {
  let text: string | null = null;
  if (unlocked) text = "확인됨 — 클릭하세요";
  else if (progress > 0) text = "의도 확인 중...";

  return (
    <div
      className="mt-2 text-xs text-muted-foreground text-center"
      style={{
        height: "1.25rem",
        opacity: text ? 1 : 0,
        transition: "opacity 180ms ease",
      }}
    >
      {text}
    </div>
  );
}

// ── FillVariant ───────────────────────────────────────────────────────────────

function FillVariant({
  children,
  progress,
  unlocked,
  handlers,
  disabled,
  onActivate,
  className,
}: {
  children: ReactNode;
  progress: number;
  unlocked: boolean;
  handlers: { onPointerEnter: () => void; onPointerLeave: () => void };
  disabled: boolean;
  onActivate: () => void;
  className?: string;
}) {
  return (
    <div className="inline-flex flex-col items-center">
      <button
        type="button"
        disabled={disabled}
        onClick={unlocked ? onActivate : undefined}
        onPointerEnter={handlers.onPointerEnter}
        onPointerLeave={handlers.onPointerLeave}
        className={[
          "relative overflow-hidden",
          "inline-flex items-center justify-center gap-2",
          "rounded-lg px-5 py-2.5",
          "text-sm font-medium",
          "border border-border",
          "bg-card text-foreground",
          "select-none outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          unlocked
            ? "cursor-pointer hover:brightness-95 active:scale-[0.98] transition-transform"
            : "cursor-default",
          disabled ? "opacity-40 pointer-events-none" : "",
          className ?? "",
        ].join(" ")}
        style={{ minWidth: "9rem" }}
      >
        {/* Fill overlay */}
        <span
          aria-hidden
          className="absolute inset-0 bg-primary/15 pointer-events-none"
          style={{
            transformOrigin: "left center",
            transform: `scaleX(${progress})`,
          }}
        />
        {/* Content */}
        <span className="relative z-10">{children}</span>
      </button>
      <StatusText progress={progress} unlocked={unlocked} />
    </div>
  );
}

// ── CircleVariant ─────────────────────────────────────────────────────────────

function CircleVariant({
  children,
  progress,
  unlocked,
  handlers,
  disabled,
  onActivate,
  className,
}: {
  children: ReactNode;
  progress: number;
  unlocked: boolean;
  handlers: { onPointerEnter: () => void; onPointerLeave: () => void };
  disabled: boolean;
  onActivate: () => void;
  className?: string;
}) {
  const SIZE = 80;
  const STROKE = 3;
  const RADIUS = (SIZE - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  return (
    <div className="inline-flex flex-col items-center">
      <div className="relative inline-flex items-center justify-center">
        {/* SVG ring */}
        <svg
          aria-hidden
          width={SIZE}
          height={SIZE}
          className="absolute pointer-events-none"
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={STROKE}
          />
          {/* Progress arc */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          />
        </svg>

        {/* Button inside the ring */}
        <button
          type="button"
          disabled={disabled}
          onClick={unlocked ? onActivate : undefined}
          onPointerEnter={handlers.onPointerEnter}
          onPointerLeave={handlers.onPointerLeave}
          className={[
            "relative z-10 inline-flex items-center justify-center",
            "rounded-full",
            "text-sm font-medium",
            "bg-card text-foreground border border-border",
            "select-none outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            unlocked
              ? "cursor-pointer hover:brightness-95 active:scale-95 transition-transform"
              : "cursor-default",
            disabled ? "opacity-40 pointer-events-none" : "",
            className ?? "",
          ].join(" ")}
          style={{
            width: SIZE - STROKE * 2 - 6,
            height: SIZE - STROKE * 2 - 6,
            fontSize: "0.7rem",
            padding: 0,
            lineHeight: 1.2,
            textAlign: "center",
          }}
        >
          {children}
        </button>
      </div>
      <StatusText progress={progress} unlocked={unlocked} />
    </div>
  );
}

// ── HoverProgressButton ───────────────────────────────────────────────────────

/**
 * HoverProgressButton
 *
 * Requires the user to hover over the button for `holdDuration` ms before it
 * becomes clickable. Two visual variants communicate the progress differently:
 *
 * - `fill`   — gauge fills inside the button left-to-right
 * - `circle` — circular SVG ring surrounds the button
 *
 * By default, progress resets when the pointer leaves (resetOnLeave=true).
 */
export function HoverProgressButton({
  children,
  variant = "fill",
  holdDuration = 1800,
  onClick,
  disabled = false,
  resetOnLeave = true,
  autoResetAfterClick = true,
  className,
}: HoverProgressButtonProps) {
  const { progress, unlocked, startProgress, stopProgress, reset } =
    useHoverProgress(holdDuration, resetOnLeave);

  const handleActivate = useCallback(() => {
    if (!unlocked || disabled) return;
    onClick?.();
    if (autoResetAfterClick) reset();
  }, [unlocked, disabled, onClick, autoResetAfterClick, reset]);

  const handlers = {
    onPointerEnter: startProgress,
    onPointerLeave: stopProgress,
  };

  const sharedProps = {
    children,
    progress,
    unlocked,
    handlers,
    disabled,
    onActivate: handleActivate,
    className,
  };

  if (variant === "circle") return <CircleVariant {...sharedProps} />;
  return <FillVariant {...sharedProps} />;
}
