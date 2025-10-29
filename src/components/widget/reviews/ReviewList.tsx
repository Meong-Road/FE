import { ListContainer } from "@/components/common";
import ReviewCardItem from "@/components/widget/reviews/ReviewCardItem";
import { ReviewType } from "@/lib/types/reviews";

interface ReviewListProps {
  reviews: ReviewType[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <ListContainer>
      {reviews.map((review) => (
        <ReviewCardItem key={review.id} review={review} />
      ))}
    </ListContainer>
  );
}
