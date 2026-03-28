import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

interface PatienceCheckboxProps {
  compact?: boolean;
  holdDuration?: number;
}

export function PatienceCheckbox({
  compact = false,
  holdDuration = 3000,
}: PatienceCheckboxProps) {
  const [progress, setProgress] = useState(0);
  const [checked, setChecked] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  function resetProgress() {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    startTimeRef.current = null;
    setProgress(0);
    setIsHolding(false);
  }

  function tick(now: number) {
    if (startTimeRef.current === null) {
      startTimeRef.current = now;
    }

    const elapsed = now - startTimeRef.current;
    const ratio = Math.min(elapsed / holdDuration, 1);

    // Slow down the last 10% so the end feels more insulting.
    const easedRatio = ratio < 0.9 ? ratio : 0.9 + (ratio - 0.9) * 0.3;
    setProgress(Math.min(easedRatio, 1));

    if (ratio >= 1) {
      setChecked(true);
      setIsHolding(false);
      rafRef.current = null;
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
  }

  function handlePointerDown(e: ReactPointerEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (checked) return;

    setIsHolding(true);

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    startTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  }

  function handlePointerUp() {
    if (!checked) {
      resetProgress();
    }
  }

  function handlePointerLeave() {
    if (isHolding && !checked) {
      resetProgress();
    }
  }

  return (
    <div
      className={[
        "w-full max-w-md rounded-xl border border-border bg-card shadow-lg",
        compact ? "p-3" : "p-4",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          aria-pressed={checked}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          className={[
            "relative shrink-0 rounded-md border-2 bg-background transition-colors",
            checked ? "border-primary" : "border-border",
            compact ? "h-11 w-11" : "h-12 w-12",
          ].join(" ")}
        >
          <span
            aria-hidden
            className="absolute inset-[3px] rounded-[6px] bg-primary/10 transition-all"
            style={{
              clipPath: `polygon(0 ${100 - progress * 100}%, 100% ${100 - progress * 100}%, 100% 100%, 0 100%)`,
              opacity: checked || progress > 0 ? 1 : 0,
            }}
          />
          <svg
            viewBox="0 0 24 24"
            className="absolute inset-0 m-auto"
            style={{
              width: compact ? 22 : 24,
              height: compact ? 22 : 24,
            }}
          >
            <path
              d="M5 12.5L10 17L19 7"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={checked ? 0 : 1 - progress}
              style={{
                transition: checked ? "stroke-dashoffset 180ms ease" : "none",
              }}
            />
          </svg>
        </button>

        <div className="min-w-0">
          <p className={["font-semibold text-foreground", compact ? "text-sm" : "text-base"].join(" ")}>
            약관에 동의하시겠습니까
          </p>
          <p className={["mt-1 text-muted-foreground leading-relaxed", compact ? "text-[11px]" : "text-sm"].join(" ")}>
            {checked
              ? "동의가 확인되었습니다."
              : isHolding
                ? "누르는 동안 체크가 채워집니다."
                : "3초간 길게 눌러야 체크됩니다."}
          </p>
        </div>
      </div>
    </div>
  );
}
