import Person from "@/assets/icons/person.svg";
import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import { cn } from "@/lib/utils";

interface GatheringCardPeopleProps {
  className?: string;
}

export function GatheringCardPeople({ className }: GatheringCardPeopleProps) {
  const { gathering } = useGatheringStateContext();

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Person className="fill-muted-foreground size-4" />
      <div className="text-xs font-medium text-slate-500 sm:text-sm">
        {gathering.participantCount}/{gathering.capacity}
      </div>
    </div>
  );
}
