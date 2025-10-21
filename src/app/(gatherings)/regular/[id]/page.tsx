"use client";
import { useParams, useRouter } from "next/navigation";

import { useGetGatheringDetail } from "@/hooks/queries/gatherings";
import { PATH } from "@/lib/constants/path";
import { isRegularGathering } from "@/lib/utils/typeGuard";

import GatheringInfoSection from "../../quick/[id]/_components/GatheringInfo/GatheringInfoSection";
import GatheringIntroductionSection from "../../quick/[id]/_components/GatheringIntroductionSection";
import GatheringReviewSection from "../../quick/[id]/_components/GatheringReviewSection";

export default function RegularGatheringDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data, isPending, isError } = useGetGatheringDetail({
    id: Number(id),
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>에러</div>;
  if (!data.result) return <div>데이터가 없습니다.</div>;

  if (!isRegularGathering(data.result)) {
    router.push(PATH.QUICK_DETAIL(id as string));
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
