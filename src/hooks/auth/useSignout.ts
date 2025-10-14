import { useRouter } from "next/navigation";

import { authService } from "@/services/authService";

export function useSignout() {
  const router = useRouter();

  return () => {
    authService.signout();
    // some kind of zustand thing
    router.push("/signin");
  };
}
