import { Button } from "@/components/ui/button";

interface ReviewInfoDeleteButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function ReviewInfoDeleteButton({
  onClick,
  disabled,
}: ReviewInfoDeleteButtonProps) {
  return (
    <Button
      className="text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500 disabled:cursor-not-allowed disabled:bg-gray-300"
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? "삭제 중..." : "리뷰 삭제하기"}
    </Button>
  );
}
