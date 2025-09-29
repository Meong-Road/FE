"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export function Title({
  className,
  children,
  ...props
}: React.ComponentProps<"h3"> & { children: React.ReactNode }) {
  return (
    <h3
      className={cn("text-foreground mb-4 text-2xl font-bold", className)}
      {...props}
    >
      {children}
    </h3>
  );
}
