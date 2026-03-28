import { useState } from "react";

interface InfiniteConfirmDialogProps {
  triggerLabel?: string;
  compact?: boolean;
}

const STAGES = [
  {
    level: "1단계",
    title: "정말 제출하시겠습니까?",
    body: "지금 누른다고 해서 상황이 나아진다는 보장은 없습니다.",
  },
  {
    level: "2단계",
    title: "확실하신가요?",
    body: "다시 한 번 생각해보세요. 성급한 제출은 늘 흔적을 남깁니다.",
  },
  {
    level: "3단계",
    title: "이대로 제출하면 되돌릴 수 없습니다.",
    body: "지금 제출하시겠습니까? 이후의 후회는 시스템이 책임지지 않습니다.",
  },
  {
    level: "4단계",
    title: "입력 내용에 문제가 있을 수 있습니다.",
    body: "나중에 후회할 수도 있습니다. 지금의 확신은 대체로 일시적입니다.",
  },
  {
    level: "5단계",
    title: "정말 이 선택이 맞나요?",
    body: "지금이라도 수정하시겠어요? 아직은 스스로를 실망시키지 않을 시간이 있습니다.",
  },
  {
    level: "6단계",
    title: "그래도 제출하시겠습니까?",
    body: "마지막 기회입니다. 물론 지나가면 다시 처음부터 시작합니다.",
  },
];

export function InfiniteConfirmDialog({
  triggerLabel = "제출하기",
  compact = false,
}: InfiniteConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const stage = STAGES[stageIndex];

  return (
    <div className="w-full max-w-md">
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          setStageIndex(0);
        }}
        className={[
          "inline-flex items-center justify-center rounded-md bg-primary font-medium text-primary-foreground shadow-sm",
          compact ? "h-9 px-3 text-sm" : "h-10 px-4 text-sm",
        ].join(" ")}
      >
        {triggerLabel}
      </button>

      {isOpen ? (
        <div
          className={[
            "mt-3 rounded-xl border border-border bg-card shadow-lg",
            compact ? "p-3" : "p-4",
          ].join(" ")}
        >
          <div className={["flex items-center justify-between gap-3", compact ? "mb-1.5" : "mb-2"].join(" ")}>
            <span className="text-xs font-mono text-muted-foreground">
              {stage.level} / {STAGES.length}회차
            </span>
          </div>
          <p
            className={[
              "font-semibold text-foreground leading-snug",
              compact ? "text-[15px]" : "text-lg",
            ].join(" ")}
          >
            {stage.title}
          </p>
          <p
            className={[
              "mt-2 text-muted-foreground leading-relaxed",
              compact ? "text-[11px]" : "text-sm",
            ].join(" ")}
          >
            {compact ? stage.body.slice(0, 24) + "..." : stage.body}
          </p>
          <div className={["flex justify-end gap-2", compact ? "mt-3" : "mt-4"].join(" ")}>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={[
                "inline-flex items-center justify-center rounded-md border border-border bg-background font-medium text-foreground",
                compact ? "h-9 px-3 text-sm" : "h-10 px-4 text-sm",
              ].join(" ")}
            >
              취소
            </button>
            <button
              type="button"
              onClick={() => setStageIndex((current) => (current + 1) % STAGES.length)}
              className={[
                "inline-flex items-center justify-center rounded-md bg-primary font-medium text-primary-foreground shadow-sm",
                compact ? "h-9 px-3 text-sm" : "h-10 px-4 text-sm",
              ].join(" ")}
            >
              확인
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground">
          제출 전에 여러 번 후회할 수 있는 기회를 제공합니다.
        </p>
      )}
    </div>
  );
}
