import React from "react";

export function ModalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-card flex max-h-[80vh] flex-col items-center justify-center gap-3 overflow-hidden rounded-xl px-18 py-13">
        {children}
      </div>
    </div>
  );
}
