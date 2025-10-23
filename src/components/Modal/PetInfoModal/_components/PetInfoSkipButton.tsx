import { getSpecialButtonClass } from "@/lib/utils/buttonStyles";

interface PetInfoSkipButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function PetInfoSkipButton({
  onClick,
  disabled,
}: PetInfoSkipButtonProps) {
  return (
    <button
      className={getSpecialButtonClass("skip")}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? "건너 뛰는 중..." : "아직 반려견이 없어요"}
    </button>
  );
}
