import { createPortal } from "react-dom";

export function ModalPortal({ children }: { children: React.ReactNode }) {
  if (typeof window === "undefined") return null;
  const root = document.getElementById("modal-root");
  if (!root) return null;
  return createPortal(children, root);
}
