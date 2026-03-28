import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
} from "react";

interface JudgmentalNameInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> {
  value?: string;
  onChange?: (value: string) => void;
}

const HOSTILE_RESPONSE = "이 이름은 마음에 들지 않습니다.";

export function JudgmentalNameInput({
  value = "",
  onChange,
  className = "",
  placeholder = "이름을 입력하세요",
  ...props
}: JudgmentalNameInputProps) {
  const [internalValue, setInternalValue] = useState(value);
  const [showJudgment, setShowJudgment] = useState(false);
  const previousExternalValue = useRef(value);

  useEffect(() => {
    if (value !== previousExternalValue.current) {
      setInternalValue(value);
      previousExternalValue.current = value;
    }
  }, [value]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!internalValue.trim()) return;

    setShowJudgment(true);
    previousExternalValue.current = internalValue;
    onChange?.(internalValue);
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <label className="block text-sm font-medium text-foreground mb-2">
        이름을 입력하세요
      </label>
      <div className="flex gap-2">
        <input
          value={internalValue}
          onChange={(e) => {
            const nextValue = e.target.value;
            setInternalValue(nextValue);
            if (!nextValue.trim()) {
              setShowJudgment(false);
            }
            previousExternalValue.current = nextValue;
          }}
          placeholder={placeholder}
          className={[
            "flex-1 h-10 rounded-md border border-border bg-background",
            "px-3 text-sm text-foreground shadow-sm outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            className,
          ].join(" ")}
          {...props}
        />
        <button
          type="submit"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm"
        >
          확인
        </button>
      </div>
      {showJudgment ? (
        <p className="mt-2 text-xs text-danger">{HOSTILE_RESPONSE}</p>
      ) : null}
      <p className="mt-2 text-xs text-muted-foreground">
        사용자가 확인을 누르는 순간, 컴포넌트가 즉시 평가를 시작합니다.
      </p>
    </form>
  );
}
