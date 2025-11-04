import * as React from "react";

import { cn } from "@/lib/utils";

interface RadioOption {
  id: string;
  value?: string | boolean;
  label: string;
}

interface FormRadioProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: RadioOption["value"]) => void; // react-hook-form 용
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export const Radio = React.forwardRef<HTMLInputElement, FormRadioProps>(
  function Radio(
    { className, name, options, value, onChange, onBlur, disabled, ...rest },
    ref,
  ) {
    const handleChange = (option: RadioOption) => {
      onChange?.(option.value);
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
                !isChecked && "bg-[#EEEEEE]",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <input
                ref={inputRef}
                id={option.id}
                type="radio"
                name={name}
                value={option.id}
                checked={isChecked}
                onBlur={onBlur}
                onChange={() => handleChange(option)}
                className="peer sr-only"
                disabled={disabled}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    );
  },
);
