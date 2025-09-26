import { http, HttpResponse } from "msw";

export const reviewsHandlers = [
  http.get("/reviews", () => {
    return HttpResponse.json([]);
  }),
];
