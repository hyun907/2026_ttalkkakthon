import { useEffect, useRef, useState, type InputHTMLAttributes } from "react";

interface ReversedTextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
}

function reverseText(value: string) {
  return value.split("").reverse().join("");
}

/**
 * Stores text normally, presents it backwards.
 */
export function ReversedTextInput({
  value = "",
  onChange,
  className = "",
  placeholder = "Everything you type will face the other way.",
  ...props
}: ReversedTextInputProps) {
  const [internalValue, setInternalValue] = useState(value);
  const previousExternalValue = useRef(value);

  useEffect(() => {
    if (value !== previousExternalValue.current) {
      setInternalValue(value);
      previousExternalValue.current = value;
    }
  }, [value]);

  return (
    <div className="w-full">
      <input
        value={reverseText(internalValue)}
        onChange={(e) => {
          const nextValue = reverseText(e.target.value);
          setInternalValue(nextValue);
          previousExternalValue.current = nextValue;
          onChange?.(nextValue);
        }}
        placeholder={placeholder}
        className={[
          "w-full h-10 rounded-md border border-border bg-background",
          "px-3 text-sm text-foreground shadow-sm outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        ].join(" ")}
        {...props}
      />
      <p className="mt-2 text-xs text-muted-foreground font-mono">
        stored: {internalValue || "''"}
      </p>
    </div>
  );
}
