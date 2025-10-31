import { GatheringListSkeleton } from "./GatheringListSkeleton";
import { ProfileCardSkeleton } from "./ProfileCardSkeleton";
import { TabsSkeleton } from "./TabsSkeleton";

export function ProfilePageSkeleton() {
  return (
    <section>
      {/* Profile Card - ProfileInfo 위치와 동일 */}
      <ProfileCardSkeleton />

      {/* Main Tabs - ProfileTabs의 mt-12 sm:mt-16 동일 */}
      <div className="mt-12 sm:mt-16">
        <TabsSkeleton />
      </div>

      {/* Tab Content - ProfileTabContent의 mt-6 sm:mt-8 동일 */}
      <section className="mt-6 sm:mt-8">
        {/* Gathering List - 초기 로딩이므로 서브탭 없이 바로 리스트 */}
        <GatheringListSkeleton />
      </section>
    </section>
  );
}
