import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import { checkIsClosedGatheringState } from "@/lib/utils/gathering";

import Badge from "../common/Badge";

export function GatheringCardAttendanceBadge() {
  const { state } = useGatheringStateContext();
  const isClosedGathering = checkIsClosedGatheringState(state);

  return (
    <Badge variant={isClosedGathering ? "gray" : "primary"}>이용 예정</Badge>
  );
}
