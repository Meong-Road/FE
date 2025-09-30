import { type ProfileCardHeaderProps } from "./types";

export function ProfileCardHeader({ children }: ProfileCardHeaderProps) {
  return <h3 className="text-lg font-semibold text-gray-900">{children}</h3>;
}
