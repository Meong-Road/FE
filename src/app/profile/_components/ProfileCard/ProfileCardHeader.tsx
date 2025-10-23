import { type ProfileCardHeaderProps } from "./types";

export function ProfileCardHeader({ children }: ProfileCardHeaderProps) {
  return <h3 className="text-foreground text-xl font-semibold">{children}</h3>;
}
