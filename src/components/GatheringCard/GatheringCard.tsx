import Link from "next/link";

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

export function GatheringCard({ children, bgColor, id }: GatheringCardProps) {
  return (
    <li
      className={cn(
        "relative rounded-4xl",
        bgColor === "white" ? "bg-white" : "bg-gradient-opacity",
      )}
    >
      <Link href={`/gatherings/${id}`} className="block h-full w-full p-6">
        {children}
      </Link>
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
