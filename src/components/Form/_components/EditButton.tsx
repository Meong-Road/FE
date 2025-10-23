import React from "react";

import EditIcon from "../../../assets/icons/edit-icon.svg";

interface EditButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
};

const variantClasses = {
  primary: "border-primary bg-white hover:bg-gray-50",
  secondary: "border-gray-300 bg-gray-100 hover:bg-gray-200",
  outline: "border-gray-400 bg-white hover:bg-gray-50",
};

export function EditButton({
  className = "",
  size = "md",
  variant = "primary",
}: EditButtonProps) {
  const baseClasses =
    "absolute -bottom-1 -right-1 flex items-center justify-center rounded-full border-2 shadow-sm transition-all";
  const sizeClass = sizeClasses[size];
  const variantClass = variantClasses[variant];

  return (
    <div
      className={`${baseClasses} ${sizeClass} ${variantClass} ${className}`}
      aria-label="이미지 수정"
    >
      <EditIcon />
    </div>
  );
}
