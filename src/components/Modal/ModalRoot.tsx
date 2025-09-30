import React from "react";

export function ModalRoot({ children }: { children: React.ReactNode }) {
  return (
    <div role="dialog" aria-modal="true">
      {children}
    </div>
  );
}
