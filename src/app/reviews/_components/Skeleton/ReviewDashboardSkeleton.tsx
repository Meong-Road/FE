import { Skeleton } from "@/components/ui/skeleton";

export function ReviewDashboardSkeleton() {
  return (
    <div className="flex w-full flex-col items-center gap-8 rounded-3xl bg-orange-50 px-12 py-10 sm:flex-row sm:gap-16">
      {/* 왼쪽: 평균 점수 영역 */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-end gap-1.5">
          <Skeleton className="h-10 w-16 bg-orange-100" />
          <Skeleton className="h-5 w-24 bg-orange-100" />
        </div>
        <Skeleton className="h-9.5 w-[190px] rounded-full bg-orange-200" />
      </div>

      {/* 오른쪽: 별점 분포 영역 */}
      <div className="flex w-full flex-1 flex-col gap-2.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-5 w-8 bg-orange-100" />
            <Skeleton className="h-1 flex-1 rounded-full bg-orange-100" />
            <Skeleton className="h-5 w-6 bg-orange-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
