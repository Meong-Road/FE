import React from "react";

import { cn } from "@/lib/utils";

import { FormLabel } from "./FormLabel";

interface ModalTextInputProps {
  label: string;
  required?: boolean;
  type?: string;
  id: string;
  placeholder?: string;
  className?: string;
}

export function ModalTextInput({
  label,
  required = false,
  type,
  id,
  placeholder,
  className,
}: ModalTextInputProps) {
  return (
    <div className="flex w-full flex-col">
      <FormLabel htmlFor={id} label={label} required={required} />
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={cn(
          `bg-accent placeholder:text-muted-foreground rounded-xl px-4 py-2.5 ${className}`,
        )}
      />
    </div>
  );
}
