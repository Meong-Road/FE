import { GetReviewReq, GetReviewRes } from "@/lib/types/reviews";

const REVIEW_API = {
  getReviewsByGathering: async ({
    gatheringId,
    page,
    size,
    sort,
  }: GetReviewReq): Promise<GetReviewRes> => {
    const response = await fetch(`/api/reviews/gatherings/${gatheringId}`);
    return response.json();
  },
};

export default REVIEW_API;
