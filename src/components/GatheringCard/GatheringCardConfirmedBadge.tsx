import Check from "@/assets/icons/check.svg";
import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import { checkIsClosedGatheringState } from "@/lib/utils/gathering";

import Badge from "../common/Badge";

export function GatheringCardConfirmedBadge() {
  const { state } = useGatheringStateContext();
  const isClosedGathering = checkIsClosedGatheringState(state);

  return (
    <Badge variant={isClosedGathering ? "gray" : "primary"} outline={true}>
      <Check />
      <span>개설확정</span>
    </Badge>
  );
}
