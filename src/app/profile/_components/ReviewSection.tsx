"use client";

import { ReviewCard } from "@/components/ReviewCard";
import { useGetMyReviews } from "@/hooks/queries/reviews";
import { ReviewType } from "@/lib/types/reviews";
import { formatDays } from "@/lib/utils/dateTime";

import EditBtn from "./EditBtn";

export default function ReviewSection() {
  const { data: reviews, isLoading } = useGetMyReviews({ page: 0, size: 10 });

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-400">로딩 중...</p>
      </div>
    );
  }

  // 빈 상태 처리
  if (!reviews || reviews.content.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-400">작성한 리뷰가 없습니다.</p>
      </div>
    );
  }

  return (
    <section>
      <ul className="space-y-3 sm:space-y-4">
        {reviews.content.map((review: ReviewType) => (
          <ReviewCard key={review.id}>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:gap-8">
              {/* 모임 이미지 */}
              <ReviewCard.GatheringImage image={review.gathering.image} />

              {/* 리뷰 내용 */}
              <div className="flex flex-1 flex-col justify-between">
                {/* 헤더: 유저 정보 + 평점 + 작성날짜 */}
                <ReviewCard.Header
                  profileImage={review.user.image}
                  score={review.score}
                  nickName={review.user.nickName}
                  createdAt={review.createdAt}
                />

                {/* 본문: 모임 정보 + 코멘트 */}
                <ReviewCard.Body
                  gatheringName={review.gathering.name}
                  location={review.gathering.location}
                  days={formatDays(review.gathering.days)}
                  comment={review.comment}
                />
              </div>
            </div>

            {/* 수정 버튼 - 우측 상단 */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <EditBtn />
            </div>
          </ReviewCard>
        ))}
      </ul>
    </section>
  );
}
