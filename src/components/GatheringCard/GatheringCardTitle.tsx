import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import { cn } from "@/lib/utils";

interface GatheringCardTitleProps {
  className?: string;
}

export function GatheringCardTitle({ className }: GatheringCardTitleProps) {
  const { gathering } = useGatheringStateContext();
  return (
    <h4
      className={cn(
        "line-clamp-1 text-lg font-semibold text-zinc-900 sm:text-xl",
        className,
      )}
    >
      {gathering.name}
    </h4>
  );
}
