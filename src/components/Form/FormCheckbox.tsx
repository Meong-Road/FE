import { cn } from "@/lib/utils";

interface CheckboxOption {
  id: string;
  label: string;
  value: string;
}

interface FormCheckboxProps {
  className?: string;
  name: string;
  options: CheckboxOption[];
  value: string[];
  onChange?: (value: string[]) => void;
}

export function Checkbox({
  className,
  name,
  options,
  value = [],
  onChange,
}: FormCheckboxProps) {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange?.([...value, optionValue]);
    } else {
      onChange?.(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <div className={cn("flex w-full gap-2.5", className)}>
      {options.map((option, index) => (
        <div className="flex-1" key={index}>
          <input
            type="checkbox"
            name={name}
            id={option.id}
            className="peer sr-only"
            onChange={(e) => handleChange(option.value, e.target.checked)}
          />
          <label
            htmlFor={option.id}
            className="peer-checked:bg-primary inline-flex aspect-square w-full cursor-pointer items-center justify-center rounded-full bg-[#edf4fb] px-2 py-2 peer-checked:font-medium peer-checked:text-white"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
