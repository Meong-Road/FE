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
      className="w-full rounded-lg bg-zinc-500 px-4 py-3 text-white transition-colors hover:bg-zinc-600 disabled:cursor-not-allowed disabled:bg-gray-300"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? "등록 해제 중..." : "등록 해제하기"}
    </button>
  );
}
