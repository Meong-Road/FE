import { cn } from "@/lib/utils";

interface RadioOption {
  id: string;
  value?: string | boolean;
  label: string;
}

interface RadioProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (option: RadioOption) => void;
  disabled?: boolean;
}

function Radio({
  className,
  options,
  value,
  onChange,
  disabled,
  ...rest
}: RadioProps) {
  const handleChange = (option: RadioOption) => {
    onChange?.(option);
  };

  return (
    <div className={cn("flex w-full gap-2.5", className)} {...rest}>
      {options.map((option) => {
        const isChecked = value === option.id;

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
              id={option.id}
              type="radio"
              value={option.id}
              checked={isChecked}
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
}

export default Radio;
