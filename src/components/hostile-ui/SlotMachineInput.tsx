import { useEffect, useMemo, useRef, useState } from "react";
import { trackChaosInteraction } from "@/lib/analytics";

interface SlotMachineInputProps {
  compact?: boolean;
}

function getNextDigit(current: number) {
  return (current + 1) % 10;
}

export function SlotMachineInput({ compact = false }: SlotMachineInputProps) {
  const [digits, setDigits] = useState<[number, number]>([2, 4]);
  const [activeIndex, setActiveIndex] = useState<0 | 1 | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState(
    "숫자 하나도 제대로 못 맞추시나요? 잭팟 터질 때까지 계속 돌리세요.",
  );
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const ageLabel = useMemo(() => `${digits[0]}${digits[1]}`, [digits]);

  function startSpin(index: 0 | 1) {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }

    setActiveIndex(index);
    setIsSpinning(true);
    trackChaosInteraction("SlotMachineInput", "spin_start", {
      digit_place: index === 0 ? "tens" : "ones",
      compact_mode: compact,
    });
    setMessage(
      index === 0
        ? "십의 자리부터 갑니다. 여기서부터 감이 없으면 끝까지 고생합니다."
        : "일의 자리 차례입니다. 이번엔 제발 사람 나이처럼 보여주세요.",
    );

    intervalRef.current = window.setInterval(
      () => {
        setDigits((current) => {
          const next = [...current] as [number, number];
          next[index] = getNextDigit(next[index]);
          return next;
        });
      },
      compact ? 95 : 80,
    );
  }

  function stopSpin() {
    if (activeIndex === null) return;

    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const stoppedIndex = activeIndex;
    setActiveIndex(null);
    setIsSpinning(false);
    trackChaosInteraction("SlotMachineInput", "spin_stop", {
      digit_place: stoppedIndex === 0 ? "tens" : "ones",
      selected_age: Number(ageLabel),
      compact_mode: compact,
    });
    setMessage(
      stoppedIndex === 0
        ? "좋아요. 이제 일의 자리에서도 기적을 반복해 보세요."
        : `현재 입력된 나이는 ${ageLabel}세입니다. 믿기 어렵지만 일단 저장해 두죠.`,
    );
  }

  const compactMessage = isSpinning
    ? activeIndex === 0
      ? "십의 자리 도는 중"
      : "일의 자리 도는 중"
    : `${ageLabel}세`;

  return (
    <div
      className={[
        "w-full max-w-md rounded-xl border border-border bg-card shadow-lg",
        compact ? "p-3" : "p-4",
      ].join(" ")}
    >
      {compact ? (
        <>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">
                나이를 선택해주세요.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background px-3 py-1.5 font-mono text-2xl leading-none text-foreground shadow-sm">
              {digits[0]}
              {digits[1]}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => startSpin(0)}
              disabled={isSpinning}
              className={[
                "inline-flex h-9 items-center justify-center rounded-md border border-border bg-background text-sm font-medium text-foreground",
                "disabled:pointer-events-none disabled:opacity-50",
                activeIndex === 0 ? "ring-2 ring-primary" : "",
              ].join(" ")}
            >
              십
            </button>
            <button
              type="button"
              onClick={() => startSpin(1)}
              disabled={isSpinning}
              className={[
                "inline-flex h-9 items-center justify-center rounded-md border border-border bg-background text-sm font-medium text-foreground",
                "disabled:pointer-events-none disabled:opacity-50",
                activeIndex === 1 ? "ring-2 ring-primary" : "",
              ].join(" ")}
            >
              일
            </button>
            <button
              type="button"
              onClick={stopSpin}
              disabled={!isSpinning}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm disabled:pointer-events-none disabled:opacity-50"
            >
              STOP
            </button>
          </div>

          <p className="mt-2 text-[11px] text-muted-foreground">
            {compactMessage}
          </p>
        </>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-foreground">
                Age Slot Input
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                직접 타이핑은 허용되지 않습니다.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background px-3 py-2 font-mono text-lg text-foreground shadow-sm">
              {digits[0]}
              {digits[1]}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {[0, 1].map((index) => (
              <button
                key={index}
                type="button"
                onClick={() => startSpin(index as 0 | 1)}
                disabled={isSpinning}
                className={[
                  "inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground",
                  "disabled:pointer-events-none disabled:opacity-50",
                  activeIndex === index ? "ring-2 ring-primary" : "",
                ].join(" ")}
              >
                {index === 0 ? "십의 자리" : "일의 자리"}
              </button>
            ))}
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={stopSpin}
              disabled={!isSpinning}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm disabled:pointer-events-none disabled:opacity-50"
            >
              STOP
            </button>
          </div>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {message}
          </p>
        </>
      )}
    </div>
  );
}
