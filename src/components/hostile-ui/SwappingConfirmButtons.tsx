import { useEffect, useMemo, useState } from "react";

interface SwappingConfirmButtonsProps {
  compact?: boolean;
  autoSwapMs?: number;
}

const SWAP_MESSAGES = [
  "버튼 위치가 바뀌었습니다. 이번에는 익숙함이 도움이 되지 않습니다.",
  "확인과 취소는 계속 자리를 바꿉니다. 자동 반응은 권장되지 않습니다.",
  "이번에는 오른쪽이 안전하다는 보장이 없습니다.",
];

export function SwappingConfirmButtons({
  compact = false,
  autoSwapMs = 1100,
}: SwappingConfirmButtonsProps) {
  const [swapSeed, setSwapSeed] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSwapSeed((current) => current + 1);
      setMessageIndex((current) => (current + 1) % SWAP_MESSAGES.length);
    }, autoSwapMs);

    return () => window.clearInterval(timer);
  }, [autoSwapMs]);

  const actions = useMemo(() => {
    const confirmButton = (
      <button
        key="confirm"
        type="button"
        onClick={() => {
          setSwapSeed((current) => current + 1);
          setMessageIndex((current) => (current + 1) % SWAP_MESSAGES.length);
        }}
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm"
      >
        확인
      </button>
    );

    const cancelButton = (
      <button
        key="cancel"
        type="button"
        onClick={() => {
          setSwapSeed((current) => current + 1);
          setMessageIndex((current) => (current + 1) % SWAP_MESSAGES.length);
        }}
        className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground"
      >
        취소
      </button>
    );

    return swapSeed % 2 === 0
      ? [cancelButton, confirmButton]
      : [confirmButton, cancelButton];
  }, [swapSeed]);

  return (
    <div
      className={[
        "w-full max-w-md rounded-xl border border-border bg-card shadow-lg",
        compact ? "p-3" : "p-4",
      ].join(" ")}
    >
      <p
        className={[
          "font-semibold text-foreground leading-snug",
          compact ? "text-[15px]" : "text-lg",
        ].join(" ")}
      >
        버튼 위치는 이번에도 동일하지 않습니다.
      </p>
      <p
        className={[
          "mt-2 text-muted-foreground leading-relaxed",
          compact ? "text-[11px]" : "text-sm",
        ].join(" ")}
      >
        {compact
          ? "확인과 취소는 계속 자리만 바꿉니다."
          : SWAP_MESSAGES[messageIndex]}
      </p>
      <div className={["flex justify-end gap-2", compact ? "mt-3" : "mt-4"].join(" ")}>
        {actions}
      </div>
    </div>
  );
}
