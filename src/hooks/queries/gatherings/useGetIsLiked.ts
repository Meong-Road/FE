import { useQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { GetIsLikedReq } from "@/api/types/gatherings";

import { queryKeys } from "../queryKey";

export function useGetIsLiked({ id }: GetIsLikedReq) {
  return useQuery({
    queryKey: queryKeys.gatherings.like({ id }),
    queryFn: () => {
      return gatheringApi.getIsLiked({ id });
    },
  });
}
