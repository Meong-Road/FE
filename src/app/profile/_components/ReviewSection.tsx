import { ReviewCard } from "@/components/ReviewCard";

import EditBtn from "./EditBtn";

// 실제 API 연동해야함
const mockReviews = [
  {
    id: 1,
    gatheringImage: null,
    gatheringName: "강아지와 함께하는 한강 산책",
    location: "마포구" as const,
    days: "토, 일",
    score: 5 as const,
    comment: "정말 좋은 모임이었어요! 다음에 또 참여하고 싶습니다.",
  },
  {
    id: 2,
    gatheringImage: null,
    gatheringName: "반려견 소셜 타임",
    location: "강남구" as const,
    days: "월, 수, 금",
    score: 4 as const,
    comment: "맘에 듭니다",
  },
];

export default function ReviewSection() {
  // 빈 상태 처리
  if (mockReviews.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-400">작성한 리뷰가 없습니다.</p>
      </div>
    );
  }

  return (
    <section>
      <ul className="space-y-4">
        {mockReviews.map((review) => (
          <ReviewCard key={review.id}>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
              {/* 모임 이미지 */}
              <ReviewCard.GatheringImage image={review.gatheringImage} />

              {/* 리뷰 내용 */}
              <div className="flex flex-1 flex-col gap-4">
                {/* 헤더: 평점 */}
                <div className="flex items-center justify-between">
                  <ReviewCard.Rating score={review.score} />
                  <EditBtn />
                </div>

                {/* 본문: 모임 정보 + 코멘트 */}
                <div className="flex flex-col gap-2">
                  <ReviewCard.GatheringTitle>
                    {review.gatheringName}
                  </ReviewCard.GatheringTitle>
                  <ReviewCard.GatheringInfo
                    location={review.location}
                    days={review.days}
                  />
                  <ReviewCard.Comment>{review.comment}</ReviewCard.Comment>
                </div>
              </div>
            </div>
          </ReviewCard>
        ))}
      </ul>
    </section>
  );
}
