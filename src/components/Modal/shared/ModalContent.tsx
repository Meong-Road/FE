import React from "react";

import { cn } from "@/lib/utils";

export function ModalContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "scrollbar-hidden flex w-full flex-col items-center overflow-y-auto",
        className,
      )}
    >
      {children}
    </div>
  );
}
