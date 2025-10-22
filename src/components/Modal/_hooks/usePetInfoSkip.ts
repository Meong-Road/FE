import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { PATH } from "@/lib/constants/path";

import { useSkipPetInfo } from "./useSkipPetInfo";

export function usePetInfoSkip({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { mutate: skipPetInfo } = useSkipPetInfo();

  const handleSkip = () => {
    skipPetInfo(undefined, {
      onSuccess: () => {
        toast.success("반려견 정보 입력을 건너뛰었어요.");
        onClose();
        router.push(PATH.REGULAR);
      },
      onError: (error: Error) => {
        toast.error(`건너뛰기에 실패했어요: ${error.message}`);
      },
    });
  };

  return {
    handleSkip,
  };
}
