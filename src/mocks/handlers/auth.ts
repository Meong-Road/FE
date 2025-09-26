// src/mocks/handlers/auth.ts
import { http, HttpResponse } from "msw";

// 회원가입 핸들러
export const authHandlers = [
  //================= 회원가입 ================================

  http.post("/auth/signup", async ({ request }) => {
    const body = await request.json();
    const { email, password, name } = body as {
      email: string;
      password: string;
      name: string;
    };

    // 1) 이메일 형식 검증 (간단 예시)
    if (!email.includes("@")) {
      return HttpResponse.json(
        {
          code: "VALIDATION_ERROR",
          parameter: "email",
          message: "유효한 이메일 주소를 입력하세요",
        },
        { status: 400 },
      );
    }

    // 2) 성공 응답
    return HttpResponse.json(
      {
        message: "사용자 생성 성공",
        petInfo: null,
      },
      { status: 200 },
    );
  }),

  //================= 로그인 ================================

  http.post("/auth/signin", async ({ request }) => {
    const body = await request.json();
    const { email, password } = body as {
      email: string;
      password: string;
    };

    // 🚩 500: 서버 오류 (테스트용 조건)
    if (email === "error@example.com") {
      return HttpResponse.json(
        {
          code: "SERVER_ERROR",
          message: "서버 오류가 발생했습니다",
        },
        { status: 500 },
      );
    }

    // 🚩 404: 존재하지 않는 아이디
    if (email !== "test@example.com") {
      return HttpResponse.json(
        {
          code: "USER_NOT_FOUND",
          message: "존재하지 않는 아이디입니다",
        },
        { status: 404 },
      );
    }

    // 🚩 401: 비밀번호 불일치
    if (password !== "1234") {
      return HttpResponse.json(
        {
          code: "INVALID_CREDENTIALS",
          message: "비밀번호가 아이디와 일치하지 않습니다",
        },
        { status: 401 },
      );
    }

    // ✅ 200: 로그인 성공
    return HttpResponse.json(
      {
        token: "fake-jwt-token-12345",
      },
      { status: 200 },
    );
  }),

  //================= 로그아웃 ================================

  http.post("/auth/signout", async () => {
    return HttpResponse.json({ message: "로그아웃 성공" }, { status: 200 });
  }),
];
