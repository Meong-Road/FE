import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary/20",
        "bg-background w-full min-w-0 rounded-md",
        "h-10",
        "px-3 py-1",
        "text-sm md:text-base",
        "transition-[border-color, ring-color] duration-300",
        "outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-primary focus-visible:ring-[1px]",
        "aria-invalid:ring-destructive dark:aria-invalid:ring-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
