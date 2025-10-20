type ReviewInfoModalType = "edit-review" | "add-review" | null;

export interface ReviewInfoModalProps {
  type: ReviewInfoModalType;
  onClose: () => void;
  reviewId?: number; // 편집 모드일 때만 필요
}
