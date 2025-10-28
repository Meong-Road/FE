import { ElementType, PropsWithChildren } from "react";

import { useAuth } from "@/hooks";
import { useGetMyPets } from "@/hooks/queries/pets";
import { GatheringType } from "@/lib/types/gatherings";
import { cn } from "@/lib/utils";
import { getGatheringState } from "@/lib/utils/gathering";

import { GatheringCardAttendanceBadge } from "./GatheringCardAttendanceBadge";
import { GatheringCardConfirmedBadge } from "./GatheringCardConfirmedBadge";
import GatheringCardDeadlineBadge from "./GatheringCardDeadlineBadge";
import { GatheringCardImage } from "./GatheringCardImage";
import { GatheringCardInfo } from "./GatheringCardInfo";
import { GatheringCardJoinBtn } from "./GatheringCardJoinBtn";
import { GatheringCardLikeBtn } from "./GatheringCardLikeBtn";
import { GatheringCardPeople } from "./GatheringCardPeople";
import { GatheringCardProvider } from "./GatheringCardProvider";
import { GatheringCardReviewBtn } from "./GatheringCardReviewBtn";
import { GatheringCardTitle } from "./GatheringCardTitle";

export interface GatheringCardProps extends PropsWithChildren {
  gathering: GatheringType;
  className?: string;
  as?: ElementType;
}

export function GatheringCard({
  gathering,
  className,
  children,
  as: Component = "div",
}: GatheringCardProps) {
  const { user } = useAuth();
  const { data: pets } = useGetMyPets({ enabled: !!user });
  const hasPet = pets && pets.length > 0;

  const state = getGatheringState(gathering, !!user, !!hasPet);
  const value = {
    gathering,
    state,
    user,
  };

  return (
    <GatheringCardProvider value={value}>
      <Component
        className={cn(
          "relative list-none rounded-4xl border border-[#ddd] bg-white sm:p-6",
          className,
        )}
      >
        {children}
      </Component>
    </GatheringCardProvider>
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
GatheringCard.ReviewBtn = GatheringCardReviewBtn;
