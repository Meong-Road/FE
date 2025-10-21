import { cn } from "@/lib/utils";

interface RadioOption {
  id: string;
  label: string;
  value: string;
}

interface ModalRadioInputProps {
  className?: string;
  name: string;
  options: RadioOption[];
  defaultChecked?: string;
}

export function Radio({
  className,
  name,
  options,
  defaultChecked,
}: ModalRadioInputProps) {
  return (
    <div className={cn("flex w-full gap-2.5", className)}>
      {options.map((option, index) => (
        <div className="flex-1" key={index}>
          <input
            type="radio"
            name={name}
            id={option.id}
            className="peer sr-only"
            defaultChecked={defaultChecked === option.value}
          />
          <label
            htmlFor={option.id}
            className="bg-accent peer-checked:bg-primary inline-flex w-full cursor-pointer items-center justify-center rounded-lg py-2 peer-checked:font-medium peer-checked:text-white"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
