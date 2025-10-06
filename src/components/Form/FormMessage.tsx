"use client";

import * as React from "react";

import { FormMessage as BaseFormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof BaseFormMessage>;

export function Message({ className, ...props }: Props) {
  return (
    <BaseFormMessage
      className={cn("text-destructive text-xs", className)}
      {...props}
    />
  );
}
