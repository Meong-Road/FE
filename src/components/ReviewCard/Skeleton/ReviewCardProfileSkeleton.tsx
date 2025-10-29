import { ReviewCardSkeleton } from "./ReviewCardSkeleton";

function ReviewCardProfileSkeleton() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <ReviewCardSkeleton.UserAvatar />

      <div className="flex flex-col">
        <ReviewCardSkeleton.UserName />
        <div className="flex items-center gap-2">
          <ReviewCardSkeleton.Rating />
          <ReviewCardSkeleton.CreatedAt />
        </div>
      </div>
    </div>
  );
}

export default ReviewCardProfileSkeleton;
