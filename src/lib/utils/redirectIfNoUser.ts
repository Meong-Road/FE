import { PATH } from "@/lib/constants/path";

import { UserType } from "../types/user";

export function redirectIfNoUser({
  user,
  redirect,
}: {
  user: UserType | null | undefined;
  redirect: (url: string) => void;
}): boolean {
  if (!user) {
    redirect(PATH.SIGNIN);
    return false;
  }

  return true;
}
