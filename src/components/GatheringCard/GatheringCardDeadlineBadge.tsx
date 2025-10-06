import Alarm from "@/assets/icons/alarm.svg";
import { getRegistrationDeadlineInfo } from "@/lib/utils/dateTime";

import { GatheringCardDeadlineBadgeProps } from "./types";

export default function GatheringCardDeadlineBadge({
  registrationEnd,
}: GatheringCardDeadlineBadgeProps) {
  return (
    <div className="bg-secondary flex h-8 items-center gap-0.5 rounded-3xl px-3">
      <Alarm width={24} height={24} />
      <span className="text-primary text-sm font-semibold">
        {getRegistrationDeadlineInfo(registrationEnd).text}
      </span>
    </div>
  );
}
