import React from "react";

export function ModalContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2.5 flex w-full flex-col items-center overflow-y-auto">
      {children}
    </div>
  );
}
