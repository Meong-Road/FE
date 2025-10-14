import { useQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { GetIsLikedReq } from "@/api/types/gatherings";

import { GATHERING_QUERY_KEY } from "./queryKey";

export function useGetIsLiked({ id }: GetIsLikedReq) {
  return useQuery({
    queryKey: GATHERING_QUERY_KEY.IS_LIKED({ id }),
    queryFn: () => {
      return gatheringApi.getIsLiked({ id });
    },
  });
}
