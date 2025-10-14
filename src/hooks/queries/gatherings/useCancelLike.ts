import { useMutation } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { CancelLikeReq } from "@/api/types/gatherings";

export function useCancelLike({
  id,
  onSuccess,
}: CancelLikeReq & {
  onSuccess: () => void;
}) {
  return useMutation({
    mutationFn: () => {
      return gatheringApi.cancelLike({ id });
    },
    onSuccess,
  });
}
