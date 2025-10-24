import Alarm from "@/assets/icons/alarm.svg";
import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import {
  getHoursBefore,
  getRegistrationDeadlineInfo,
} from "@/lib/utils/dateTime";
import { checkIsClosedGatheringState } from "@/lib/utils/gathering";
import { isRegularGathering } from "@/lib/utils/typeGuard";

import Badge from "../common/Badge";

export default function GatheringCardDeadlineBadge() {
  const { gathering, state } = useGatheringStateContext();
  const isClosedGathering = checkIsClosedGatheringState(state);

  return (
    <Badge variant={isClosedGathering ? "gray" : "primary"}>
      <Alarm />
      {/* // TODO: registrationEnd로 통일 */}
      <span>
        {getRegistrationDeadlineInfo(
          isRegularGathering(gathering)
            ? gathering.registrationEnd
            : getHoursBefore(gathering.dateTime, 3),
        )}
      </span>
    </Badge>
  );
}
