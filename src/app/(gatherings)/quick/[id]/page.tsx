"use client";
import { useParams, useRouter } from "next/navigation";

import { useGetGatheringDetail } from "@/hooks/queries/gatherings";
import { PATH } from "@/lib/constants/path";
import { EGatheringType } from "@/lib/types/gatherings";
import { isQuickGathering } from "@/lib/utils/typeGuard";

import GatheringInfoSection from "../../_components/GatheringDetail/GatheringInfo/GatheringInfoSection";
import GatheringIntroductionSection from "../../_components/GatheringDetail/GatheringIntroductionSection";
import GatheringReviewSection from "../../_components/GatheringDetail/GatheringReviewSection";

export default function QuickGatheringDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const {
    data: gathering,
    isPending,
    isError,
  } = useGetGatheringDetail({
    id: Number(id),
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>에러</div>;
  if (!gathering) return <div>데이터가 없습니다.</div>;

  if (!isQuickGathering(gathering)) {
    router.push(PATH.DETAIL(id as string, EGatheringType.QUICK));
    return;
  }

  return (
    <>
      <GatheringInfoSection gathering={gathering} />
      <GatheringIntroductionSection description={gathering.description} />
      <GatheringReviewSection />
    </>
  );
}
