import React from "react";

export function ModalOverlay({ onClick }: { onClick?: () => void }) {
  return <div className="bg- fixed inset-0 bg-black/50" onClick={onClick} />;
}
