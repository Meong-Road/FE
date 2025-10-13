import { ReviewCardUserNameProps } from "../types";

export function UserName({ children }: ReviewCardUserNameProps) {
  return <span className="text-sm font-medium text-slate-800">{children}</span>;
}
