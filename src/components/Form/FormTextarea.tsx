import { cn } from "@/lib/utils";

interface TextareaProps {
  className?: string;
  placeholder: string;
  maxLength?: number;
}

export function Textarea({
  className,
  placeholder,
  maxLength,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={cn(
        "text-sm sm:text-base",
        "resize-none",
        "outline-none",
        "transition-[border-color, ring-color] duration-300",
        "focus-visible:border-ring focus-visible:ring-primary focus-visible:ring-[1px]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      maxLength={maxLength}
      placeholder={placeholder}
      {...props}
    />
  );
}
