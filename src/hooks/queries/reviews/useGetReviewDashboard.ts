import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { GetReviewDashboardReq } from "@/api/types/reviews";

import { queryKeys } from "../queryKey";

export function useGetReviewDashboard({
  location = "서울 전체",
}: GetReviewDashboardReq) {
  // 서울 전체는 undefined로 처리하여 API에서 전체 지역을 의미하는 것으로 처리
  const locationParam = location === "서울 전체" ? null : location;

  return useQuery({
    queryKey: queryKeys.reviews.dashboard({ location: locationParam }),
    queryFn: () => REVIEW_API.getReviewDashboard({ location: locationParam }),
  });
}
