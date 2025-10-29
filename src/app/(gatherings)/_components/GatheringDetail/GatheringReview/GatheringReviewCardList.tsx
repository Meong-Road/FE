import { useParams } from "next/navigation";

import { EmptyState, ErrorState, LoadingState } from "@/components/common";
import { ReviewCard } from "@/components/ReviewCard";
import { useGetReviewsByGathering } from "@/hooks/queries/reviews";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { cn } from "@/lib/utils";

interface GatheringReviewCardListProps {
  className?: string;
}
export default function GatheringReviewCardList({
  className,
}: GatheringReviewCardListProps) {
  const { id } = useParams();
  const { page } = useSearchParamsState({
    page: "1",
  });

  const {
    data: reviews,
    isPending,
    isError,
  } = useGetReviewsByGathering({
    gatheringId: Number(id),
    page: Number(page),
  });

  if (isPending)
    return (
      <LoadingState message="리뷰를 불러오고 있어요..." minHeight="200px" />
    );

  if (isError || !reviews)
    return (
      <ErrorState
        message="리뷰를 불러오는 중 오류가 발생했어요"
        minHeight="200px"
      />
    );

  if (reviews.length === 0)
    return <EmptyState message="아직 등록된 리뷰가 없어요" minHeight="200px" />;

  return (
    <ReviewCard
      className={cn("mb-8 border border-[#ddd] px-12 py-10", className)}
    >
      {reviews.map((review, idx) => (
        <>
          <div key={`review-${review.id}`} className="flex flex-col gap-y-6">
            <ReviewCard.Profile
              user={review.user}
              score={3}
              date={review.createdAt}
            />
            <ReviewCard.Comment>{review.comment}</ReviewCard.Comment>
          </div>
          {idx !== reviews.length - 1 && (
            <ReviewCard.Divider className="my-6" />
          )}
        </>
      ))}
    </ReviewCard>
  );
}
