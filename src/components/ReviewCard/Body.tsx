import { GatheringInfo } from "./Gathering/GatheringInfo";
import { GatheringTitle } from "./Gathering/GatheringTitle";
import { ReviewCardBodyProps } from "./types";

export function Body({ gatheringName, location, days }: ReviewCardBodyProps) {
  return (
    <div className="flex flex-col gap-1 sm:gap-2">
      <GatheringTitle>{gatheringName}</GatheringTitle>
      <GatheringInfo location={location} days={days} />
    </div>
  );
}
