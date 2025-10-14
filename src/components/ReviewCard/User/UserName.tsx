import { ReviewCardUserNameProps } from "../types";

export function UserName({ nickName }: ReviewCardUserNameProps) {
  return <span className="text-sm font-medium text-slate-800">{nickName}</span>;
}
