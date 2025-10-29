import { Skeleton } from "@/components/ui/skeleton";

export function ReviewDashboardSkeleton() {
  return (
    <div className="bg-primary-50 border-primary-300 flex w-full flex-col items-center gap-8 rounded-2xl border px-6 py-8 sm:flex-row sm:gap-16 sm:rounded-3xl sm:px-12 sm:py-10">
      {/* 왼쪽: 평균 점수 영역 */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-end gap-1.5">
          <Skeleton className="bg-primary-200 h-[40px] w-14" />
          <Skeleton className="bg-primary-200 h-[20px] w-28" />
        </div>
        <Skeleton className="bg-primary-200 h-9.5 w-[190px] rounded-full" />
      </div>

      {/* 오른쪽: 별점 분포 영역 */}
      <div className="flex w-full flex-1 flex-col gap-2.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex h-5 items-center gap-3">
            <Skeleton className="bg-primary-200 h-[20px] w-8" />
            <Skeleton className="bg-primary-200 h-2 flex-1 rounded-full" />
            <Skeleton className="bg-primary-200 h-[20px] w-6" />
          </div>
        ))}
      </div>
    </div>
  );
}
