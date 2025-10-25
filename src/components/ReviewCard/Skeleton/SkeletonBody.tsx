import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonBody() {
  return (
    <>
      {/* 제목 */}
      <Skeleton className="h-6 w-48 sm:w-64" />

      {/* 댓글 (2줄) */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* 정보 (위치 | 요일) */}
      <div className="flex flex-wrap items-center gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </>
  );
}
