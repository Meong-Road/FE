import Heart from "@/assets/icons/heart.svg";
import { cn } from "@/lib/utils";

interface ReviewCardRatingSkeletonProps {
  size?: "sm" | "lg";
}

export default function ReviewCardRatingSkeleton({
  size = "sm",
}: ReviewCardRatingSkeletonProps) {
  return (
    <div className="flex items-center">
      {[...new Array(5)].map((_, index) => (
        <Heart
          key={`heart-${index}`}
          className={cn(
            "animate-pulse fill-gray-900/10",
            size === "lg" ? "size-9.5" : "h-5 w-5 sm:h-6 sm:w-6",
          )}
        />
      ))}
    </div>
  );
}
