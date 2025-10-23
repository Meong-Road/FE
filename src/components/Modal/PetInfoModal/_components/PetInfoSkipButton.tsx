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
      className="mt-2 border-b-[1px] border-b-zinc-600 text-sm font-medium text-zinc-600"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? "건너 뛰는 중..." : "아직 반려견이 없어요"}
    </button>
  );
}
