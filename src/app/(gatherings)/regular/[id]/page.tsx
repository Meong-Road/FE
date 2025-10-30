"use client";
import { Suspense } from "react";
import { useParams, useRouter } from "next/navigation";

import { useGetGatheringDetailWithSuspense } from "@/hooks/queries/gatherings";
import { PATH } from "@/lib/constants/path";
import { EGatheringType } from "@/lib/types/gatherings";
import { isRegularGathering } from "@/lib/utils/typeGuard";

import GatheringInfoSection from "../../_components/GatheringDetail/GatheringInfoSection";
import GatheringIntroductionSection from "../../_components/GatheringDetail/GatheringIntroductionSection";
import GatheringLocationSection from "../../_components/GatheringDetail/GatheringLocationSection";
import GatheringReviewSection from "../../_components/GatheringDetail/GatheringReviewSection";
import GatheringInfoSectionSkeleton from "../../_components/GatheringDetail/Skeleton/GatheringInfoSectionSkeleton";
import GatheringIntroductionSectionSkeleton from "../../_components/GatheringDetail/Skeleton/GatheringIntroductionSectionSkeleton";
import GatheringReviewSectionSkeleton from "../../_components/GatheringDetail/Skeleton/GatheringReviewSectionSkeleton";

export default function RegularGatheringDetailPage() {
  return (
    <Suspense
      fallback={
        <>
          <GatheringInfoSectionSkeleton />
          <GatheringIntroductionSectionSkeleton />
          <GatheringReviewSectionSkeleton />
        </>
      }
    >
      <RegularGatheringDetailPageContent />
    </Suspense>
  );
}

function RegularGatheringDetailPageContent() {
  const router = useRouter();
  const { id } = useParams();
  const { data: gathering } = useGetGatheringDetailWithSuspense({
    id: Number(id),
  });

  if (!gathering) return <div>데이터가 없습니다.</div>;

  if (!isRegularGathering(gathering)) {
    router.push(PATH.DETAIL(id as string, EGatheringType.REGULAR));
    return;
  }

  return (
    <>
      <GatheringInfoSection gathering={gathering} />
      <GatheringLocationSection locationPayload={gathering.location} />
      <GatheringIntroductionSection description={gathering.description} />
      <GatheringReviewSection />
    </>
  );
}
