import { ReviewCardSkeleton } from "./ReviewCardSkeleton";

export default function ReviewCardSkeletonItem() {
  return (
    <ReviewCardSkeleton className="overflow-hidden border border-[#ddd] bg-white p-0 sm:p-6">
      <div className="flex w-full flex-col gap-0 sm:flex-row sm:gap-6">
        <ReviewCardSkeleton.GatheringImage />
        <div className="relative flex w-full flex-1 flex-col gap-3 p-5 sm:gap-5 sm:p-0 sm:py-2">
          <ReviewCardSkeleton.Profile />

          {/* 모임 정보 (제목, 위치, 요일) */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <ReviewCardSkeleton.GatheringTitle />
            <ReviewCardSkeleton.GatheringInfo />
          </div>

          <ReviewCardSkeleton.Comment />
        </div>
      </div>
    </ReviewCardSkeleton>
  );
}
