import { ElementType, PropsWithChildren } from "react";

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
  as?: ElementType;
}

export function GatheringCard({
  className,
  children,
  as: Component = "div",
}: GatheringCardProps) {
  return (
    <Component
      className={cn(
        "relative list-none rounded-4xl border border-[#ddd] bg-white p-6",
        className,
      )}
    >
      {children}
    </Component>
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
