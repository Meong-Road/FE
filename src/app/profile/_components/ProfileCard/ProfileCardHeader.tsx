import { type ProfileCardHeaderProps } from "./types";

export function ProfileCardHeader({ children }: ProfileCardHeaderProps) {
  return (
    <h3 className="text-foreground text-[18px] font-semibold">{children}</h3>
  );
}
