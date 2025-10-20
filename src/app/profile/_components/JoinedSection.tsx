"use client";

import Link from "next/link";

import {
  EmptyState,
  ListContainer,
  LoadingState,
  SectionWrapper,
} from "@/components/common";
import { useGetInfiniteJoinedGatherings } from "@/hooks/queries/gatherings";
import { GatheringType } from "@/lib/types/gatherings";
import { processGatheringInfo } from "@/lib/utils/gathering";

import { GatheringCard } from "../../../components/GatheringCard/GatheringCard";

const JoinedGatheringItem = ({
  gathering,
}: {
  gathering: ReturnType<typeof processGatheringInfo>;
}) => (
  <Link href={gathering.detailPath}>
    <GatheringCard bgColor="white">
      <div className="flex items-center gap-6">
        <GatheringCard.Image />
        <div>
          <div className="mb-4 flex gap-2">
            <GatheringCard.AttendanceBadge />
            <GatheringCard.ConfirmedBadge />
          </div>
          <GatheringCard.Title>{gathering.name}</GatheringCard.Title>
          <GatheringCard.People
            people={gathering.participantCount}
            limit={gathering.capacity}
          />
          <GatheringCard.Info
            location={gathering.location}
            date={gathering.dateInfo}
          />
        </div>
      </div>
      <GatheringCard.LikeBtn
        id={gathering.id}
        className="absolute top-8 right-6"
      />
      <GatheringCard.JoinBtn
        className="absolute right-6 bottom-6"
        gathering={gathering}
      />
    </GatheringCard>
  </Link>
);

const JoinedGatheringList = ({
  gatherings,
}: {
  gatherings: GatheringType[];
}) => (
  <ListContainer>
    {gatherings.map((gathering) => (
      <JoinedGatheringItem
        key={gathering.id}
        gathering={processGatheringInfo(gathering)}
      />
    ))}
  </ListContainer>
);

export default function JoinedSection() {
  const { data: gatherings, isLoading } = useGetInfiniteJoinedGatherings({
    size: 10,
  });

  if (isLoading) return <LoadingState message="로딩 중..." />;
  if (!gatherings?.length)
    return <EmptyState message="참석한 모임이 없습니다." />;

  return (
    <SectionWrapper>
      <JoinedGatheringList gatherings={gatherings} />
    </SectionWrapper>
  );
}
