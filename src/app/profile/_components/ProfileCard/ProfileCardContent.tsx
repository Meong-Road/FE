import { type ProfileCardContentProps } from "./types";

export function ProfileCardContent({ children }: ProfileCardContentProps) {
  return <div className="flex gap-3">{children}</div>;
}
