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
      className={cn(
        "text-foreground mb-10 text-center text-xl font-bold md:mb-14 md:text-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
