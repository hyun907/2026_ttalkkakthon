import { useEffect, useRef, useState } from "react";

interface SlowCancelToastProps {
  compact?: boolean;
}

const MESSAGE_STEPS = [
  "취",
  "소",
  "되",
  "었",
  "습",
  "니",
  "다",
];

export function SlowCancelToast({ compact = false }: SlowCancelToastProps) {
  const [toastText, setToastText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const stepIndexRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      stepIndexRef.current = 0;
    };
  }, []);

  function handleCancel() {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    stepIndexRef.current = 0;
    showNextToast();
  }

  function showNextToast() {
    if (stepIndexRef.current >= MESSAGE_STEPS.length) {
      setIsVisible(false);
      setIsEntering(false);
      setToastText("");
      timeoutRef.current = null;
      return;
    }

    setToastText(MESSAGE_STEPS[stepIndexRef.current]);
    setIsVisible(true);
    setIsEntering(true);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsEntering(false);
      });
    });

    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);

      timeoutRef.current = window.setTimeout(() => {
        stepIndexRef.current += 1;
        showNextToast();
      }, 120);
    }, 280);
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-border bg-card p-4 shadow-lg">
        <div className="flex items-center justify-between gap-2">
          <p className={["font-semibold text-foreground", compact ? "text-sm" : "text-base"].join(" ")}>
            취소 피드백은 느리게 도착합니다.
          </p>
        </div>
        <p className={["mt-2 text-muted-foreground", compact ? "text-xs" : "text-sm"].join(" ")}>
          취소를 누르면 토스트가 한 글자씩 따로 나타났다가 사라집니다. 바로 이해되면 안 됩니다.
        </p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm"
          >
            확인
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground"
          >
            취소
          </button>
        </div>
      </div>

      {isVisible ? (
        <div
          className={[
            "mt-3 mx-auto flex min-w-[7rem] items-center justify-center gap-2 rounded-2xl border border-white/10",
            "bg-foreground/95 px-4 py-2.5 text-xs font-medium text-background shadow-[0_14px_30px_rgba(15,15,18,0.28)] backdrop-blur-sm",
            "transition-all duration-200 ease-out",
            isEntering ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
          ].join(" ")}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {toastText}
        </div>
      ) : null}
    </div>
  );
}
