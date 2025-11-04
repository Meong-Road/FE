import qs from "qs";

import {
  DeleteReviewReq,
  DeleteReviewRes,
  GetMyReviewsReq,
  GetMyReviewsRes,
  GetReviewableGatheringsReq,
  GetReviewableGatheringsRes,
  GetReviewCheckReq,
  GetReviewCheckRes,
  GetReviewDashboardReq,
  GetReviewDashboardRes,
  GetReviewReq,
  GetReviewRes,
  GetReviewsByGatheringReq,
  GetReviewsByGatheringRes,
  GetReviewsByUserIdReq,
  GetReviewsByUserIdRes,
  GetReviewsReq,
  GetReviewsRes,
  GetUserReviewByGatheringReq,
  GetUserReviewByGatheringRes,
  PostReviewReq,
  PostReviewRes,
  PutReviewReq,
  PutReviewRes,
} from "@/api/types/reviews";
import { customFetch } from "@/lib/api/customFetch";
import { API_ENDPOINTS } from "@/lib/constants/endpoints";

const REVIEW_API = {
  getReviews: ({
    location,
    page = 0,
    size = 10,
    sort = ["createdAt", "desc"],
  }: GetReviewsReq) => {
    return customFetch.get<GetReviewsRes>(
      `${API_ENDPOINTS.REVIEW}?${qs.stringify({ location, page, size, sort }, { arrayFormat: "comma" })}`,
    );
  },
  getReviewDashboard: ({ location }: GetReviewDashboardReq) => {
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
  getReviewsByUserId: ({
    userId,
    page = 0,
    size = 10,
    sort = ["createdAt", "desc"],
  }: GetReviewsByUserIdReq) => {
    return customFetch.get<GetReviewsByUserIdRes>(
      `${API_ENDPOINTS.REVIEW}/users/${userId}?${qs.stringify({ page, size, sort }, { arrayFormat: "comma" })}`,
    );
  },
  getReview: ({ reviewId }: GetReviewReq) => {
    return customFetch.get<GetReviewRes>(`${API_ENDPOINTS.REVIEW}/${reviewId}`);
  },
  checkReview: ({ gatheringId }: GetReviewCheckReq) => {
    return customFetch.get<GetReviewCheckRes>(
      `${API_ENDPOINTS.REVIEW}/check/${gatheringId}`,
    );
  },
  getUserReviewByGathering: ({ gatheringId }: GetUserReviewByGatheringReq) => {
    return customFetch.get<GetUserReviewByGatheringRes>(
      `${API_ENDPOINTS.REVIEW}/user-review/${gatheringId}`,
    );
  },
  getReviewableGatherings: ({
    page = 0,
    size = 10,
    sort = ["createdAt", "desc"],
  }: GetReviewableGatheringsReq) => {
    return customFetch.get<GetReviewableGatheringsRes>(
      `${API_ENDPOINTS.REVIEW}/reviewable-gatherings?${qs.stringify({ page, size, sort }, { arrayFormat: "comma" })}`,
    );
  },
  postReview: (data: PostReviewReq) => {
    return customFetch.post<PostReviewRes>(API_ENDPOINTS.REVIEW, {
      body: JSON.stringify(data),
    });
  },
  putReview: ({ reviewId, data }: PutReviewReq) => {
    return customFetch.put<PutReviewRes>(
      `${API_ENDPOINTS.REVIEW}/${reviewId}`,
      {
        body: JSON.stringify(data),
      },
    );
  },
  deleteReview: ({ reviewId }: DeleteReviewReq) => {
    return customFetch.delete<DeleteReviewRes>(
      `${API_ENDPOINTS.REVIEW}/${reviewId}`,
    );
  },
};

export default REVIEW_API;
