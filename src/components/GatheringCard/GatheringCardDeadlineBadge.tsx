import Alarm from "@/assets/icons/alarm.svg";
import { GatheringType } from "@/lib/types/gatherings";
import { getRegistrationDeadlineInfo } from "@/lib/utils/dateTime";

import Badge from "../common/Badge";

interface GatheringCardDeadlineBadgeProps {
  registrationEnd: GatheringType["registrationEnd"];
  isInvalid?: boolean;
}

export default function GatheringCardDeadlineBadge({
  registrationEnd,
  isInvalid = false,
}: GatheringCardDeadlineBadgeProps) {
  return (
    <Badge variant={isInvalid ? "gray" : "primary"}>
      <Alarm className="size-6" />
      <span className="text-sm font-semibold">
        {getRegistrationDeadlineInfo(registrationEnd).text}
      </span>
    </Badge>
  );
}
