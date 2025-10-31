import { GatheringListSkeleton } from "./GatheringListSkeleton";
import { ProfileCardSkeleton } from "./ProfileCardSkeleton";
import { TabsSkeleton } from "./TabsSkeleton";

export function ProfilePageSkeleton() {
  return (
    <section>
      <ProfileCardSkeleton />

      <div className="mt-12 sm:mt-16">
        <TabsSkeleton />
      </div>

      <section className="mt-6 sm:mt-8">
        <GatheringListSkeleton />
      </section>
    </section>
  );
}
