import { Button } from "@/components/ui/button";

interface PetInfoDeleteButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function PetInfoDeleteButton({
  onClick,
  disabled,
}: PetInfoDeleteButtonProps) {
  return (
    <Button
      className="text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500 disabled:cursor-not-allowed disabled:bg-gray-300"
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? "등록 해제 중..." : "등록 해제하기"}
    </Button>
  );
}
