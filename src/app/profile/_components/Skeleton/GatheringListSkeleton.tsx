import GatheringCardItemSkeleton from "@/components/widget/gatherings/GatheringCardItem/GatheringCardItemSkeleton";

export function GatheringListSkeleton() {
  return (
    <ul className="flex flex-col gap-3 md:gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <GatheringCardItemSkeleton key={i} />
      ))}
    </ul>
  );
}
