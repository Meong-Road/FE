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
      className="absolute top-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-400 text-white opacity-30 shadow-sm transition-all group-hover:opacity-70 hover:bg-zinc-500"
      aria-label="이미지 제거"
    >
      <X className="h-3 w-3" />
    </button>
  );
}
