import * as React from "react";

import { cn } from "@/lib/utils";

interface RadioOption<TValue> {
  id: string;
  label: string;
  value: TValue;
  color?: string;
}

interface TabRadioProps<TValue extends string | boolean | undefined>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  name: string;
  options: RadioOption<TValue>[];
  value?: TValue;
  onChange?: (value: TValue) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export const TabRadio = React.forwardRef<
  HTMLInputElement,
  TabRadioProps<string | boolean>
>(function TabRadio(
  { className, name, options, value, onChange, onBlur, disabled, ...rest },
  ref,
) {
  const handleChange = (optionValue: string | boolean) => {
    if (disabled) return;
    onChange?.(optionValue as string | boolean);
  };

  return (
    <div className={cn("flex w-full gap-2.5", className)} {...rest}>
      {options.map((option, index) => {
        const isChecked = value === option.value;
        const inputRef = index === 0 ? ref : undefined;

        return (
          <label
            key={option.id}
            htmlFor={option.id}
            className={cn(
              "inline-flex cursor-pointer items-center justify-center rounded-lg px-4 py-2.5 text-xs font-medium transition-colors sm:text-sm",
              isChecked && "bg-primary font-medium text-white",
              !isChecked &&
                (option.color ? `bg-[${option.color}]` : "bg-muted"),
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <input
              ref={inputRef}
              id={option.id}
              type="radio"
              name={name}
              value={option.value?.toString() ?? ""}
              checked={isChecked}
              onBlur={onBlur}
              onChange={() => handleChange(option.value as string | boolean)}
              className="peer sr-only"
              disabled={disabled}
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
});
