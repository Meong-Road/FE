import {
  LocationSelect,
  ReviewDashboardContainer,
  ReviewListContainer,
} from "./_components";

export default function ReviewsPage() {
  return (
    <section className="mx-auto w-full max-w-screen-lg px-4">
      <div className="flex flex-col gap-6">
        <LocationSelect />
        <ReviewDashboardContainer />
        <ReviewListContainer />
      </div>
    </section>
  );
}
