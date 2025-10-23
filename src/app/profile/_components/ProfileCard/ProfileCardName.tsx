import { type ProfileCardNameProps } from "./types";

export function ProfileCardName({ children }: ProfileCardNameProps) {
  return (
    <h4 className="text-foreground mb-3 text-lg font-semibold">{children}</h4>
  );
}
