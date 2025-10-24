import { useQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { GatheringType } from "@/lib/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

export function useGet4Participants({ id }: { id: GatheringType["id"] }) {
  const options = {
    page: 0,
    size: 4,
    sort: ["joinedAt", "asc"],
  };

  return useQuery({
    queryKey: QUERY_KEYS.gatherings.participantList({ id }, options),
    queryFn: () =>
      gatheringApi.getParticipants({
        id,
        ...options,
      }),
    select: (data) => data.result?.content.flatMap((item) => item.user),
  });
}
