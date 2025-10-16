import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { PATH } from "@/lib/constants/path";
import { authService } from "@/services/authService";

export function useSignout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return () => {
    authService.signout();
    queryClient.invalidateQueries({ queryKey: ["me"] });
    queryClient.setQueryData(["me"], null);

    router.push(PATH.SIGNIN);
  };
}
