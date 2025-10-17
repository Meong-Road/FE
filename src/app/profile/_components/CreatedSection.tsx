"use client";

import Link from "next/link";

import {
  EmptyState,
  ListContainer,
  LoadingState,
  SectionWrapper,
} from "@/components/common";
import { useGetMyGatherings } from "@/hooks/queries/gatherings";
import { GatheringType } from "@/lib/types/gatherings";
import { processGatheringInfo } from "@/lib/utils/gathering";

import { GatheringCard } from "../../../components/GatheringCard/GatheringCard";

const CreatedGatheringItem = ({
  gathering,
}: {
  gathering: ReturnType<typeof processGatheringInfo>;
}) => (
  <Link href={gathering.detailPath}>
    <GatheringCard bgColor="gradient">
      <div className="flex items-center gap-6">
        <GatheringCard.Image />
        <div>
          <div className="mb-4 flex gap-2">
            <GatheringCard.AttendanceBadge />
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
    </GatheringCard>
  </Link>
);

const CreatedGatheringList = ({
  gatherings,
}: {
  gatherings: GatheringType[];
}) => (
  <ListContainer>
    {gatherings.map((gathering) => (
      <CreatedGatheringItem
        key={gathering.id}
        gathering={processGatheringInfo(gathering)}
      />
    ))}
  </ListContainer>
);

export default function CreatedSection() {
  const { data: gatherings, isPending } = useGetMyGatherings({
    page: 0,
    size: 10,
  });

  if (isPending) return <LoadingState message="로딩 중..." />;
  if (!gatherings?.content?.length)
    return <EmptyState message="만든 모임이 없습니다." />;

  return (
    <SectionWrapper>
      <CreatedGatheringList gatherings={gatherings.content} />
    </SectionWrapper>
  );
}
