import { cn } from "@/lib/utils";

import { GatheringCardTitleProps } from "./types";

export function GatheringCardTitle({
  className,
  children,
}: GatheringCardTitleProps) {
  return <h4 className={cn("text-xl font-semibold", className)}>{children}</h4>;
}
