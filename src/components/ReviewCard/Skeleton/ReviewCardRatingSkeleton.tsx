import Heart from "@/assets/icons/heart.svg";
import { cn } from "@/lib/utils";

interface ReviewCardRatingSkeletonProps {
  size?: "sm" | "lg";
}

export default function ReviewCardRatingSkeleton({
  size = "sm",
}: ReviewCardRatingSkeletonProps) {
  return (
    <>
      {[...new Array(5)].map((_, index) => (
        <Heart
          key={`heart-${index}`}
          className={cn(
            "animate-pulse fill-gray-900/10",
            size === "lg" ? "size-9.5" : "size-5 sm:size-6",
          )}
        />
      ))}
    </>
  );
}
