import { ProfileCardNickNameProps } from "./types";

export function ProfileCardNickName({ nickName }: ProfileCardNickNameProps) {
  return (
    <h4 className="text-foreground text-center text-lg font-semibold sm:text-left">
      {nickName}
    </h4>
  );
}
