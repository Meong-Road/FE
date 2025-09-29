// src/mocks/handlers/auth.ts
import { http, HttpResponse } from "msw";

import { PAGINATION_DATA } from "../data/common";
import { QUICK_GATHERINGS, REGULAR_GATHERINGS } from "../data/gatherings";

export const gatheringsHandlers = [
  http.get("/api/gatherings", (req) => {
    const url = new URL(req.request.url);
    const type = url.searchParams.get("type");
    const pageSize = url.searchParams.get("pageSize");

    if (type === "QUICK") {
      return HttpResponse.json(
        PAGINATION_DATA(QUICK_GATHERINGS, {
          pageSize: Number(pageSize),
        }),
      );
    }
    return HttpResponse.json(
      PAGINATION_DATA(REGULAR_GATHERINGS, {
        pageSize: Number(pageSize),
      }),
    );
  }),
];
