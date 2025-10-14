import { useMutation } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { LikeReq } from "@/api/types/gatherings";

export function useLike({
  id,
  onSuccess,
}: LikeReq & {
  onSuccess: () => void;
}) {
  return useMutation({
    mutationFn: () => {
      return gatheringApi.like({ id });
    },
    onSuccess,
  });
}
