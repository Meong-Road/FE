import React from "react";

import { cn } from "@/lib/utils";

interface ModalButtonProps {
  children: React.ReactNode;
  className: string;
  disabled?: boolean;
  type: "button" | "submit";
  onClick?: () => void;
}

export default function Button({
  children,
  className,
  disabled,
  type,
  onClick,
}: ModalButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(`${className}`)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
