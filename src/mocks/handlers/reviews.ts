import { http, HttpResponse } from "msw";

import { FULL_API_ENDPOINTS } from "@/lib/constants/endpoints";

import { mockReviews } from "../data/reviews";

export const reviewsHandlers = [
  // GET /meong-road/reviews - 전체 리뷰 목록 조회
  http.get(`${FULL_API_ENDPOINTS.REVIEW}`, ({ request }) => {
    const url = new URL(request.url);
    const location = url.searchParams.get("location");
    const page = Number(url.searchParams.get("page") ?? 0);
    const size = Number(url.searchParams.get("size") ?? 10);

    const filtered = (() => {
      if (!location) {
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

  // GET /meong-road/reviews/my - 내가 작성한 리뷰 목록 조회
  http.get(`${FULL_API_ENDPOINTS.REVIEW}/my`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return HttpResponse.json(
        {
          success: false,
          code: 401,
          message: "인증이 필요합니다.",
        },
        { status: 401 },
      );
    }

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 0);
    const size = Number(url.searchParams.get("size") ?? 10);

    // 현재 사용자(id: 1)가 작성한 리뷰만 필터링
    const myReviews = mockReviews.filter((review) => review.userId === 1);

    const start = page * size;
    const end = start + size;
    const paginated = myReviews.slice(start, end);

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "내 리뷰 조회 성공",
      result: {
        content: paginated,
        page,
        size,
        totalElements: myReviews.length,
        totalPages: Math.ceil(myReviews.length / size),
        last: end >= myReviews.length,
      },
      errorCode: null,
    });
  }),

  // GET /meong-road/reviews/scores - 리뷰 점수 통계
  http.get(`${FULL_API_ENDPOINTS.REVIEW}/scores`, () => {
    return HttpResponse.json({
      success: true,
      code: 0,
      message: "조회 성공",
      result: {
        averageScore: 4.3,
        oneStar: 3,
        twoStars: 4,
        threeStars: 29,
        fourStars: 40,
        fiveStars: 89,
      },
      errorCode: null,
    });
  }),

  // GET /meong-road/reviews/gatherings/:id - 특정 모임의 리뷰 목록 조회
  http.get(`${FULL_API_ENDPOINTS.REVIEW}/gatherings/:id`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 0);
    const size = Number(url.searchParams.get("size") ?? 10);

    const start = page * size;
    const end = start + size;
    const paginated = mockReviews.slice(start, end);
    const totalPages = Math.ceil(mockReviews.length / size);

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "string",
      result: {
        content: paginated,
        page,
        size,
        totalElements: mockReviews.length,
        totalPages,
        last: page === totalPages,
      },
      errorCode: "string",
    });
  }),
];
