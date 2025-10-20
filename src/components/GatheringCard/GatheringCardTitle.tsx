import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface GatheringCardTitleProps extends PropsWithChildren {
  className?: string;
}

export function GatheringCardTitle({
  className,
  children,
}: GatheringCardTitleProps) {
  return <h4 className={cn("text-xl font-semibold", className)}>{children}</h4>;
}
