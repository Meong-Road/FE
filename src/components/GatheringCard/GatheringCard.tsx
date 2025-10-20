import { PropsWithChildren } from "react";

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

export interface GatheringCardProps extends PropsWithChildren {
  className?: string;
}

export function GatheringCard({ className, children }: GatheringCardProps) {
  return (
    <li
      className={cn("relative list-none rounded-4xl bg-white p-6", className)}
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
