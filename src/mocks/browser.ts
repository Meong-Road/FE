import { setupWorker } from "msw/browser";

import { postsHandlers } from "./handlers/posts";

export const worker = setupWorker(...postsHandlers);
