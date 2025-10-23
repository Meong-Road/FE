import Badge from "../common/Badge";

interface GatheringCardAttendanceBadgeProps {
  isInvalid?: boolean;
}

export function GatheringCardAttendanceBadge({
  isInvalid = false,
}: GatheringCardAttendanceBadgeProps) {
  return <Badge variant={isInvalid ? "gray" : "primary"}>이용 예정</Badge>;
}
