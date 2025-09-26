import { http, HttpResponse } from "msw";

export const usersHandlers = [
  http.get("http://localhost:4000/users/my", () => {
    return HttpResponse.json([
      {
        id: 0,
        email: "abc@naver.com",
        name: "사용자",
        image: "https://avatars.githubusercontent.com/u/583231?v=4",
        isPetInfoSubmitted: false,
        createdAt: "2025-09-22T01:05:26.000Z",
        updatedAt: "2025-09-22T01:05:26.000Z",
      },
    ]);
  }),
];
