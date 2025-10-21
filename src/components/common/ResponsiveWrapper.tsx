import { ReactNode } from "react";

interface ResponsiveWrapperProps {
  children: ReactNode;
  className?: string;
}

export function DesktopOnly({ children, className }: ResponsiveWrapperProps) {
  return <div className={`hidden sm:flex ${className || ""}`}>{children}</div>;
}

export function MobileOnly({ children, className }: ResponsiveWrapperProps) {
  return <div className={`sm:hidden ${className || ""}`}>{children}</div>;
}
