import Person from "@/assets/images/person.svg";

import { type GatheringCardPeopleProps } from "./types";

export function GatheringCardPeople({
  people,
  limit,
}: GatheringCardPeopleProps) {
  return (
    <div className="mb-2.5 flex items-center gap-1 pl-0.5">
      <Person />
      <div className="text-sm font-medium">
        {people}/{limit}
      </div>
    </div>
  );
}
