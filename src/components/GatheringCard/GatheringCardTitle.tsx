import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import { cn } from "@/lib/utils";

interface GatheringCardTitleProps {
  className?: string;
}

export function GatheringCardTitle({ className }: GatheringCardTitleProps) {
  const { gathering } = useGatheringStateContext();
  return (
    <h4 className={cn("text-xl font-semibold", className)}>{gathering.name}</h4>
  );
}
