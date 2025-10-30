"use client";
import { Suspense } from "react";
import { useParams, useRouter } from "next/navigation";

import { useGetGatheringDetailWithSuspense } from "@/hooks/queries/gatherings";
import { PATH } from "@/lib/constants/path";
import { EGatheringType } from "@/lib/types/gatherings";
import { isQuickGathering } from "@/lib/utils/typeGuard";

import GatheringInfoSection from "../../_components/GatheringDetail/GatheringInfoSection";
import GatheringIntroductionSection from "../../_components/GatheringDetail/GatheringIntroductionSection";
import GatheringLocationSection from "../../_components/GatheringDetail/GatheringLocationSection";
import GatheringInfoSectionSkeleton from "../../_components/GatheringDetail/Skeleton/GatheringInfoSectionSkeleton";
import GatheringIntroductionSectionSkeleton from "../../_components/GatheringDetail/Skeleton/GatheringIntroductionSectionSkeleton";

export default function QuickGatheringDetailPage() {
  return (
    <Suspense
      fallback={
        <>
          <GatheringInfoSectionSkeleton />
          <GatheringIntroductionSectionSkeleton />
        </>
      }
    >
      <QuickGatheringDetailPageContent />
    </Suspense>
  );
}

function QuickGatheringDetailPageContent() {
  const router = useRouter();
  const { id } = useParams();
  const { data: gathering } = useGetGatheringDetailWithSuspense({
    id: Number(id),
  });

  if (!gathering) return <div>데이터가 없습니다.</div>;

  if (!isQuickGathering(gathering)) {
    router.push(PATH.DETAIL(id as string, EGatheringType.QUICK));
    return;
  }

  const TEST_PAYLOAD =
    '{"district":"중구","latlng":{"lat":37.56537362367231,"lng":126.97878849882052}}';

  return (
    <>
      <GatheringInfoSection gathering={gathering} />
      <GatheringLocationSection locationPayload={TEST_PAYLOAD} />
      <GatheringIntroductionSection description={gathering.description} />
    </>
  );
}
