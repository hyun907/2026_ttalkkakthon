import { useEffect, useRef, useState, type InputHTMLAttributes } from "react";

interface TypoMutatingInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  mutationRate?: number;
}

const WORD_MUTATIONS: Array<[RegExp, string]> = [
  [/\bplease\b/gi, "plase"],
  [/\bhello\b/gi, "helo"],
  [/\bbutton\b/gi, "buton"],
  [/\bemail\b/gi, "emial"],
  [/\bpassword\b/gi, "passwrod"],
  [/\bproject\b/gi, "proejct"],
  [/\bsubmit\b/gi, "submti"],
];

function introduceTypos(input: string, mutationRate: number) {
  let output = input;

  WORD_MUTATIONS.forEach(([pattern, replacement]) => {
    output = output.replace(pattern, replacement);
  });

  if (output.length < 4) return output;

  const shouldMutateCharacter = Math.random() < mutationRate;
  if (!shouldMutateCharacter) return output;

  const pivot = Math.min(
    output.length - 2,
    Math.max(1, Math.floor(output.length * 0.65))
  );

  const chars = output.split("");
  const temp = chars[pivot];
  chars[pivot] = chars[pivot + 1];
  chars[pivot + 1] = temp;

  return chars.join("");
}

/**
 * An input that politely rewrites user intent into misspellings.
 */
export function TypoMutatingInput({
  value = "",
  onChange,
  mutationRate = 0.5,
  className = "",
  placeholder = "Type carefully. It will not matter.",
  ...props
}: TypoMutatingInputProps) {
  const [internalValue, setInternalValue] = useState(value);
  const previousExternalValue = useRef(value);

  useEffect(() => {
    if (value !== previousExternalValue.current) {
      setInternalValue(value);
      previousExternalValue.current = value;
    }
  }, [value]);

  return (
    <input
      value={internalValue}
      onChange={(e) => {
        const nextValue = introduceTypos(e.target.value, mutationRate);
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
  );
}
