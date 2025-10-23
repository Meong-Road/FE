import Alarm from "@/assets/icons/alarm.svg";
import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import { getRegistrationDeadlineInfo } from "@/lib/utils/dateTime";
import { checkIsClosedGatheringState } from "@/lib/utils/gathering";

import Badge from "../common/Badge";

export default function GatheringCardDeadlineBadge() {
  const { gathering, state } = useGatheringStateContext();
  const isClosedGathering = checkIsClosedGatheringState(state);

  return (
    <Badge variant={isClosedGathering ? "gray" : "primary"}>
      <Alarm className="size-6" />
      <span className="text-sm font-semibold">
        {getRegistrationDeadlineInfo(gathering.registrationEnd).text}
      </span>
    </Badge>
  );
}
