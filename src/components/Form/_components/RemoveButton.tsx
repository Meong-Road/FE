import React from "react";
import { Trash2 } from "lucide-react";

interface RemoveButtonProps {
  onClick: () => void;
}

export function RemoveButton({ onClick }: RemoveButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute bottom-0 left-0 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-400 text-white opacity-50 shadow-sm transition-all duration-200 hover:bg-zinc-500 hover:opacity-60 active:scale-95 active:bg-zinc-600"
      aria-label="이미지 제거"
    >
      <Trash2 className="h-5 w-5" />
    </button>
  );
}
