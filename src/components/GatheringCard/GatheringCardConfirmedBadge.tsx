import Check from "@/assets/icons/check.svg";

import Badge from "../common/Badge";

interface GatheringCardConfirmedBadgeProps {
  isInvalid?: boolean;
}

export function GatheringCardConfirmedBadge({
  isInvalid = false,
}: GatheringCardConfirmedBadgeProps) {
  return (
    <Badge variant={isInvalid ? "gray" : "primary"} outline={true}>
      <Check className="size-6" />
      <span>개설확정</span>
    </Badge>
  );
}
