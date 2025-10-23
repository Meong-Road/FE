import { getSpecialButtonClass } from "@/lib/utils/buttonStyles";

interface PetInfoDeleteButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function PetInfoDeleteButton({
  onClick,
  disabled,
}: PetInfoDeleteButtonProps) {
  return (
    <button
      className={getSpecialButtonClass("delete")}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? "등록 해제 중..." : "등록 해제하기"}
    </button>
  );
}
