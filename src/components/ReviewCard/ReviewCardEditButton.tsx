import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";
import { useReviewInfoModalStore } from "@/store/modalStore";

interface ReviewCardEditButtonProps {
  reviewId: number;
  reviewAuthorId: number;
  disabled?: boolean;
  className?: string;
}

export function ReviewCardEditButton({
  reviewId,
  reviewAuthorId,
  disabled = false,
  className,
}: ReviewCardEditButtonProps) {
  const { user } = useAuth();
  const { openModal } = useReviewInfoModalStore();

  // 본인 리뷰가 아니면 버튼 숨김
  if (user?.id !== reviewAuthorId) {
    return null;
  }

  const handleEdit = () => {
    openModal("edit-review", reviewId);
  };

  return (
    <Button
      size="icon"
      variant="default"
      onClick={handleEdit}
      disabled={disabled}
      className={`bg-primary/50 text-primary-foreground hover:bg-primary active:bg-primary/75 group-hover:bg-primary absolute top-50 right-3 h-8 w-8 cursor-pointer rounded-full transition-[opacity,transform,background-color] hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 sm:top-4 sm:right-4 ${className || ""}`}
    >
      <Pencil className="size-3.5" />
      <span className="sr-only">리뷰 수정</span>
    </Button>
  );
}
