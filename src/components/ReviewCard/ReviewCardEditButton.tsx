import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useReviewInfoModalStore } from "@/store/modalStore";

interface ReviewCardEditButtonProps {
  reviewId: number;
  disabled?: boolean;
  className?: string;
}

export function ReviewCardEditButton({
  reviewId,
  disabled = false,
  className,
}: ReviewCardEditButtonProps) {
  const { openModal } = useReviewInfoModalStore();

  const handleEdit = () => {
    openModal("edit-review", reviewId);
  };

  return (
    <Button
      size="icon"
      variant="default"
      onClick={handleEdit}
      disabled={disabled}
      className={`bg-primary/50 text-primary-foreground hover:bg-primary group-hover:bg-primary active:bg-primary/75 absolute top-4 right-4 h-8 w-8 cursor-pointer rounded-full transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 ${className || ""}`}
    >
      <Pencil className="size-3.5" />
      <span className="sr-only">리뷰 수정</span>
    </Button>
  );
}
