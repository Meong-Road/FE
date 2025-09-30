import { type ProfileCardNameProps } from "./types";

export function ProfileCardName({ children }: ProfileCardNameProps) {
  return <h4 className="mb-2 font-semibold text-gray-800">{children}</h4>;
}
