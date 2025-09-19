import { setupServer } from "msw/node";

import { postsHandlers } from "./handlers/posts";

export const server = setupServer(...postsHandlers);
