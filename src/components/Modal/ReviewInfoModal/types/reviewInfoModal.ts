type ReviewInfoModalType = "add-review" | "edit-review";

type AddReviewModalProps = {
  type: "add-review";
  hasCloseBtn?: boolean;
  onClose: () => void;
  gatheringId: number;
  reviewId?: never;
};

type EditReviewModalProps = {
  type: "edit-review";
  hasCloseBtn?: boolean;
  onClose: () => void;
  gatheringId?: never;
  reviewId: number;
};

export type ReviewInfoModalProps = AddReviewModalProps | EditReviewModalProps;
