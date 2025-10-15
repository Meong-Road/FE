import { ReviewCardSkeletonList } from "@/components/ReviewCard";

import { FiltersSkeleton } from "./FiltersSkeleton";
import { ReviewDashboardSkeleton } from "./ReviewDashboardSkeleton";

export function ReviewsPageSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <FiltersSkeleton />
      <ReviewDashboardSkeleton />
      <ReviewCardSkeletonList count={10} />
    </div>
  );
}
