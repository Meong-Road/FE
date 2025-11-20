import { useQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";

import { QUERY_KEYS } from "../queryKey";

export function useGetRegularGatheringsByParticipation() {
  return useQuery({
    queryKey: QUERY_KEYS.gatherings.lists(),
    queryFn: () =>
      gatheringApi.getRegularGatherings({ page: 0, ...DEFAULT_LIST_OPTIONS }),
    select: (data) => {
      const gatherings = data.success ? data.result.content : [];
      return gatherings
        .map((g) => ({
          ...g,
          participantRate: g.capacity ? g.participantCount / g.capacity : 0,
        }))
        .sort((a, b) => b.participantRate - a.participantRate)
        .slice(0, 3);
    },
  });
}
