import { http, HttpResponse } from "msw";

import { API_ENDPOINTS } from "@/lib/constants/endpoints";

import { mockCurrentUser } from "../data/users";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const usersHandlers = [
  // 이메일 중복 확인 API
  http.get(`${BASE_URL}/meong-road/user/exists`, ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    // 중복으로 설정할 이메일 목록
    const existingEmails = ["test@test.com", "duplicate@test.com"];

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "이메일 중복 검사 성공",
      result: {
        exists: existingEmails.includes(email || ""),
      },
    });
  }),

  // 닉네임 중복 확인 API
  http.post(
    `${BASE_URL}/meong-road/user/nickname/check`,
    async ({ request }) => {
      const body = (await request.json()) as { nickName: string };

      // 중복으로 설정할 닉네임 목록
      const existingNicknames = ["테스트닉네임", "홍길동123"];

      return HttpResponse.json({
        success: true,
        code: 0,
        message: "닉네임 중복 검사 성공",
        result: existingNicknames.includes(body.nickName || ""), // true면 중복
      });
    },
  ),

  // GET /meong-road/user/my - 내 회원 정보 확인
  http.get(`${BASE_URL}${API_ENDPOINTS.USER}/my`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return HttpResponse.json(
        {
          success: false,
          code: 401,
          message: "인증이 필요합니다.",
        },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "내 정보 조회 성공",
      result: mockCurrentUser,
    });
  }),

  // PUT /meong-road/user/my - 내 회원 정보 수정
  http.put(`${BASE_URL}${API_ENDPOINTS.USER}/my`, async ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return HttpResponse.json(
        {
          success: false,
          code: 401,
          message: "인증이 필요합니다.",
        },
        { status: 401 },
      );
    }

    const body = (await request.json()) as {
      name?: string;
      nickName?: string;
    };

    // Mock 업데이트된 사용자 정보 반환
    const updatedUser = {
      ...mockCurrentUser,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "내 정보 수정 성공",
      result: updatedUser,
    });
  }),
];
