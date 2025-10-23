import React from "react";
import { X } from "lucide-react";

interface RemoveButtonProps {
  onClick: () => void;
}

export function RemoveButton({ onClick }: RemoveButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-300 text-white shadow-sm transition-all hover:bg-zinc-400"
      aria-label="이미지 제거"
    >
      <X className="h-3 w-3" />
    </button>
  );
}
