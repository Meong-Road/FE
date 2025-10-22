"use client";
import { useParams, useRouter } from "next/navigation";

import { useGetGatheringDetail } from "@/hooks/queries/gatherings";
import { PATH } from "@/lib/constants/path";
import { EGatheringType } from "@/lib/types/gatherings";
import { isQuickGathering } from "@/lib/utils/typeGuard";

import GatheringInfoSection from "./_components/GatheringInfo/GatheringInfoSection";
import GatheringIntroductionSection from "./_components/GatheringIntroductionSection";
import GatheringReviewSection from "./_components/GatheringReviewSection";

export default function QuickGatheringDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data, isPending, isError } = useGetGatheringDetail({
    id: Number(id),
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>에러</div>;
  if (!data.result) return <div>데이터가 없습니다.</div>;

  if (!isQuickGathering(data.result)) {
    router.push(PATH.DETAIL(id as string, EGatheringType.QUICK));
    return;
  }

  return (
    <>
      <GatheringInfoSection gathering={data.result} />
      <GatheringIntroductionSection description={data.result.description} />
      <GatheringReviewSection />
    </>
  );
}
