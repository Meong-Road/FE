import { type ProfileCardContentProps } from "./types";

export function ProfileCardContent({ children }: ProfileCardContentProps) {
  return <div className="flex items-start gap-4">{children}</div>;
}
