"use client";

import * as React from "react";

import { FormControl as BaseFormControl } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof BaseFormControl>;

export function Control({ className, ...props }: Props) {
  return <BaseFormControl className={cn("", className)} {...props} />;
}
