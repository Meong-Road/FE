"use client";

import GatheringCardItem from "@/components/widget/gatherings/GatheringCardItem/GatheringCardItem";
import { useGetRegularGatheringsByParticipation } from "@/hooks/queries/gatherings/useGetRegularGatheringsByPartcipantion";
import { PATH } from "@/lib/constants/path";

export default function RegularGatheringsByParticipation() {
  const {
    data: gatherings,
    isLoading,
    isError,
  } = useGetRegularGatheringsByParticipation();

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;
  return (
    <>
      <h3 className="text-lg">정기 모임</h3>
      <ul className="grid grid-cols-1 gap-y-6">
        {gatherings?.map((gathering) => (
          <GatheringCardItem
            key={gathering.id}
            gathering={gathering}
            href={PATH.DETAIL(gathering.id, gathering.type)}
            as="li"
          />
        ))}
      </ul>
    </>
  );
}
