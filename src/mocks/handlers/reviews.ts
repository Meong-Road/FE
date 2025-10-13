import { http, HttpResponse } from "msw";

import { REVIEWS } from "../data/review";

export const reviewsHandlers = [
  http.get("/api/reviews/gatherings/:id", () => {
    return HttpResponse.json({
      success: true,
      code: 0,
      message: "string",
      result: {
        content: REVIEWS,
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
