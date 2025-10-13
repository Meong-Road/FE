import { ReviewCard } from "@/components/ReviewCard";

import EditBtn from "./EditBtn";

export default function ReviewSection() {
  return (
    <section>
      <ul>
        <ReviewCard>
          <div className="flex gap-8">
            <ReviewCard.Image image={null} />
            <div className="flex flex-col justify-between">
              <ReviewCard.Profile score={5} />
              <div>
                <ReviewCard.Location>서울시</ReviewCard.Location>
                <ReviewCard.Comment>맘에 듭니다</ReviewCard.Comment>
              </div>
            </div>
          </div>
          <div className="absolute top-6 right-8">
            <EditBtn />
          </div>
        </ReviewCard>
      </ul>
    </section>
  );
}
