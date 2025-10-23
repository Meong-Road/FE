import { Button } from "@/components/ui/button";

interface PetInfoSkipButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function PetInfoSkipButton({
  onClick,
  disabled,
}: PetInfoSkipButtonProps) {
  return (
    <Button
      className="text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500 disabled:cursor-not-allowed disabled:bg-gray-300"
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? "건너 뛰는 중..." : "아직 반려견이 없어요"}
    </Button>
  );
}
