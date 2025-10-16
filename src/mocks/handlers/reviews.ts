import { http, HttpResponse } from "msw";

import { API_ENDPOINTS } from "@/lib/constants/endpoints";

import { mockReviews } from "../data/reviews";

export const reviewsHandlers = [
  http.get(`${API_ENDPOINTS.REVIEW}`, ({ request }) => {
    const url = new URL(request.url);
    const location = url.searchParams.get("location");
    const page = Number(url.searchParams.get("page") ?? 0);
    const size = Number(url.searchParams.get("size") ?? 10);

    const filtered = (() => {
      if (!location || location === "서울 전체") {
        return mockReviews;
      }
      return mockReviews.filter((r) => r.gathering.location === location);
    })();
    const start = page * size;
    const end = start + size;
    const paginated = filtered.slice(start, end);

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "조회 성공",
      result: {
        content: paginated,
        page,
        size,
        totalElements: filtered.length,
        totalPages: Math.ceil(filtered.length / size),
        last: end >= filtered.length,
      },
      errorCode: null,
    });
  }),
  http.get(`${API_ENDPOINTS.REVIEW}/scores`, () => {
    return HttpResponse.json({
      success: true,
      code: 0,
      message: "조회 성공",
      result: {
        averageScore: 4.3,
        OneStar: 3,
        TwoStar: 4,
        ThreeStar: 29,
        FourStar: 40,
        FiveStar: 89,
      },
      errorCode: null,
    });
  }),
  http.get(`${API_ENDPOINTS.REVIEW}/gatherings/:id`, () => {
    return HttpResponse.json({
      success: true,
      code: 0,
      message: "string",
      result: {
        content: mockReviews,
        page: 0,
        size: 10,
        totalElements: 100,
        totalPages: 10,
        last: false,
      },
      errorCode: "string",
    });
  }),
];
