"use client";

import * as React from "react";

import { Input as BaseInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof BaseInput>;

export function Input({ className, ...props }: Props) {
  return <BaseInput className={cn("w-full", "h-12", className)} {...props} />;
}
