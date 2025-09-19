import { http, HttpResponse } from "msw";

export const postsHandlers = [
  http.get("http://localhost:4000/posts", () => {
    return HttpResponse.json([
      { id: 1, title: "첫 번째 게시글", body: "내용 1" },
      { id: 2, title: "두 번째 게시글", body: "내용 2" },
    ]);
  }),
];
