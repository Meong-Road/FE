import React from "react";

interface ModalFormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
}

export function ModalForm({ children, onSubmit }: ModalFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center justify-center gap-5"
    >
      {children}
    </form>
  );
}
