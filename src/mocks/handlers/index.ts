import type { RequestHandler } from "msw";

import { authHandlers } from "./auth";
import { gatheringsHandlers } from "./gatherings";
import { petsHandlers } from "./pets";
import { reviewsHandlers } from "./reviews";
import { usersHandlers } from "./users";

export const handlers: RequestHandler[] = [
  ...authHandlers,
  ...gatheringsHandlers,
  ...petsHandlers,
  ...reviewsHandlers,
  ...usersHandlers,
];
