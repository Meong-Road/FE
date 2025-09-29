"use client";

import * as React from "react";

import { Input as BaseInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof BaseInput>;

export function Input({ className, ...props }: Props) {
  return (
    <BaseInput
      className={cn(
        "rounded-md",
        "border-none",
        "bg-gray-50",
        "focus-visible:ring-1 focus-visible:ring-orange-400",
        "text-sm font-medium",
        "placeholder:text-gray-400",
        className,
      )}
      {...props}
    />
  );
}
