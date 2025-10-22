import * as React from "react";

import { cn } from "@/lib/utils";

interface RadioOption<TValue> {
  id: string;
  label: string;

  value: TValue;
  color?: string;
}

interface FormRadioProps<TValue extends string | boolean | undefined>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  name: string;
  options: RadioOption<TValue>[];
  value?: TValue;
  onChange?: (value: TValue) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export const Radio = React.forwardRef<
  HTMLInputElement,
  FormRadioProps<string | boolean>
>(function Radio(
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
              "inline-flex w-full cursor-pointer items-center justify-center rounded-lg py-2 transition-colors",
              isChecked && "bg-primary font-medium text-white",
              disabled && "cursor-not-allowed opacity-50",
              option.color ? `bg-[${option.color}]` : "bg-accent",
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
