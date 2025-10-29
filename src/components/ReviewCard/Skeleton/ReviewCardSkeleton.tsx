import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ReviewCardSkeletonProps {
  className?: string;
}

export function ReviewCardSkeleton({ className }: ReviewCardSkeletonProps) {
  return (
    <li
      className={cn(
        "relative rounded-3xl bg-white shadow-sm",
        "overflow-hidden p-0 sm:p-6",
        className,
      )}
    >
      <div className="flex w-full flex-col gap-0 sm:flex-row sm:gap-6">
        {/* 모임 이미지 */}
        <Skeleton className="aspect-video w-full flex-shrink-0 rounded-t-3xl bg-gray-200 sm:aspect-square sm:size-[188px] sm:rounded-3xl" />

        {/* 리뷰 콘텐츠 */}
        <div className="relative flex w-full flex-1 flex-col gap-3 p-5 sm:gap-5 sm:p-0 sm:py-2">
          {/* 프로필 (사용자 정보, 별점, 날짜) */}
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 flex-shrink-0 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-20" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>

          {/* 모임 정보 (제목, 위치, 요일) */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <Skeleton className="h-6 w-48 sm:h-7 sm:w-64" />
            <Skeleton className="h-4 w-36 sm:w-48" />
          </div>

          {/* 리뷰 내용 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </li>
  );
}
