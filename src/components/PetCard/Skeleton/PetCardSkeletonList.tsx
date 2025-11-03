import { PetCardSkeleton } from "./PetCardSkeleton";

interface PetCardSkeletonListProps {
  /**
   * 표시할 스켈레톤 카드 개수
   * @default 3
   */
  count?: number;
}

export function PetCardSkeletonList({ count = 3 }: PetCardSkeletonListProps) {
  return (
    <ul className="flex flex-col gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <PetCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
