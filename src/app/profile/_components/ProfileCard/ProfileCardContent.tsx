import { type ProfileCardContentProps } from "./types";

export function ProfileCardContent({ children }: ProfileCardContentProps) {
  return <div className="flex items-center gap-4">{children}</div>;
}
