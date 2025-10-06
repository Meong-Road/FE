import { http, HttpResponse } from "msw";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const authHandlers = [
  // 회원가입 API
  http.post(`${BASE_URL}/meong-road/user`, async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      password: string;
      name: string;
      nickName: string;
    };

    // 실패 케이스: 이미 존재하는 이메일
    if (body.email === "test@test.com") {
      return HttpResponse.json(
        {
          success: false,
          code: 400,
          message: "이미 사용 중인 이메일입니다.",
          errorCode: "EMAIL_ALREADY_EXISTS",
        },
        { status: 400 },
      );
    }

    // 실패 케이스: 이미 존재하는 닉네임
    if (body.nickName === "홍길동123") {
      return HttpResponse.json(
        {
          success: false,
          code: 400,
          message: "이미 사용 중인 닉네임입니다.",
          errorCode: "NICKNAME_ALREADY_EXISTS",
        },
        { status: 400 },
      );
    }

    // 성공 케이스
    return HttpResponse.json({
      success: true,
      code: 0,
      message: "회원가입 성공",
      result: {
        token:
          "eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoic3RyaW5nIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTczMjgwMzI0OSwiZXhwIjoxNzMyODAzODQ5fQ.F3hjvzGHgoahAAUUe3M44UfU8eceSHHdl4LFkH8GBjQ",
        user: {
          id: 1,
          email: body.email,
          name: body.name,
          nickName: body.nickName,
          image: "https://example.com/image.jpg",
          isPetInfoSubmitted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        message: "회원가입 및 로그인 성공",
      },
    });
  }),

  // 로그인 API
  http.post(`${BASE_URL}/meong-road/auth/login`, async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      password: string;
    };

    // 실패 케이스
    if (body.email === "wrong@test.com" || body.password === "wrongpassword") {
      return HttpResponse.json(
        {
          success: false,
          code: 401,
          message: "이메일 또는 비밀번호가 일치하지 않습니다.",
          errorCode: "INVALID_CREDENTIALS",
        },
        { status: 401 },
      );
    }

    // 성공 케이스
    return HttpResponse.json({
      success: true,
      code: 0,
      message: "로그인 성공",
      result: {
        accessToken:
          "eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoic3RyaW5nIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTczMjgwMzI0OSwiZXhwIjoxNzMyODAzODQ5fQ.F3hjvzGHgoahAAUUe3M44UfU8eceSHHdl4LFkH8GBjQ",
        refreshToken:
          "eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoic3RyaW5nIiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3MzI4MDMyNDksImV4cCI6MTczMzQwODA0OX0.xyz123",
        user: {
          id: 1,
          email: body.email,
          name: "홍길동",
          nickName: "홍길동123",
          image: "https://example.com/image.jpg",
          isPetInfoSubmitted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    });
  }),

  // 토큰 갱신 API
  http.post(`${BASE_URL}/meong-road/auth/refresh`, async ({ request }) => {
    const body = (await request.json()) as {
      refreshToken: string;
    };

    // 실패 케이스
    if (!body.refreshToken || body.refreshToken === "invalid") {
      return HttpResponse.json(
        {
          success: false,
          code: 401,
          message: "유효하지 않은 리프레시 토큰입니다.",
          errorCode: "INVALID_REFRESH_TOKEN",
        },
        { status: 401 },
      );
    }

    // 성공 케이스
    return HttpResponse.json({
      success: true,
      code: 0,
      message: "토큰 갱신 성공",
      result: {
        accessToken:
          "eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoic3RyaW5nIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTczMjgwMzI0OSwiZXhwIjoxNzMyODAzODQ5fQ.F3hjvzGHgoahAAUUe3M44UfU8eceSHHdl4LFkH8GBjQ",
        refreshToken:
          "eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoic3RyaW5nIiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3MzI4MDMyNDksImV4cCI6MTczMzQwODA0OX0.xyz123",
      },
    });
  }),
];
