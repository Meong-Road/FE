import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonHeader() {
  return (
    <div className="flex items-center gap-2">
      {/* 프로필 이미지 */}
      <Skeleton className="h-10 w-10 flex-shrink-0 rounded-full" />

      {/* 닉네임 */}
      <Skeleton className="h-4 w-20" />

      {/* 별점 */}
      <Skeleton className="h-5 w-24" />

      {/* 날짜 */}
      <Skeleton className="h-4 w-20" />
    </div>
  );
}
