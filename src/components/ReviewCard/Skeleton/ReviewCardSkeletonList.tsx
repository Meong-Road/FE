import ReviewCardSkeletonItem from "./ReviewCardSkeletonItem";

interface ReviewCardSkeletonListProps {
  count?: number;
}

export function ReviewCardSkeletonList({
  count = 3,
}: ReviewCardSkeletonListProps) {
  return (
    <ol className="space-y-3 sm:space-y-4">
      {Array.from({ length: count }, (_, i) => (
        <ReviewCardSkeletonItem key={i} />
      ))}
    </ol>
  );
}
