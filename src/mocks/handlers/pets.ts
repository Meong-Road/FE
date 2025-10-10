// src/mocks/handlers/auth.ts
import { http, HttpResponse } from "msw";

export const petsHandlers = [
  http.get("/pets", () => {
    return HttpResponse.json([]);
  }),
];
