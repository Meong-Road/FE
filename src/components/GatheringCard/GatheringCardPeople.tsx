import Person from "@/assets/images/person.svg";
import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";

export function GatheringCardPeople() {
  const { gathering } = useGatheringStateContext();

  return (
    <div className="mb-2.5 flex items-center gap-1 pl-0.5">
      <Person />
      <div className="text-sm font-medium">
        {gathering.participantCount}/{gathering.capacity}
      </div>
    </div>
  );
}
