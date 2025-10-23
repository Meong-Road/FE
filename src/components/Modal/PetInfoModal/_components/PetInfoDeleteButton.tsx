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
      className="mt-2 border-b-[1px] border-b-zinc-600 text-sm font-medium text-zinc-600"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? "등록 해제 중..." : "등록 해제하기"}
    </button>
  );
}
