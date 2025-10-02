import { GatheringCardTitleProps } from "./types";

export function GatheringCardTitle({ children }: GatheringCardTitleProps) {
  return <h4 className="mb-11 text-xl font-semibold">{children}</h4>;
}
