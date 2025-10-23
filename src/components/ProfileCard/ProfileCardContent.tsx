import { type ProfileCardContentProps } from "./types";

export function ProfileCardContent({ children }: ProfileCardContentProps) {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      {children}
    </div>
  );
}
