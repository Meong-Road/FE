import { ProfileCardNickNameProps } from "./types";

export function ProfileCardNickName({ nickName }: ProfileCardNickNameProps) {
  return <h4 className="text-foreground text-lg font-semibold">{nickName}</h4>;
}
