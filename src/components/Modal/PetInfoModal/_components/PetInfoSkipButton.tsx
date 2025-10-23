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
      className="w-full rounded-lg bg-gray-500 px-4 py-3 text-white transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-300"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? "건너 뛰는 중..." : "아직 반려견이 없어요"}
    </button>
  );
}
