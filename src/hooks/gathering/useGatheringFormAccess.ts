import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { storageUtils } from "@/lib/utils/storage";

interface UseGatheringFormAccessOptions {
  allowedType: "quick" | "regular";
  redirectPath?: string;
}

export function useGatheringFormAccess({
  allowedType,
  redirectPath = "/",
}: UseGatheringFormAccessOptions) {
  const router = useRouter();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;

    const canEnter = storageUtils.getItem<string>(
      "canEnterCreatePage",
      "sessionStorage",
    );

    if (canEnter !== allowedType) {
      toast.error("올바른 경로로 접근해주세요");
      router.replace(redirectPath);
      return;
    }

    storageUtils.removeItem("canEnterCreatePage", "sessionStorage");
    hasChecked.current = true;
  }, [allowedType, redirectPath, router]);
}
