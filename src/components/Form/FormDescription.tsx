"use client";

import * as React from "react";

import { FormDescription as BaseFormDescription } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof BaseFormDescription>;

export function Description({ className, ...props }: Props) {
  return (
    <BaseFormDescription
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
