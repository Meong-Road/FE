import { Dog } from "lucide-react";

import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import { checkIsClosedGatheringState } from "@/lib/utils/gathering";

import Badge from "../common/Badge";

function GatheringCardDogRequiredBadge() {
  const { state } = useGatheringStateContext();
  const isClosedGathering = checkIsClosedGatheringState(state);

  return (
    <Badge variant={isClosedGathering ? "gray" : "primary"}>
      <Dog className="!size-5" />
      <span>반려견 필수</span>
    </Badge>
  );
}

export default GatheringCardDogRequiredBadge;
