import { GatheringInfo } from "./Gathering/GatheringInfo";
import { GatheringTitle } from "./Gathering/GatheringTitle";
import { Comment } from "./Review/Comment";
import { ReviewCardBodyProps } from "./types";

export function Body({
  gatheringName,
  location,
  days,
  comment,
}: ReviewCardBodyProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <GatheringTitle>{gatheringName}</GatheringTitle>
      <GatheringInfo location={location} days={days} />
      <Comment>{comment}</Comment>
    </div>
  );
}
