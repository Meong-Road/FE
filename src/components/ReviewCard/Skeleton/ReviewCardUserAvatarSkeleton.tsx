import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ReviewCardUserAvatarSkeletonProps {
  className?: string;
}
export default function ReviewCardUserAvatarSkeleton({
  className,
}: ReviewCardUserAvatarSkeletonProps) {
  return (
    <Skeleton
      className={cn(
        "flex size-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-[1px] border-[#DDDDDD] sm:size-12",
        className,
      )}
    />
  );
}
