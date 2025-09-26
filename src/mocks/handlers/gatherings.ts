// src/mocks/handlers/auth.ts
import { http, HttpResponse } from "msw";

export const gatheringsHandlers = [
  http.get("/gatherings", () => {
    return HttpResponse.json([]);
  }),
];
