import React from "react";

interface ModalTitleProps {
  title: string;
  subtitle?: string;
}

export function ModalTitle({ title, subtitle }: ModalTitleProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-foreground text-2xl font-semibold">{title}</div>
      <div className="font-accent-foreground">{subtitle}</div>
    </div>
  );
}
