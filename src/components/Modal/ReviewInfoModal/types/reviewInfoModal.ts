type ReviewInfoModalType = "edit-review" | "add-review" | null;

export interface ReviewInfoModalProps {
  type: ReviewInfoModalType;
  hasCloseBtn?: boolean;
  onClose: () => void;
  reviewId?: number; // 편집 모드일 때만 필요
}
