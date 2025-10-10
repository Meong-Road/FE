import { cn } from "@/lib/utils";

import { GatheringCardAttendanceBadge } from "./GatheringCardAttendanceBadge";
import { GatheringCardConfirmedBadge } from "./GatheringCardConfirmedBadge";
import GatheringCardDeadlineBadge from "./GatheringCardDeadlineBadge";
import { GatheringCardImage } from "./GatheringCardImage";
import { GatheringCardInfo } from "./GatheringCardInfo";
import { GatheringCardJoinBtn } from "./GatheringCardJoinBtn";
import { GatheringCardLikeBtn } from "./GatheringCardLikeBtn";
import { GatheringCardPeople } from "./GatheringCardPeople";
import { GatheringCardTitle } from "./GatheringCardTitle";
import { type GatheringCardProps } from "./types";

export function GatheringCard({
  className,
  children,
  bgColor,
}: GatheringCardProps) {
  return (
    <li
      className={cn(
        "relative list-none rounded-4xl p-6",
        bgColor === "white" ? "bg-white" : "bg-gradient-opacity",
        className,
      )}
    >
      {children}
    </li>
  );
}

GatheringCard.Image = GatheringCardImage;
GatheringCard.AttendanceBadge = GatheringCardAttendanceBadge;
GatheringCard.ConfirmedBadge = GatheringCardConfirmedBadge;
GatheringCard.DeadlineBadge = GatheringCardDeadlineBadge;
GatheringCard.Title = GatheringCardTitle;
GatheringCard.People = GatheringCardPeople;
GatheringCard.Info = GatheringCardInfo;
GatheringCard.LikeBtn = GatheringCardLikeBtn;
GatheringCard.JoinBtn = GatheringCardJoinBtn;
