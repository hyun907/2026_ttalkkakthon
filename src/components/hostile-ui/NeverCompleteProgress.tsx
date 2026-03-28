import { useEffect, useState } from "react";

interface NeverCompleteProgressProps {
  label?: string;
  durationMs?: number;
  stalledLabel?: string;
}

/**
 * A progress indicator with a durable commitment to 99%.
 */
export function NeverCompleteProgress({
  label = "처리 중",
  durationMs = 8000,
  stalledLabel = "거의 다 됐어요",
}: NeverCompleteProgressProps) {
  const [progress, setProgress] = useState(7);

  useEffect(() => {
    const startedAt = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 99.99) return 99.99;

        if (current >= 99) {
          return Math.min(99.99, Number((current + 0.03).toFixed(2)));
        }

        const next = current + Math.max(1, Math.round((99 - current) * 0.08));
        return Math.min(99, next);
      });
    }, Math.max(70, Math.round(durationMs / 48)));

    return () => window.clearInterval(startedAt);
  }, [durationMs]);

  const progressLabel =
    progress >= 99 ? `${progress.toFixed(2)}%` : `${Math.round(progress)}%`;

  return (
    <div className="w-full max-w-md rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">
            {progress >= 99 ? stalledLabel : "마지막 단계를 준비하는 중"}
          </p>
        </div>
        <span className="text-sm font-mono text-foreground">{progressLabel}</span>
      </div>

      <div className="h-3 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
