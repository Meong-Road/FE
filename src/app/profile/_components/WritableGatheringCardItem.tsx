import { ElementType } from "react";

import { GatheringCard } from "@/components/GatheringCard";
import { GatheringCardReviewBtn } from "@/components/GatheringCard/GatheringCardReviewBtn";
import { useAuth } from "@/hooks";
import { useGetMyPets } from "@/hooks/queries/pets";
import { useGetReviewCheck } from "@/hooks/queries/reviews";
import {
  EGatheringState,
  EGatheringType,
  GatheringType,
} from "@/lib/types/gatherings";
import { getGatheringState } from "@/lib/utils/gathering";

interface WritableGatheringCardItemProps {
  gathering: GatheringType & { joinedAt: string };
  as?: ElementType;
}

export default function WritableGatheringCardItem({
  gathering,
  as = "div",
}: WritableGatheringCardItemProps) {
  const { user } = useAuth();

  // getGatheringState의 필수 인자이므로.. 필요없지만 가져옴
  const { data: pets } = useGetMyPets({ enabled: !!user });
  const hasPet = pets && pets.length > 0;
  const state = getGatheringState(gathering, !!user, !!hasPet);

  const { data: hasReview } = useGetReviewCheck(gathering.id);

  // REGULAR 모임이 아니면 표시 안 함
  if (gathering.type !== EGatheringType.REGULAR) return null;
  // FIXED_GATHERING 상태이고 리뷰를 작성하지 않은 경우에만 표시
  if (state !== EGatheringState.FIXED_GATHERING) return null;
  if (hasReview === true) return null;

  return (
    <GatheringCard gathering={gathering} as={as}>
      <div className="flex h-full flex-row items-center gap-6">
        <GatheringCard.Image />
        <div className="flex h-full flex-grow flex-col justify-between gap-y-11 py-2">
          <div className="flex items-start justify-between gap-x-2">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-row justify-start gap-x-2">
                <GatheringCard.DeadlineBadge />
                {gathering.participantCount >= 5 && (
                  <GatheringCard.ConfirmedBadge />
                )}
              </div>
              <GatheringCard.Title />
            </div>
            <GatheringCard.LikeBtn />
          </div>
          <div className="flex w-full items-end justify-between">
            <div>
              <GatheringCard.People />
              <GatheringCard.Info />
            </div>
            <GatheringCardReviewBtn gathering={gathering} />
          </div>
        </div>
      </div>
    </GatheringCard>
  );
}
