import qs from "qs";

import {
  GetMyReviewsReq,
  GetMyReviewsRes,
  GetReviewDashboardReq,
  GetReviewDashboardRes,
  GetReviewsByGatheringReq,
  GetReviewsByGatheringRes,
  GetReviewsReq,
  GetReviewsRes,
} from "@/api/types/reviews";
import { API_ENDPOINTS } from "@/lib/constants/endpoints";

import { customFetch } from "./customFetch";

const REVIEW_API = {
  getReviews: ({
    location = null,
    page = 0,
    size = 10,
    sort = ["createdAt", "desc"],
  }: GetReviewsReq) => {
    return customFetch.get<GetReviewsRes>(
      `${API_ENDPOINTS.REVIEW}?${qs.stringify({ location, page, size, sort }, { arrayFormat: "comma" })}`,
    );
  },
  getReviewDashboard: ({ location = null }: GetReviewDashboardReq) => {
    return customFetch.get<GetReviewDashboardRes>(
      `${API_ENDPOINTS.REVIEW}/scores?${qs.stringify({ location }, { arrayFormat: "comma" })}`,
    );
  },
  getReviewsByGathering: ({
    gatheringId,
    page = 0,
    size = 10,
    sort = ["createdAt", "desc"],
  }: GetReviewsByGatheringReq) => {
    return customFetch.get<GetReviewsByGatheringRes>(
      `${API_ENDPOINTS.REVIEW}/gatherings/${gatheringId}?${qs.stringify({ page, size, sort }, { arrayFormat: "comma" })}`,
    );
  },
  getMyReviews: ({
    page = 0,
    size = 10,
    sort = ["createdAt", "desc"],
  }: GetMyReviewsReq) => {
    return customFetch.get<GetMyReviewsRes>(
      `${API_ENDPOINTS.REVIEW}/my?${qs.stringify({ page, size, sort }, { arrayFormat: "comma" })}`,
    );
  },
};

export default REVIEW_API;
