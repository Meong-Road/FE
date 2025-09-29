import { type ProfileCardHeaderProps } from "./types";

export function ProfileCardHeader({ children }: ProfileCardHeaderProps) {
  return (
    <>
      <h3>{children}</h3>
    </>
  );
}
