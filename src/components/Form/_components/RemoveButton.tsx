import React from "react";
import { X } from "lucide-react";

interface RemoveButtonProps {
  onClick: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "zinc" | "gray" | "red";
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const variantClasses = {
  zinc: "bg-zinc-300 hover:bg-zinc-400",
  gray: "bg-gray-400 hover:bg-gray-500",
  red: "bg-red-500 hover:bg-red-600",
};

export function RemoveButton({
  onClick,
  className = "",
  size = "md",
  variant = "zinc",
}: RemoveButtonProps) {
  const baseClasses =
    "absolute -top-1 -right-1 flex items-center justify-center rounded-full text-white shadow-sm transition-all cursor-pointer";
  const sizeClass = sizeClasses[size];
  const variantClass = variantClasses[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${sizeClass} ${variantClass} ${className}`}
      aria-label="이미지 제거"
    >
      <X
        className={
          size === "sm" ? "h-2 w-2" : size === "md" ? "h-3 w-3" : "h-4 w-4"
        }
      />
    </button>
  );
}
