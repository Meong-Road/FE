import { LocationSelect } from "@/components/widget/filters/LocationSelect";

import { ReviewDashboardContainer, ReviewListContainer } from "./_components";

export default function ReviewsPage() {
  return (
    <section>
      <div className="flex flex-col gap-6">
        <LocationSelect />
        <ReviewDashboardContainer />
        <ReviewListContainer />
      </div>
    </section>
  );
}
