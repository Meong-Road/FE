import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";

import { EmptyState, ErrorState } from "@/components/common";
import InfiniteScroll from "@/components/InfiniteScroll";
import { Skeleton } from "@/components/ui/skeleton";
import { getInfiniteParticipants } from "@/hooks/queries/gatherings/useGetInfiniteParticipants";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";
import { PATH } from "@/lib/constants/path";
import { GatheringType } from "@/lib/types/gatherings";
import { useModalStore } from "@/store/modalStore";

import ParticipantImageSkeleton from "../Skeleton/ParticipantImageSkeleton";

import ParticipantImage from "./ParticipantImage";

interface ParticipantImageListProps {
  gatheringId: GatheringType["id"];
  participantCount: GatheringType["participantCount"];
}

function ParticipantImageList({
  gatheringId,
  participantCount,
}: ParticipantImageListProps) {
  const { closeModal } = useModalStore();

  const infiniteQueryResult = useInfiniteQuery({
    ...getInfiniteParticipants(gatheringId, DEFAULT_LIST_OPTIONS),
    enabled: participantCount > 0,
  });

  return (
    <InfiniteScroll
      {...infiniteQueryResult}
      className="h-full max-h-[400px] gap-0 overflow-y-auto"
      render={(participant) => (
        <Link
          key={`participant-${participant.userId}`}
          href={PATH.PROFILE(participant.userId)}
          className="flex items-center gap-4 bg-white py-2 hover:brightness-95"
          onClick={() => closeModal()}
        >
          <ParticipantImage participant={participant.user} size="md" />
          <div className="text-lg">{participant.user.nickName}</div>
        </Link>
      )}
      renderSkeleton={() => (
        <div className="flex items-center gap-4 py-2">
          <ParticipantImageSkeleton size="md" />
          <Skeleton className="w-20" fontSize="lg" />
        </div>
      )}
      renderOnEmpty={() => (
        <EmptyState message="해당 모임의 참여자가 없어요" minHeight="200px" />
      )}
      renderOnError={() => (
        <ErrorState
          message="모임의 참가자를 불러오는 중 오류가 발생했어요"
          minHeight="200px"
        />
      )}
    />
  );
}

export default ParticipantImageList;
