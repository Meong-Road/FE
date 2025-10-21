"use client";

import * as React from "react";

import { FormItem as BaseFormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof BaseFormItem>;

export function Item({ className, ...props }: Props) {
  return <BaseFormItem className={cn("grid gap-2", className)} {...props} />;
}
