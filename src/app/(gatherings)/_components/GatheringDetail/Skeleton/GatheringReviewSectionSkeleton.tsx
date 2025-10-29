import Iterator from "@/components/Iterator";
import { ReviewCardSkeleton } from "@/components/ReviewCard";
import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";

export default function GatheringReviewSectionSkeleton() {
  return (
    <div className="mb-12">
      <Skeleton fontSize="lg" className="mb-2 ml-2 w-10 text-lg" />
      <ReviewCardSkeleton className="mb-8 border border-[#ddd] p-7">
        <Iterator count={DEFAULT_LIST_OPTIONS.size}>
          <div className="flex flex-col gap-y-6">
            <ReviewCardSkeleton.Profile />
            <ReviewCardSkeleton.Comment />
          </div>
          <ReviewCardSkeleton.Divider className="my-6" />
        </Iterator>
      </ReviewCardSkeleton>
    </div>
  );
}
